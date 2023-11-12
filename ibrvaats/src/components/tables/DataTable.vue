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

    <!-- <template v-slot:item.colors="{ item, index }">
      <Colors :colors="item.colors" />
    </template> -->

    <template v-slot:item.age="{ item, index }">
      <Label text class="mt-2">
        {{ toStringAge(getAge(item.birthDate)) }}
      </Label>
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
</script>

<style scoped>
/* table > thead > tr > th {
  color: #ffc107 !important;
} */
</style>
