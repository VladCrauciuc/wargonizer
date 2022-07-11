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
        <option v-for="faction in factions" :key="faction.name">
          {{ faction.name }}
        </option>
      </select>
      <label for="faction-select">Faction</label>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { factions } from "../../db/_factions";

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

    return { factions, factionSelect };
  },
};
</script>

<style></style>
