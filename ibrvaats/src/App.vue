<template>
  <div id="progress-line" />
  <v-app>
    <router-view v-slot="{ Component }">
      <!-- <v-fade-transition> -->
      <component :is="Component" />
      <!-- </v-fade-transition> -->
    </router-view>

    <Snackbar />
    <ProgressLine />
  </v-app>
</template>

<script setup>
import Snackbar from "@/components/common/Snackbar.vue";

import ProgressLine from "@/components/common/ProgressLine.vue";

import { useProgressLineStore } from "@/store/progress-line";

const { start, stop } = useProgressLineStore();
const progressLine = useProgressLineStore();

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { get as getUser } from "@/api/users";

import { ref, provide } from "vue";

const user = ref(null);

provide("user", user);

const loadUser = async (authUser) => {
  try {
    start();
    const result = await getUser(authUser.uid);
    if (result) user.value = result;
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
};

import { auth } from "@/plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await loadUser(user);
    console.log("signedIn");
  } else {
    console.log("signedOut");
  }
});
</script>

<style scoped></style>
