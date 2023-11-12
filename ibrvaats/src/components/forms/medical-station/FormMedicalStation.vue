<template>
  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> Name </Label>
      <TextField
        class="mt-3"
        v-model="policeStation.name"
        placeholder="Name"
        :disabled="disabled"
        uppercase
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-4">
    <v-col cols="12" md="">
      <Label class="bg-primary pa-2"> Address </Label>
      <FormAddress
        class="mt-3"
        v-model="policeStation.address"
        :disabled="disabled"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";
import FormAddress from "@/components/forms/address/FormAddress.vue";

import { computed, toRefs } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
  disabled: Boolean,
});

const propsRef = toRefs(props);
const { disabled } = propsRef;
const policeStation = computed(useModel(propsRef, emit, "modelValue"));
</script>

<style></style>
