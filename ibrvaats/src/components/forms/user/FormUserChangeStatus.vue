<template>
  <v-form v-model="form" @submit.prevent validate-on="input">
    <v-row dense>
      <v-col>
        <Label class="text-primary"> Status </Label>
        <v-row>
          <v-col>
            <UserStatusPicker class="mt-2" v-model="user.status" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import UserStatusPicker from "@/components/pickers/UserStatusPicker.vue";
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
