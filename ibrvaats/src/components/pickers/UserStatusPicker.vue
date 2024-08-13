<template>
  <Select
    v-model="type"
    :items="computedItems"
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
const props = defineProps({ modelValue: String, remove: String });
const propsRef = toRefs(props);

const { remove } = propsRef;

import { Statuses } from "@/constants";

const items = Object.keys(Statuses);

//items.splice(0, 1);

const type = computed(useModel(propsRef, emit, "modelValue"));

const computedItems = computed(() => {
  if (typeof remove.value === "string") {
    let index = items.indexOf(remove.value);
    items.splice(index, 1);
    return items;
  }

  if (typeof remove.value === null || typeof remove.value === "undefined") {
    return items;
  }
});

onMounted(() => {});
</script>

<style></style>
