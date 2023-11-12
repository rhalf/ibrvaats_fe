<template>
  <v-container>
    <v-row dense class="mt-5">
      <v-col align="start">
        <Label title class="text-primary"> Sign up </Label>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col align="start">
        <Label text>
          Already have an account?
          <Anchor @click="loginHandler">Log in</Anchor>
          or
          <Anchor @click="forgotHandler">Forgot?</Anchor>
        </Label>
      </v-col>
    </v-row>

    <FormSignup v-model:form="form" v-model:data="data" />

    <v-row class="mt-5">
      <v-col>
        <Button
          block
          :disabled="!form"
          type="submit"
          size="large"
          @click="onSubmitHandler"
        >
          Sign Up
        </Button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";
import Anchor from "@/components/common/Anchor.vue";

import FormSignup from "@/components/forms/session/FormSignup.vue";

import { ref } from "vue";
import { SIGNUP, USER_ROLES, USER } from "@/constants";
const { ADMIN, POLICE, MEDIC } = USER_ROLES;

import { cloneDeep } from "lodash";

import { signUp, emailVerification } from "@/api/session";
import { create } from "@/api/users";

const data = ref(cloneDeep(SIGNUP));
const form = ref();

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

//router
import { useRouter } from "vue-router";
const router = useRouter();

const loginHandler = () => {
  router.push({ name: "SessionLogin" });
};

const signUpHandler = () => {};

const forgotHandler = () => {
  router.push({ name: "SessionForgot" });
};

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

//onSubmitHandler
const onSubmitHandler = async (event) => {
  if (!form.value) return;

  try {
    start();
    // Signed up
    const { email, password1, role, policeStation, medicalStation } =
      data.value;
    const result = await signUp(email, password1);
    // Email verification
    await emailVerification();
    show("success", "Successful! Email verification has been sent!");

    const user = result.user;
    // console.log(user);

    const newUser = cloneDeep(USER);
    newUser.id = user.uid;
    newUser.email = user.email;
    newUser.roles = [role];

    user.value = await create(newUser);

    data.value = cloneDeep(SIGNUP);
    router.push({ name: "SessionLogin" });

    show("success", "created a user");
  } catch ({ message }) {
    show("error", message);
  } finally {
    stop();
  }
};
</script>
