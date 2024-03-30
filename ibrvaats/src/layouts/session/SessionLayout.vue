<template>
  <v-app>
    <v-main>
      <router-view v-slot="{ Component }">
        <v-layout full-height class="bg-primary">
          <v-row dense>
            <v-col align="center" align-self="center">
              <Card maxWidth="1280">
                <v-row dense>
                  <v-col v-if="!xs">
                    <Image
                      :src="image"
                      :width="undefined"
                      cover
                      :aspect-ratio="16 / 15"
                    />
                  </v-col>
                  <v-col :cols="xs ? 12 : 4">
                    <Sheet :minHeight="800">
                      <Logo
                        :width="150"
                        :aspect-ratio="7 / 9"
                        position="solo"
                      />
                      <Label class="text-h6">
                        IoT-Based Real-Time Vehicle Accident Alert and Tracking
                        System</Label
                      >

                      <!-- <v-fade-transition leave-absolute :mode="'out-in'"> -->
                      <v-slide-y-transition leave-absolute :mode="'out-in'">
                        <component :is="Component" />
                      </v-slide-y-transition>
                    </Sheet>
                  </v-col>
                </v-row>
              </Card>
            </v-col>
          </v-row>
        </v-layout>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Card from "@/components/common/Card.vue";
import Logo from "@/components/common/Logo.vue";
import Image from "@/components/common/Image.vue";
import Label from "@/components/common/Label.vue";

import image from "@/assets/images/background/vehicles.svg";

import { useDisplay } from "vuetify";
const { xs, sm } = useDisplay();

import { useProgressLineStore } from "@/store/progress-line";
const { start, stop } = useProgressLineStore();

import { onMounted } from "vue";

onMounted(() => {
  start();

  stop();
});
</script>
