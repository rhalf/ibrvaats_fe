<template>
  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> UID </Label>
      <TextField
        class="mt-2"
        v-model="unit.uid"
        placeholder="UID"
        counter
        :disabled="disabled || !isAllowed('uid')"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" md="">
      <Label class="text-primary"> Unit Type </Label>
      <UnitType
        class="mt-2"
        v-model="unit.unitType"
        :disabled="disabled || !isAllowed('unitType')"
      />
    </v-col>
    <v-col cols="12" md="">
      <Label class="text-primary"> Form Type </Label>
      <UnitFormType
        class="mt-2"
        v-model="unit.formType"
        :disabled="disabled || !isAllowed('formType')"
      />
    </v-col>
  </v-row>

  <v-row dense>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Sim Network </Label>
      <TextField
        class="mt-2"
        v-model="unit.simNetwork"
        placeholder="Sim Network"
        :disabled="disabled || !isAllowed('simNetwork')"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Sim Number </Label>
      <TextField
        class="mt-2"
        v-model="unit.simNumber"
        placeholder="Sim Number"
        :disabled="disabled || !isAllowed('simNumber')"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Status </Label>
      <StatusType
        class="mt-2"
        v-model="unit.status"
        placeholder="Status"
        :disabled="disabled || !isAllowed('status')"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Date of Application </Label>
      <Date
        class="mt-2"
        v-model="unit.applicationDate"
        placeholder="Date of Application"
        :disabled="disabled || !isAllowed('applicationDate')"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Vehicle </Label>
      <TextField
        class="mt-2"
        v-model="unit.vehicle"
        placeholder="Vehicle"
        :disabled="disabled || !isAllowed('vehicle')"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Brand </Label>
      <TextField
        class="mt-2"
        v-model="unit.brand"
        placeholder="Brand"
        :disabled="disabled || !isAllowed('brand')"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

import UnitFormType from "@/components/pickers/UnitFormType.vue";
import UnitType from "@/components/pickers/UnitType.vue";
import StatusType from "@/components/pickers/StatusType.vue";
import Date from "@/components/pickers/Date.vue";

import { computed, toRefs } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
  disabled: Boolean,

  option: {
    type: Array,
    default: [],
  },
});

const propsRef = toRefs(props);
const { disabled } = propsRef;

const unit = computed(useModel(propsRef, emit, "modelValue"));

const isAllowed = (prop) => {
  const { option } = propsRef;
  return option.value?.includes(prop);
};
</script>

<style></style>
