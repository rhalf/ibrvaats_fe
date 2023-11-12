<template>
  <Select
    v-model="type"
    :items="items"
    :persistentPlaceholder="true"
    :clearable="true"
    density="comfortable"
    variant="outlined"
    rounded="xl"
    placeholder="Role"
    item-title="name"
    item-value="name"
  />
</template>

<script setup>
import Select from "@/components/common/Select.vue";
import { computed, toRefs, onMounted } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String });
const propsRef = toRefs(props);

import { USER_ROLES } from "@/constants";

const items = Object.keys(USER_ROLES);

const type = computed(useModel(propsRef, emit, "modelValue"));

onMounted(() => {});
</script>

<style></style>
