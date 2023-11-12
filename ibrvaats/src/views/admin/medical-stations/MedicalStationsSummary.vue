<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Medical Stations</Label>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="3">
          <TextField
            v-model="params.searchText"
            append-inner-icon="mdi-magnify"
            variant="outlined"
            @keypress.enter="loadItems"
            uppercase
          />
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col>
          <DataTable
            hover
            :loading="isLoading"
            :headers="headers"
            :items="medicalStations"
            :items-per-pageNumber="params.limitNumber"
            hide-default-footer
            withRemove
            withAdd
            withView
            @remove="removeHandler"
            @view="viewHandler"
            @add="addHandler"
            @more="moreHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <DialogMedicalStationAdd
      v-model="dialogMedicalStationAdd"
      @done="loadItems"
    />
    <DialogMedicalStationView
      v-model="dialogMedicalStationView"
      v-model:medicalStation="medicalStation"
      @done="loadItems"
    />
    <DialogMedicalStationRemove
      v-model="dialogMedicalStationRemove"
      v-model:medicalStation="medicalStation"
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

import DialogMedicalStationAdd from "@/components/dialogs/medical-station/DialogMedicalStationAdd.vue";
import DialogMedicalStationRemove from "@/components/dialogs/medical-station/DialogMedicalStationRemove.vue";
import DialogMedicalStationView from "@/components/dialogs/medical-station/DialogMedicalStationView.vue";

import { search, more } from "@/api/medical-stations";

import { ref, onMounted } from "vue";

const dialogMedicalStationAdd = ref(false);
const dialogMedicalStationRemove = ref(false);
const dialogMedicalStationView = ref(false);

const isLoading = ref(false);
const medicalStations = ref();
const medicalStation = ref();

const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const addHandler = async () => {
  dialogMedicalStationAdd.value = true;
};

const removeHandler = async (item) => {
  medicalStation.value = item;
  dialogMedicalStationRemove.value = true;
};

const viewHandler = (item) => {
  medicalStation.value = item;
  dialogMedicalStationView.value = true;
};

onMounted(async () => {
  loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    medicalStations.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const moreHandler = async () => {
  try {
    isLoading.value = true;
    const result = await more(params.value);
    medicalStations.value = [...medicalStations.value, ...result];
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
