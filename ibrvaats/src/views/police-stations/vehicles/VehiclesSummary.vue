<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Vehicles Summary</Label>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="3">
          <TextField
            v-model="params.searchText"
            append-inner-icon="mdi-magnify"
            variant="outlined"
            @keypress.enter="loadItems"
            @click:clear="loadItems"
          />
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col>
          <DataTable
            hover
            :loading="isLoading"
            :headers="headers"
            :items="vehicles"
            :items-per-page="params.limitNumber"
            hide-default-footer
            withRemove
            withView
            withAdd
            @view="viewHandler"
            @remove="removeHandler"
            @add="dialogVehicleAdd = true"
            @next="nextHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogVehicleAdd v-model="dialogVehicleAdd" @done="loadItems" />
    <DialogVehicleView
      v-model="dialogVehicleView"
      v-model:vehicle="vehicle"
      @done="loadItems"
    />

    <DialogVehicleRemove
      v-model="dialogVehicleRemove"
      v-model:vehicle="vehicle"
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

import DialogVehicleAdd from "@/components/dialogs/vehicle/DialogVehicleAdd.vue";
import DialogVehicleView from "@/components/dialogs/vehicle/DialogVehicleView.vue";
import DialogVehicleRemove from "@/components/dialogs/vehicle/DialogVehicleRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { search, next, prev } from "@/api/vehicles";

import { ref, onMounted } from "vue";

const dialogVehicleAdd = ref(false);
const dialogVehicleView = ref(false);
const dialogVehicleRemove = ref(false);

const isLoading = ref(false);
const vehicles = ref();
const vehicle = ref();
const params = ref({
  searchText: "",
  columnName: "plateNumber",
  orderDirection: "asc",
  limitNumber: 5,
});

onMounted(async () => {
  loadItems();
});

const viewHandler = (item) => {
  vehicle.value = item;
  dialogVehicleView.value = true;
};

const removeHandler = async (item) => {
  vehicle.value = item;
  dialogVehicleRemove.value = true;
};

const loadItems = async () => {
  try {
    isLoading.value = true;
    vehicles.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;
    vehicles.value = await next(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
