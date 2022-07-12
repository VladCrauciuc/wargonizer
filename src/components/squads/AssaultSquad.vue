<template>
  <div class="form-group mb-3">
    <!-- optionalEquipment -->
    <div class="form-floating mb-3">
      <select
        class="form-select border-0"
        id="optional-equipment-select"
        v-model="optionalEquipmentSelect"
      >
        <option value="" hidden>Select Optional Equipment</option>
        <option
          v-for="weapon in currentSquad.optionalSquadEquipment"
          :key="weapon"
        >
          {{ weapon }}
        </option>
      </select>
      <label for="optional-equipment-select">Optional Equipment</label>
    </div>
    <!-- optionalTroopLoadout -->
    <div class="form-floating mb-3">
      <select
        class="form-select border-0"
        id="optional-loadout-select"
        v-model="optionalTroopLoadoutSelect"
      >
        <option value="" hidden>Select Optional Loadout</option>
        <option
          v-for="weapon in currentSquad.optionalTroopLoadout"
          :key="weapon"
        >
          {{ weapon }}
        </option>
      </select>
      <label for="optional-loadout-select">Optional Loadout</label>
    </div>
    <!-- optionalMeeleOption -->
    <div class="form-floating mb-3" v-show="currentModelNumber !== 0">
      <select
        class="form-select border-0"
        id="optional-meele-select"
        v-model="optionalMeeleSelect"
      >
        <option value="" hidden>Select Optional Meele</option>
        <template
          v-for="(weapon, index) in currentSquad.optionalMeele"
          :key="weapon"
        >
          <option v-if="index <= currentModelNumber - 5">
            {{ weapon }}
          </option>
        </template>
      </select>
      <label for="optional-meele-select">Optional Meele</label>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  props: { currentSquad: Object, currentModelNumber: Number },
  setup(props, { emit }) {
    const optionalEquipmentSelect = ref("");
    const optionalTroopLoadoutSelect = ref("");
    const optionalMeeleSelect = ref("");
    return {
      optionalEquipmentSelect,
      optionalTroopLoadoutSelect,
      optionalMeeleSelect,
    };
  },
};
</script>

<style></style>
