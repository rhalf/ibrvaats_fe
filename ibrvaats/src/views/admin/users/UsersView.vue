<template>
  <v-container>
    <FormUserView v-model="user" />
  </v-container>
</template>

<script setup>
import FormUserView from "@/components/forms/user/FormUserView.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useRoute } from "vue-router";
const route = useRoute();

import { get } from "@/api/users";

import { ref, onMounted } from "vue";

const isLoading = ref(false);
const user = ref();

const loadItem = async () => {
  try {
    isLoading.value = true;
    const { userId } = route.params;
    user.value = await get(userId);
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadItem();
});
</script>
