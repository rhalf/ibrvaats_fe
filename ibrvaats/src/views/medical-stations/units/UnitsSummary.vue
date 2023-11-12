<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Units</Label>
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
            :items-per-page="params.limitNumber"
            hide-default-footer
            withRemove
            withView
            withAdd
            @remove="removeHandler"
            @view="viewHandler"
            @add="addHandler"
            @next="nextHandler"
            @prev="prevHandler"
          />
        </v-col>
      </v-row>
    </Sheet>

    <!-- <DialogUnitAddToPolice v-model="dialogUnitAddToPolice" @done="loadItems" />
    <DialogUnitViewFromPolice
      v-model="dialogUnitViewFromPolice"
      v-model:unit="unit"
      @done="loadItems"
    />
    <DialogUnitRemoveFromPolice
      v-model="dialogUnitRemoveFromPolice"
      v-model:unit="unit"
      @done="loadItems"
    /> -->
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Anchor from "@/components/common/Anchor.vue";
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import DataTable from "@/components/tables/DataTable.vue";
import { headers } from "./data";

// import DialogUnitAddToPolice from "@/components/dialogs/unit/DialogUnitAddToPolice.vue";
// import DialogUnitViewFromPolice from "@/components/dialogs/unit/DialogUnitViewFromPolice.vue";
// import DialogUnitRemoveFromPolice from "@/components/dialogs/unit/DialogUnitRemoveFromPolice.vue";

import { searchByPolice, nextByPolice, prevByPolice } from "@/api/units";

import { ref, onMounted } from "vue";

const dialogUnitAddToPolice = ref(false);
const dialogUnitViewFromPolice = ref(false);
const dialogUnitRemoveFromPolice = ref(false);

const isLoading = ref(false);
const units = ref();
const unit = ref();
const params = ref({
  searchText: "",
  columnName: "uid",
  orderDirection: "asc",
  limitNumber: 5,
});

const addHandler = () => {
  dialogUnitAddToPolice.value = true;
};

const removeHandler = async (item) => {
  unit.value = item;
  dialogUnitRemoveFromPolice.value = true;
};

const viewHandler = (item) => {
  unit.value = item;
  dialogUnitViewFromPolice.value = true;
};

const clickHandler = () => {
  window.open("https://www.facebook.com/Petdentity");
};

onMounted(async () => {
  await loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;

    units.value = await searchByPolice(params.value);
  } catch ({ message }) {
    units.value = [];
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const nextHandler = async () => {
  try {
    isLoading.value = true;

    units.value = await nextByPolice(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

const prevHandler = async () => {
  try {
    isLoading.value = true;

    units.value = await prevByPolice(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
