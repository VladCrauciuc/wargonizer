<template>
  <div class="form-group mb-3">
    <div class="form-floating mb-3">
      <select
        class="form-select border-0"
        id="optional-equipment-select"
        v-model="optionalEquipmentSelect"
        @change="setSquadOptions"
      >
        <option value="" hidden>Select Optional Equipment</option>
        <option
          v-for="weapon in currentSquad.optionalSquadEquipment"
          :key="weapon"
        >
          {{ weapon }}
        </option>
      </select>
      <label for="optional-equipment-select">Optional Troop Loadout</label>
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
    return { optionalEquipmentSelect };
  },
};
</script>

<style></style>
