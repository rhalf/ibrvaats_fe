<template>
  <Dialog v-model="dialog" :width="480" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header> Add User To Police Station </Label>
      </v-card-title>
      <v-card-text>
        <UserPicker v-model="user" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button @click="submitHandler" :loading="isLoading">Submit</Button>
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
import UserPicker from "@/components/pickers/UserPicker.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { add } from "@/api/police-stations/users";

import { useModel } from "@/utils/vue";

import { ref, computed, toRefs } from "vue";
const props = defineProps({
  modelValue: Boolean,
  policeStation: Object,
});
const propRef = toRefs(props);
const emit = defineEmits([
  "update:modelValue",
  "update:policeStation",
  "added",
]);

const isLoading = ref(false);
const dialog = computed(useModel(propRef, emit, "modelValue"));
const policeStation = computed(useModel(propRef, emit, "policeStation"));
const user = ref();

const submitHandler = async () => {
  try {
    isLoading.value = true;

    await add(user.value, policeStation.value);
    emit("added");
    show("success", "Added a user!");
    closeHandler();
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
