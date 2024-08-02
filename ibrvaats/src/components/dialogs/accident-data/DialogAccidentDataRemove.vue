<template>
  <Dialog v-model="dialog" :width="640">
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header> Remove Data </Label>
      </v-card-title>
      <v-card-text>
        <Label text> Are you sure you want to remove this data?</Label>
        <br />
        <Label header>Uid : "{{ accidentData.id }}" </Label>
        <Label header>Mac : "{{ accidentData.mac }}" </Label>
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button @click="submitHandler" :loading="isLoading">Yes</Button>
          </v-col>
          <v-col cols="auto">
            <Button @click="closeHandler" variant="outlined">No</Button>
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
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { remove } from "@/api/police-stations/datas";

import { useModel, syncProp } from "@/utils/vue";

import { ref, computed, toRefs } from "vue";
const props = defineProps({ modelValue: Boolean, accidentData: Object });
const propRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "update:accidentData", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propRef, emit, "modelValue"));
const accidentData = computed(syncProp(propRef, emit, "accidentData"));

const submitHandler = async () => {
  try {
    isLoading.value = true;
    const result = await remove(accidentData.value);
    show("success", "Removed an item!");
    emit("done");
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
