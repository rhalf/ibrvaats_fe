<template>
  <v-app-bar :elevation="2" color="primary" class="text-no-wrap">
    <template v-slot:prepend>
      <v-app-bar-nav-icon variant="text" @click.stop="drawerHandler" />
    </template>

    <template v-slot:title>
      <Label header medium> MEDICAL STATION </Label>
    </template>

    <template v-slot:append>
      <ButtonIcon
        icon="mdi-home"
        class="text-bold"
        size="large"
        :to="{ name: 'UserDashboard' }"
      />
    </template>
  </v-app-bar>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";

import { useModel } from "@/utils/vue";
import { toRefs, computed } from "vue";

const emit = defineEmits(["update:drawer"]);
const props = defineProps({ drawer: Boolean });
const propsRef = toRefs(props);
const drawer = computed(useModel(propsRef, emit, "drawer"));

const drawerHandler = () => {
  drawer.value = !drawer.value;
};
</script>
