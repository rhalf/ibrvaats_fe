<template>
  <v-container>
    <Sheet>
      <v-row dense>
        <v-col cols="auto">
          <Label title class="text-primary">Accident Datas</Label>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="3">
          <!-- <TextField
            v-model="params.searchText"
            append-inner-icon="mdi-magnify"
            variant="outlined"
            @keypress.enter="loadItems"
          /> -->
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col>
          <DataTable
            hover
            :loading="isLoading"
            :headers="headers"
            :items="accidentDatas"
            :items-per-pageNumber="params.limitNumber"
            hide-default-footer
            withRemove
            withMore
            @remove="removeHandler"
            @view="viewHandler"
            @more="moreHandler"
          />
        </v-col>
      </v-row>
    </Sheet>
    <!-- <DialogUnitAdd v-model="dialogUnitAdd" @done="loadItems" />
    <DialogUnitView
      v-model="dialogUnitView"
      v-model:unit="unit"
      @done="loadItems"
    /> -->
    <DialogAccidentDataRemove
      v-model="dialogAccidentDataRemove"
      v-model:accident-data="accidentData"
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

// import DialogUnitAdd from "@/components/dialogs/unit/DialogUnitAdd.vue";
// import DialogUnitView from "@/components/dialogs/unit/DialogUnitView.vue";
import DialogAccidentDataRemove from "@/components/dialogs/accident-data/DialogAccidentDataRemove.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { search, more, changes } from "@/api/police-stations/datas";

import { ref, onMounted } from "vue";

const dialogUnitAdd = ref(false);
const dialogUnitView = ref(false);
const dialogAccidentDataRemove = ref(false);

const isLoading = ref(false);
const accidentDatas = ref();
const accidentData = ref();
const params = ref({
  searchText: "",
  columnName: "date",
  orderDirection: "desc",
  limitNumber: 5,
});

// const addHandler = async () => {
//   try {
//     isLoading.value = true;

//     dialogUnitAdd.value = true;
//   } catch ({ message }) {
//     show("error", message);
//   } finally {
//     isLoading.value = false;
//   }
// };

// const updateHandler = (item) => {
//   unit.value = item;
//   dialogUnitView.value = true;
// };

const removeHandler = async (item) => {
  accidentData.value = item;
  dialogAccidentDataRemove.value = true;
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
  await changes(params.value, "added", loadItems);
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    accidentDatas.value = await search(params.value);
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
    accidentDatas.value = [...accidentDatas.value, ...result];
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>
