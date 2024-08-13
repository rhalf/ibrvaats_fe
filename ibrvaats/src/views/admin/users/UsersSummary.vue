<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Users</Label>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="3">
          <TextField
            v-model="params.searchText"
            append-inner-icon="mdi-magnify"
            placeholder="Email"
            @keypress.enter="loadItems"
          />
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col>
          <DataTable
            hover
            :loading="isLoading"
            :headers="headers"
            :items="users"
            :items-per-page="params.limit"
            hide-default-footer
            withView
            @view="viewHandler"
            @changeRole="changeRolesHandler"
            @changeStatus="changeStatusHandler"
            @more="moreHandler"
          />
        </v-col>
      </v-row>

      <DialogUserChangeRoles
        v-model="dialogUserChangeRoles"
        v-model:user="user"
      />
      <DialogUserChangeStatus
        v-model="dialogUserChangeStatus"
        v-model:user="user"
      />
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import DataTable from "@/components/tables/DataTable.vue";
import { headers } from "./data";

import DialogUserChangeRoles from "@/components/dialogs/user/DialogUserChangeRoles.vue";
const dialogUserChangeRoles = ref(false);

import DialogUserChangeStatus from "@/components/dialogs/user/DialogUserChangeStatus.vue";
const dialogUserChangeStatus = ref(false);

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { search, more } from "@/api/users";

import { ref, onMounted } from "vue";

const isLoading = ref(false);
const users = ref();
const user = ref();

const params = ref({
  searchText: "",
  columnName: "email",
  orderDirection: "asc",
  limitNumber: 5,
});

const viewHandler = ({ id }) => {
  router.push({
    name: "AdminUsersView",
    params: { userId: id },
  });
};

const changeRolesHandler = (item) => {
  user.value = item;
  dialogUserChangeRoles.value = true;
};

const changeStatusHandler = (item) => {
  user.value = item;
  dialogUserChangeStatus.value = true;
};

onMounted(async () => {
  loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    users.value = await search(params.value);
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const moreHandler = async () => {
  try {
    const result = await more(params.value);
    users.value = [...users.value, ...result];
  } catch ({ message }) {
    show("error", message);
  }
};
</script>
