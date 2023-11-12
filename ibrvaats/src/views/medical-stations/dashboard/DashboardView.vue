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

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { count as countUsers } from "@/api/police-stations/users";
import { count as countUnits } from "@/api/police-stations/units";
import { count as countDatas } from "@/api/police-stations/datas";

import { ref, watchEffect, inject } from "vue";

import { dashboardItems } from "./data";

const user = inject("user");
const medicalStation = inject("medicalStation");

const counters = ref(dashboardItems);

const loadCounters = async () => {
  try {
    start();
    counters.value[0].count = await countUsers(medicalStation.value);
    counters.value[1].count = await countUnits(user.value);
    counters.value[2].count = await countDatas(user.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    stop();
  }
};

watchEffect(async () => {
  if (user.value && medicalStation.value) loadCounters();
});
</script>
