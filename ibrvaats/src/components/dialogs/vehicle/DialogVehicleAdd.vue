<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header> Add Vehicle </Label>
      </v-card-title>
      <v-card-text>
        <FormVehicle
          v-model="vehicle"
          :option="[
            'plateNumber',
            'brand',
            'model',
            'driverName',
            'driverMobile',
            'driverAddress',
            'status',
            'applicationDate',
          ]"
        />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button
              @click="submitHandler"
              :loading="isLoading"
              :disabled="!vehicle.plateNumber"
              >Submit</Button
            >
          </v-col>
          <v-col cols="auto">
            <Button @click="closeHandler" variant="outlined">Close</Button>
          </v-col>
        </v-row>
      </v-card-actions>
    </Card>
  </Dialog>
</template>

<script setup>
import Button from "@/components/common/Button.vue";
import Label from "@/components/common/Label.vue";
import Dialog from "@/components/common/Dialog.vue";
import FormVehicle from "@/components/forms/vehicle/FormVehicle.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { create } from "@/api/vehicles";

import { useModel } from "@/utils/vue";

import { ref, toRefs, computed } from "vue";
const props = defineProps({ modelValue: Boolean });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const vehicle = ref({
  // name: "Dog",
  // type: "Mammal",
  // breeds: [
  //   "Dobermann",
  //   "Shih Tzu ",
  //   "German Shepherd",
  //   "Siberian Husky",
  //   "Golden Retriever",
  //   "Labrador Retriever",
  // ],
});

const submitHandler = async () => {
  try {
    isLoading.value = true;
    const docRef = await create(vehicle.value);
    emit("done");
    show("success", "Added an vehicle!");
    vehicle.value = {};
    dialog.value = false;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const closeHandler = () => {
  dialog.value = false;
};
</script>

<style></style>
