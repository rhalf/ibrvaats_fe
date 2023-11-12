<template>
  <v-container>
    <Sheet class="bg-transparent">
      <Label header>Counters</Label>

      <v-row class="mt-2">
        <v-col
          cols="12"
          sm="4"
          md="3"
          lg="3"
          xl="2"
          v-for="(counter, index) in counters"
          :key="index"
        >
          <Counter v-model="counters[index]" />
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Sheet from "@/components/common/Sheet.vue";

import Counter from "@/components/views/counter/Counter.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { count as countPoliceStations } from "@/api/police-stations";
import { count as countMedicalStations } from "@/api/medical-stations";
import { count as countUnits } from "@/api/units";
import { count as countUsers } from "@/api/users";

import { dashboardItems } from "./data";

const counters = ref(dashboardItems);

import { onMounted, ref } from "vue";

onMounted(async () => {
  try {
    start();
    counters.value[0].count = await countPoliceStations();
    counters.value[1].count = await countMedicalStations();
    counters.value[2].count = await countUnits();
    counters.value[3].count = await countUsers();
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
});
</script>
