<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Police Stations</Label>
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
            :items="policeStations"
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
    <DialogPoliceStationAdd
      v-model="dialogPoliceStationAdd"
      @done="loadItems"
    />
    <DialogPoliceStationView
      v-model="dialogPoliceStationView"
      v-model:policeStation="policeStation"
      @done="loadItems"
    />
    <DialogPoliceStationRemove
      v-model="dialogPoliceStationRemove"
      v-model:policeStation="policeStation"
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

import DialogPoliceStationAdd from "@/components/dialogs/police-station/DialogPoliceStationAdd.vue";
import DialogPoliceStationRemove from "@/components/dialogs/police-station/DialogPoliceStationRemove.vue";
import DialogPoliceStationView from "@/components/dialogs/police-station/DialogPoliceStationView.vue";

import { search, more } from "@/api/police-stations";

import { ref, onMounted } from "vue";

const dialogPoliceStationAdd = ref(false);
const dialogPoliceStationRemove = ref(false);
const dialogPoliceStationView = ref(false);

const isLoading = ref(false);
const policeStations = ref();
const policeStation = ref();

const params = ref({
  searchText: "",
  columnName: "name",
  orderDirection: "asc",
  limitNumber: 5,
});

const addHandler = async () => {
  dialogPoliceStationAdd.value = true;
};

const removeHandler = async (item) => {
  policeStation.value = item;
  dialogPoliceStationRemove.value = true;
};

const viewHandler = (item) => {
  policeStation.value = item;
  dialogPoliceStationView.value = true;
};

onMounted(async () => {
  loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    policeStations.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const moreHandler = async () => {
  try {
    const result = await more(params.value);
    policeStations.value = [...policeStations.value, ...result];
  } catch ({ message }) {
    console.log("error", message);
  }
};
</script>
