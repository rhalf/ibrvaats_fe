<template>
  <v-app>
    <v-main>
      <Navbar v-model:drawer="drawer" />
      <Sidebar v-model="drawer" v-if="withDrawer" />

      <router-view v-slot="{ Component }">
        <!-- <v-fade-transition> -->
        <component :is="Component" />
        <!-- </v-fade-transition> -->
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from "./components/navbar/Navbar.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { USER_ROLES } from "@/constants";
const { ADMIN } = USER_ROLES;

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

import { ref, watchEffect, inject, computed, provide } from "vue";
import { get } from "@/api/police-stations";
const drawer = ref(false);

const user = inject("user");
const policeStation = ref(null);

provide("policeStation", policeStation);

const withDrawer = computed(() => {
  return !!route.params.policeStationId;
});

watchEffect(async () => {
  try {
    if (!user.value) return;

    start();

    const { roles } = user.value;
    const { authorization } = route.meta;

    if (route.params.policeStationId)
      policeStation.value = await get(route.params.policeStationId);

    if (roles.includes(authorization) || roles.includes(ADMIN))
      console.log("ALLOWED");
    else router.push({ name: "ForbiddenView" });
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
});
</script>
