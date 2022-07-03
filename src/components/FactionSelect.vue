<template>
  <!-- faction select -->
  <div class="form-group mb-3">
    <div class="form-floating">
      <select
        class="form-select border-0"
        id="faction-select"
        v-model="factionSelect"
        @change="setCurrentArmy"
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
// import { ref } from "@vue/reactivity";

import { armies } from "../../db/_armies";
export default {
  setup(props, { emit }) {
    let factionSelect = ref("");
    let currentArmy = ref(null);

    const setCurrentArmy = () => {
      armies.forEach((army) => {
        if (army.name === factionSelect.value) {
          currentArmy.value = army;
        }
      });
      emit("toggleShowSquad", currentArmy.value);
    };

    return { armies, factionSelect, setCurrentArmy };
  },
};
</script>

<style></style>
