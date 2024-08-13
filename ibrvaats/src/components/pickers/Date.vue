<template>
  <v-menu
    transition="slide-y-transition"
    v-model="menu"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ props }">
      <TextField
        class="mt-2"
        v-bind="props"
        density="comfortable"
        readonly
        v-model="formattedTime"
        :disabled="disabled"
        clearable
        @click:clear="onClear"
        placeholder="Date"
      />
    </template>
    <v-date-picker
      color="primary"
      v-model="pickerDate"
      @update:modelValue="onDateHandler"
    />
  </v-menu>
</template>

<script setup>
import TextField from "@/components/common/TextField.vue";
import { useModel, toStringDate, toDate } from "@/utils/vue";
import { onMounted } from "vue";
import { toRefs, ref, computed, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String, disabled: Boolean });

const propsRef = toRefs(props);
const time = computed(useModel(propsRef, emit, "modelValue"));
const pickerDate = ref();
const menu = ref();

onMounted(() => {
  pickerDate.value = toDate(time.value);
});

const formattedTime = computed(() => {
  if (time.value === null) return "";
  return toStringDate(time.value);
});

const onDateHandler = () => {
  menu.value = false;
};

const onClear = () => {
  time.value = null;
};

watch(pickerDate, () => {
  if (time.value !== null) time.value = toStringDate(pickerDate.value);
});
</script>
