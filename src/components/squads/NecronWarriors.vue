<template>
  <div class="form-group mb-3">
    <!-- optionalTroopLoadout -->
    <div class="form-floating mb-3" v-show="currentModelNumber !== 0">
      <select
        class="form-select border-0"
        id="optional-loadout-select"
        v-model="optionalTroopLoadoutSelect"
        @change="setSquadOptions"
      >
        <option value="" hidden>Select Optional Troop Loadout</option>
        <template
          v-for="(weapon, index) in currentSquad.optionalTroopLoadout"
          :key="weapon"
        >
          <option v-if="index <= currentModelNumber - 1">
            {{ weapon }}
          </option>
        </template>
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

    const squadOptions = ref([]);

    // splice is for adding or removing from squadOptions
    const splice = (index, length, value) => {
      squadOptions.value.splice(index, length, value);
    };

    watch(
      () => props.currentModelNumber,
      () => {
        optionalTroopLoadoutSelect.value = "";
        splice(0, 1, "");
        console.log(squadOptions.value);
      }
    );

    const setSquadOptions = () => {
      if (optionalTroopLoadoutSelect.value !== "") {
        splice(0, 1, optionalTroopLoadoutSelect.value);
      } else {
        splice(0, 1, "");
      }
      console.log(squadOptions.value);
    };

    return {
      splice,
      optionalTroopLoadoutSelect,
      setSquadOptions,
    };
  },
};
</script>

<style></style>
