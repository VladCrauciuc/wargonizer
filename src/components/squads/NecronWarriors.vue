<template>
  <div class="form-group mb-3">
    <!-- optionalBasicTroopLoadout -->
    <div class="form-floating mb-3">
      <select
        class="form-select border-0"
        id="optional-loadout-select"
        v-model="optionalTroopLoadoutSelect"
      >
        <option value="" hidden>Select Optional Troop Loadout</option>
        <option
          v-for="weapon in currentSquad.optionalTroopLoadout"
          :key="weapon"
        >
          {{ weapon }}
        </option>
      </select>
      <label for="optional-loadout-select">Optional Troop Loadout</label>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  props: { currentSquad: Object, currentModelNumber: Number },
  setup(props, { emit }) {
    const optionalTroopLoadoutSelect = ref("");
    return {
      optionalTroopLoadoutSelect,
    };
  },
};
</script>

<style></style>
