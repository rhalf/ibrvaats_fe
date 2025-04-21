<template>
  <v-row dense>
    <v-col cols="12" md="">
      <Label class="text-primary"> PlateNumber </Label>
      <TextField
        v-model="vehicle.plateNumber"
        placeholder="PlateNumber"
        :disabled="disabled"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Model </Label>
      <TextField
        v-model="vehicle.vehicleModel"
        placeholder="Model"
        :disabled="disabled"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Brand </Label>
      <TextField
        v-model="vehicle.vehicleBrand"
        placeholder="Brand"
        :disabled="disabled"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" md="">
      <Label class="text-primary"> Driver's Name </Label>
      <TextField
        v-model="vehicle.driverName"
        placeholder="Name"
        :disabled="disabled"
      />
    </v-col>
    <v-col cols="12" md="">
      <Label class="text-primary"> Driver's Mobile </Label>
      <TextField
        v-model="vehicle.driverMobile"
        placeholder="Mobile"
        :disabled="disabled"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" md="">
      <Label class="text-primary"> Driver's Address </Label>
      <TextField
        v-model="vehicle.driverAddress"
        placeholder="Address"
        :disabled="disabled"
      />
    </v-col>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Status </Label>
      <StatusType
        class="mt-2"
        v-model="vehicle.status"
        placeholder="Status"
        :disabled="disabled || !isAllowed('status')"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Date of Application </Label>
      <Date
        class="mt-2"
        v-model="vehicle.applicationDate"
        placeholder="Date of Application"
        :disabled="disabled || !isAllowed('applicationDate')"
      />
    </v-col>

    <v-row dense class="mt-4">
      <v-col>
        <Label class="text-primary" bold>In case of Emergency </Label>
      </v-col>
    </v-row>
  </v-row>

  <v-row dense class="mt-2">
    <v-col cols="12" md="6">
      <Label class="text-primary"> Contact Name </Label>
      <TextField
        class="mt-2"
        v-model="vehicle.contactName"
        placeholder="Contact Name"
        :disabled="disabled"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Label class="text-primary"> Contact Number </Label>
      <TextField
        class="mt-2"
        v-model="vehicle.contactNumber"
        placeholder="Contact Number"
        :disabled="disabled"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";

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

const vehicle = computed(useModel(propsRef, emit, "modelValue"));

const isAllowed = (prop) => {
  const { option } = propsRef;
  return option.value?.includes(prop);
};
</script>

<style></style>
