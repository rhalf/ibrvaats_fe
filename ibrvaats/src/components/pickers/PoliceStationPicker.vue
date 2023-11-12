<template>
  <Autocomplete
    v-model="item"
    v-model:search="params.searchText"
    :items="items"
    :persistentPlaceholder="true"
    :clearable="true"
    :loading="isLoading"
    placeholder="Police Station"
    density="comfortable"
    variant="outlined"
    rounded="xl"
    prependInnerIcon="mdi-police-station"
    item-title="name"
    item-value="name"
    return-object
    @update:search="updateSearchHandler"
  />
</template>

<script setup>
import Autocomplete from "@/components/common/Autocomplete.vue";

import { debounce } from "lodash";

import { search } from "@/api/police-stations";

import { toRefs, watch, ref, computed, onMounted } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object });
const propsRef = toRefs(props);

const item = computed(useModel(propsRef, emit, "modelValue"));
const isLoading = ref(false);

const items = ref([]);
const params = ref({
  searchText: null,
  columnName: "name",
  orderDirection: "asc",
  limit: 5,
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    items.value = await search(params.value);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadItems();
});

const load = debounce(() => {
  if (!params.value.searchText) return;
  loadItems();
}, 500);

watch(
  params,
  () => {
    load();
  },
  { immediate: true, deep: true }
);

const updateSearchHandler = () => {
  if (typeof params.value.searchText != "string") return;
  params.value.searchText = params.value.searchText.toUpperCase();
};
</script>

<style></style>
