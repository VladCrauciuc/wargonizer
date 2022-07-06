<template>
  <!-- faction select -->
  <div class="form-group mb-3">
    <div class="form-floating">
      <select
        class="form-select border-0"
        id="faction-select"
        v-model="factionSelect"
        @change="$emit('setArmy', factionSelect)"
      >
        <option value="" hidden>Select a faction</option>
        <option v-for="army in armies" :key="army.name">
          {{ army.name }}
        </option>
      </select>
      <label for="faction-select">Faction</label>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { armies } from "../../db/_armies";

export default {
  props: { reset: Boolean },

  emits: ["setArmy"],

  setup(props, { emit }) {
    const factionSelect = ref("");

    // reset to empty value when displayValues called
    watch(
      () => props.reset,
      (newVal, oldVal) => {
        factionSelect.value = "";
      }
    );

    return { armies, factionSelect };
  },
};
</script>

<style></style>
