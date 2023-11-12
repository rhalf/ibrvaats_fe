<template>
  <v-container>
    <Sheet class="bg-transparent">
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="12"
          lg="6"
          xl="4"
          v-for="(item, index) in items"
          :key="index"
        >
          <Module v-model="items[index]" />
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Module from "./components/module/Module.vue";

import { USER_ROLES } from "@/constants";
const { POLICE, MEDIC, ADMIN } = USER_ROLES;

import { ref, inject, watchEffect } from "vue";

const user = inject("user");

import { dashboardItems } from "./data";

const items = ref();

const load = () => {
  const { roles } = user.value;

  return dashboardItems.map((item) => {
    return {
      ...item,
      authorized: isAuthorized(roles, item.roles),
    };
  });
};

const isAuthorized = (USER_ROLES, roles) => {
  let result = false;
  USER_ROLES.forEach((role) => {
    if (roles.includes(role)) result = true;
  });
  return result;
};

watchEffect(async () => {
  if (!user.value) return;

  items.value = await load();
});
</script>
