<template>
  <Dialog v-model="dialog" :width="1024" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header> Add Police Station</Label>
      </v-card-title>
      <v-card-text>
        <FormPoliceStation v-model="policeStation" />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button
              @click="submitHandler"
              :disabled="!policeStation.name"
              :loading="isLoading"
            >
              Submit
            </Button>
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
cloneDeep;
import FormPoliceStation from "@/components/forms/police-station/FormPoliceStation.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { cloneDeep } from "lodash";

import { POLICE_STATION } from "@/constants";

import { create } from "@/api/police-stations";

import { useModel } from "@/utils/vue";

import { ref, toRefs, computed } from "vue";
const props = defineProps({ modelValue: Boolean });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const policeStation = ref(cloneDeep(POLICE_STATION));

const submitHandler = async () => {
  try {
    isLoading.value = true;
    await create(policeStation.value);
    emit("done");
    show("success", "Added an policeStation!");
    policeStation.value = {};
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
