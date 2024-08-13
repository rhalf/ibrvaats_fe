<template>
  <Dialog v-model="dialog" :width="480" expand>
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header> Change Roles </Label>
      </v-card-title>
      <v-card-text>
        <FormUserChangeRole
          v-model="password"
          v-model:form="form"
          v-model:user="user"
        />
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button @click="addHandler" :disabled="!form">Add</Button>
          </v-col>
          <v-col cols="auto">
            <Button
              @click="submitHandler"
              :disabled="!form"
              :loading="isLoading"
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
import FormUserChangeRole from "@/components/forms/user/FormUserChangeRole.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { getDescription } from "@/plugins/firebase/error-codes";

import { update } from "@/api/users";

import { ref, toRefs, computed } from "vue";
import { watchEffect } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue", "changed"]);
const props = defineProps({ modelValue: Boolean, user: Object });
const propsRef = toRefs(props);

const { user } = propsRef;

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));

const password = ref(null);
const form = ref(false);

const addHandler = () => {
  if (user.value && user.value.roles.length >= 3) {
    show("error", "Roles should be maximum of 3 entries only.");
    return;
  }

  user.value.roles.push(null);
};

const submitHandler = async () => {
  try {
    isLoading.value = true;
    await update(user.value);
    emit("changed");
    show("success", "Changed roles!");
    password.value = null;
    closeHandler();
  } catch ({ code }) {
    const description = await getDescription(code);
    show("error", description);
  } finally {
    isLoading.value = false;
  }
};

const closeHandler = () => {
  dialog.value = false;
};
</script>

<style></style>
