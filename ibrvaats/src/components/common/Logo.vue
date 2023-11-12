<template>
  <v-img :width="150" :aspectRatio="1" :src="source" />
</template>

<script setup>
import { computed } from "vue";

import vertical from "@/assets/logo/vertical_1.png";
import horizontal from "@/assets/logo/horizontal_1.png";
import solo from "@/assets/logo/solo.png";
import solo1 from "@/assets/logo/solo-white.png";

const props = defineProps({
  position: {
    type: String,
  },
});

const source = computed(() => {
  if (props.position == "vertical") return vertical;
  if (props.position == "horizontal") return horizontal;
  if (props.position == "solo") return solo;
  if (props.position == "solo1") return solo1;
});
import { onMounted } from "vue";

onMounted(() => {});
</script>
