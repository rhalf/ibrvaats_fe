<template>
  <v-container>
    <Sheet>
      <v-row>
        <v-col cols="12" md="" align="start">
          <TextField
            v-model="params.searchText"
            append-inner-icon="mdi-magnify"
            @keypress="keypressHandler"
            placeholder="Search"
            uppercase
          />
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="4"
          align="start"
          v-for="(item, index) in items"
          :key="index"
        >
          <Card v-ripple class="bg-primary" @click="toHandler(item)">
            <v-card-title class="text-center">
              <v-icon class="text-h1 my-4">mdi-police-station</v-icon>
            </v-card-title>
            <v-card-text>
              <Label class="text-h6">{{ item.name }} </Label>
              <Label>
                {{ item.address.region ? "Region " : "" }}
                {{ item.address.region }}, {{ item.address.province }},
                {{ item.address.city }}
              </Label>
            </v-card-text>
          </Card>
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import TextField from "@/components/common/TextField.vue";
import Card from "@/components/common/Card.vue";
import Label from "@/components/common/Label.vue";
import Sheet from "@/components/common/Sheet.vue";

import { debounce } from "lodash";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { search } from "@/api/police-stations";

import { ref, watchEffect } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

const params = ref({
  searchText: null,
  columnName: "name",
  orderDirection: "asc",
  limit: 5,
});

const items = ref([]);

const toHandler = ({ id }) => {
  router.push({
    name: "PoliceStationDashboard",
    params: { policeStationId: id },
  });
};

const keypressHandler = debounce(() => {
  loadItems();
}, 1000);

const loadItems = async () => {
  try {
    start();
    items.value = await search(params.value);
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
};

watchEffect(async () => {
  await loadItems();
});
</script>
