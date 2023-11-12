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
            withAdd
            withRemove
            @add="addHandler"
            @remove="removeHandler"
            @view="viewHandler"
            @more="moreHandler"
          />
        </v-col>
      </v-row>
    </Sheet>

    <DialogUserAddToPoliceStation
      v-model="dialogUserAddToPoliceStation"
      v-model:policeStation="policeStation"
      @added="loadItems"
    />

    <DialogUserRemoveFromPoliceStation
      v-model="dialogUserRemoveFromPoliceStation"
      v-model:user="user"
      v-model:policeStation="policeStation"
      @removed="loadItems"
    />
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import DataTable from "@/components/tables/DataTable.vue";
import { headers } from "./data";

import DialogUserAddToPoliceStation from "@/components/dialogs/user/DialogUserAddToPoliceStation.vue";
import DialogUserRemoveFromPoliceStation from "@/components/dialogs/user/DialogUserRemoveFromPoliceStation.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { search, more } from "@/api/police-stations/users";

import { ref, onMounted, inject } from "vue";
import { watchEffect } from "vue";

const dialogUserAddToPoliceStation = ref(false);
const dialogUserRemoveFromPoliceStation = ref(false);

const isLoading = ref(false);
const users = ref();
const user = ref();

const policeStation = inject("policeStation");

const params = ref({
  searchText: "",
  columnName: "email",
  orderDirection: "asc",
  limitNumber: 5,
});

const viewHandler = ({ id }) => {
  router.push({
    name: "PoliceStationUsersView",
    params: { userId: id },
  });
};

const addHandler = () => {
  dialogUserAddToPoliceStation.value = true;
};

const removeHandler = (item) => {
  user.value = item;
  dialogUserRemoveFromPoliceStation.value = true;
};

const loadItems = async () => {
  try {
    isLoading.value = true;
    users.value = await search(params.value, policeStation.value);
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const moreHandler = async () => {
  try {
    const result = await more(params.value, policeStation.value);
    users.value = [...users.value, ...result];
  } catch ({ message }) {
    show("error", message);
  }
};

watchEffect(async () => {
  if (policeStation.value) loadItems();
});
</script>
