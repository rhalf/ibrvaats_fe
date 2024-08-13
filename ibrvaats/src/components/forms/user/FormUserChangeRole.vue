<template>
  <v-form v-model="form" @submit.prevent validate-on="input">
    <v-row dense>
      <v-col>
        <Label class="text-primary"> Roles </Label>
        <v-row v-for="(role, index) in user.roles">
          <v-col>
            <UserRolePicker class="mt-2" v-model="user.roles[index]" />
          </v-col>
          <v-col cols="auto" class="d-flex align-center justify-center">
            <Button
              icon
              color="red"
              variant="text"
              @click="removeHandler(index)"
            >
              <v-icon>mdi-trash-can</v-icon>
            </Button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import UserRolePicker from "@/components/pickers/UserRolePicker.vue";
import Button from "@/components/common/Button.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { toRefs, computed, ref } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue", "update:form", "update:user"]);
const props = defineProps({
  modelValue: String,
  form: Boolean,
  user: Object,
});

const propsRef = toRefs(props);
const user = computed(useModel(propsRef, emit, "user"));

const form = computed(useModel(propsRef, emit, "form"));

const removeHandler = (index) => {
  if (user.value && user.value.roles.length == 1) {
    show("error", "Roles should be minimum of 1 entry only.");
    return;
  }

  user.value.roles.splice(index, 1);
};
</script>

<style></style>
