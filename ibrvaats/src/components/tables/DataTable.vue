<template>
  <!-- <v-data-table height="330"> -->
  <v-data-table fixed-header>
    <template v-slot:item.actions="{ item, index }">
      <ButtonIcon
        v-if="withView"
        @click="emit('view', item, index)"
        icon="mdi-eye"
        variant="flat"
        class="text-primary"
      />

      <ButtonIcon
        v-if="withUpdate"
        @click="emit('update', item, index)"
        icon="mdi-pencil"
        variant="flat"
        class="text-primary"
      />

      <ButtonIcon
        v-if="withRemove && !disabled"
        @click="emit('remove', item, index)"
        icon="mdi-trash-can"
        variant="flat"
        class="text-red"
      />
    </template>

    <template v-slot:bottom="{ item, index }">
      <v-row dense class="mt-2">
        <v-col cols="4" sm="3" md="2" lg="1" align="start">
          <Button @click="emit('more')" block>
            <v-icon>mdi-dots-horizontal</v-icon>
          </Button>
        </v-col>
        <v-spacer />
        <v-col
          cols="4"
          sm="3"
          md="2"
          lg="1"
          align="end"
          v-if="withAdd && !disabled"
        >
          <Button @click="emit('add')" block>
            <v-icon>mdi-plus</v-icon>
          </Button>
        </v-col>
      </v-row>
    </template>

    <template v-slot:item.roles="{ item, index }">
      <Chip class="primary mr-1" v-for="(role, key) in item.roles" :key="key">
        <Label caption>{{ role }}</Label>
      </Chip>
    </template>

    <template v-slot:item.address="{ item, index }">
      <v-row class="pa-1">
        <v-col>
          <Label text>
            {{ item.address.exact }}
            {{ item.address.division }}
          </Label>
          <Label caption class="text-grey">
            {{ item.address.barangay }}, {{ item.address.city }},
            {{ item.address.province }}, {{ item.address.region }},
            {{ item.address.country }},
            {{ item.address.zipcode }}
          </Label>
        </v-col>
      </v-row>
    </template>

    <template v-slot:item.profile.name="{ item, index }">
      <Label text>
        {{ item.profile.name.last }},
        {{ item.profile.name.first }}
        {{ item.profile.name.middle }}
      </Label>
    </template>

    <template v-slot:item.date="{ item, index }">
      {{ toStringDatetime(item.date) }}
    </template>

    <template v-slot:item.age="{ item, index }">
      <Label text class="mt-2" @click="">
        {{ toStringAge(getAge(item.birthDate)) }}
      </Label>
    </template>

    <!-- Gps -->
    <template v-slot:item.coordinates="{ item, index }">
      <Button
        @click="gotoLocation(item.latitude, item.longitude)"
        variant="text"
        icon
      >
        <v-icon>mdi-map-marker</v-icon>
      </Button>
    </template>

    <template v-slot:item.satellite="{ item, index }">
      <Button variant="text">
        <v-icon class="mr-4">mdi-satellite-variant</v-icon>
        {{ item.satellite }}
      </Button>
    </template>

    <template v-slot:item.gpsFixed="{ item, index }">
      <Button variant="text">
        <v-icon v-if="item.gpsFixed" color="green"> mdi-check</v-icon>
        <v-icon v-else color="red"> mdi-close</v-icon>
      </Button>
    </template>
    <template v-slot:item.shock="{ item, index }">
      <Button variant="text">
        <v-icon v-if="item.shock" color="green"> mdi-check</v-icon>
        <v-icon v-else color="red"> mdi-close</v-icon>
      </Button>
    </template>

    <template v-slot:item.course="{ item, index }">
      <Button variant="text">
        {{ roundOff(item.course, 2) }}°,

        {{ degreeToCompass(item.course) }}
      </Button>
    </template>

    <template v-slot:item.speed="{ item, index }">
      <Button variant="text"> {{ Math.floor(item.speed) }} kph </Button>
    </template>
  </v-data-table>
</template>

<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";

import { useDisplay } from "vuetify";
const { xs, sm, md, lg, xl } = useDisplay();

import Chip from "@/components/common/Chip";
import Label from "@/components/common/Label";
import ButtonIcon from "@/components/common/ButtonIcon";
import Button from "@/components/common/Button";

import { getAge, toStringAge } from "@/utils/vue";

import { Timestamp } from "firebase/firestore";

import { degreeToCompass } from "@/utils/conversion";

const toStringDatetime = (date) => {
  if (date instanceof Timestamp) return date.toDate().toLocaleString();
  else return date.toLocaleString();
};

const emit = defineEmits([
  "view",
  "update",
  "remove",
  "add",
  "refresh",
  "more",
]);
const props = defineProps({
  withView: Boolean,
  withUpdate: Boolean,
  withRemove: Boolean,
  disabled: Boolean,
  withAdd: Boolean,
});

const roundOff = (value, places) => {
  const multiplier = 10 ** places;

  return Math.round(value * multiplier) / multiplier;
};

const gotoLocation = (latitude, longitude) => {
  const link = `https://www.google.com/maps/place/${latitude},${longitude}`;
  window.open(link);
};
</script>

<style scoped>
/* table > thead > tr > th {
  color: #ffc107 !important;
} */
</style>
