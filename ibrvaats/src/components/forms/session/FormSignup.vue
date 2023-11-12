<template>
  <v-form v-model="form" validate-on="input">
    <v-row dense>
      <v-col align="start">
        <v-row dense class="mt-3">
          <v-col align="start">
            <TextField
              name="email"
              v-model="data.email"
              placeholder="Email"
              prependInnerIcon="mdi-account"
              type="email"
              :rules="[validation.required, validation.email]"
            />
          </v-col>
        </v-row>
        <v-row dense class="mt-3">
          <v-col>
            <TextField
              name="password1"
              v-model="data.password1"
              placeholder="Password"
              prependInnerIcon="mdi-lock"
              type="password"
              :rules="[validation.required, validation.minimum]"
            />
          </v-col>
        </v-row>
        <v-row dense class="mt-3">
          <v-col>
            <TextField
              name="password2"
              v-model="data.password2"
              placeholder="Retype password"
              prependInnerIcon="mdi-lock"
              type="password"
              :rules="[
                validation.required,
                validation.match(data.password1, data.password2, 'password'),
              ]"
            />
          </v-col>
        </v-row>
        <v-row dense class="mt-3">
          <v-col>
            <UserRolePicker
              v-model="data.role"
              :rules="[validation.required]"
            />
          </v-col>
        </v-row>

        <!-- <v-row dense class="mt-3">
          <v-col>
            <PoliceStationPicker
              v-model="data.policeStation"
              :rules="[validation.required]"
              v-if="data.role === POLICE"
            />
            <MedicalStationPicker
              v-model="data.medicalStation"
              :rules="[validation.required]"
              v-if="data.role === MEDIC"
            />
          </v-col>
        </v-row> -->
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import TextField from "@/components/common/TextField.vue";
import validation from "@/utils/validation";
import UserRolePicker from "@/components/pickers/UserRolePicker";
// import PoliceStationPicker from "@/components/pickers/PoliceStationPicker";
// import MedicalStationPicker from "@/components/pickers/MedicalStationPicker";

import { USER_ROLES } from "@/constants";
const { MEDIC, POLICE, ADMIN } = USER_ROLES;

import { toRefs, computed } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:form", "update:data"]);

const props = defineProps({
  form: Boolean,
  data: Object,
});

const propsRef = toRefs(props);
const form = computed(useModel(propsRef, emit, "form"));
const data = computed(useModel(propsRef, emit, "data"));
</script>
