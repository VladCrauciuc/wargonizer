<template>
  <p>Terminator Squad</p>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  props: { currentSquad: Object, currentModelNumber: Number },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style></style>
