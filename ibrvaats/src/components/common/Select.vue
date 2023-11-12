<template>
  <v-select
    density="comfortable"
    :persistentPlaceholder="true"
    hideDetails="auto"
    :clearable="true"
    variant="outlined"
    rounded="xl"
  >
    <slot />
  </v-select>
</template>

<script setup></script>

<style scoped></style>
