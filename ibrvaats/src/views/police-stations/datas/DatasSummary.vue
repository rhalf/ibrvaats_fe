<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Datas</Label>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="3">
          <TextField
            v-model="params.searchText"
            append-inner-icon="mdi-magnify"
            variant="outlined"
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
            :items="units"
            :items-per-pageNumber="params.limitNumber"
            hide-default-footer
            withRemove
            withAdd
            withView
            @remove="removeHandler"
            @view="viewHandler"
            @add="addHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogUnitAdd v-model="dialogUnitAdd" @done="loadItems" />
    <DialogUnitView
      v-model="dialogUnitView"
      v-model:unit="unit"
      @done="loadItems"
    />
    <DialogUnitRemove
      v-model="dialogUnitRemove"
      v-model:unit="unit"
      @done="loadItems"
    />
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import DataTable from "@/components/tables/DataTable.vue";
import { headers } from "./data";

import DialogUnitAdd from "@/components/dialogs/unit/DialogUnitAdd.vue";
import DialogUnitView from "@/components/dialogs/unit/DialogUnitView.vue";
import DialogUnitRemove from "@/components/dialogs/unit/DialogUnitRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { search, next, prev } from "@/api/police-stations/datas";
import { countByPolice as countUnit } from "@/api/units";

import { ref, onMounted } from "vue";

const dialogUnitAdd = ref(false);
const dialogUnitView = ref(false);
const dialogUnitRemove = ref(false);

const isLoading = ref(false);
const units = ref();
const unit = ref();
const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const addHandler = async () => {
  try {
    isLoading.value = true;

    dialogUnitAdd.value = true;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const updateHandler = (item) => {
  unit.value = item;
  dialogUnitView.value = true;
};

const removeHandler = async (item) => {
  unit.value = item;
  dialogUnitRemove.value = true;
};

const viewHandler = async (item) => {
  router.push({
    name: "PoliceUnitView",
    params: {
      id: item.id,
    },
  });
};

onMounted(async () => {
  await loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    units.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    units.value = await next(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;
    units.value = await prev(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
