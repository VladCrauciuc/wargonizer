<template>
  <form @submit.prevent>
    <FactionSelect @setArmy="setCurrentArmy" />
    <div class="form-group">
      <SquadSelect
        v-if="showSquadSelect"
        :currentArmy="currentArmy"
        @setSquad="setCurrentSquad"
      />
      <ModelNumberInput
        v-if="showModelNumberInput"
        :currentSquad="currentSquad"
      />
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { armies } from "../../db/_armies.js";

import FactionSelect from "./FactionSelect.vue";
import SquadSelect from "./SquadSelect.vue";
import ModelNumberInput from "./ModelNumberInput.vue";

export default {
  components: { FactionSelect, SquadSelect, ModelNumberInput },
  setup() {
    let showSquadSelect = ref(false);
    let showModelNumberInput = ref(false);

    let currentArmy = ref(null);
    let currentSquad = ref(null);

    const setCurrentArmy = (factionSelect) => {
      armies.forEach((army) => {
        if (factionSelect === army.name) {
          currentArmy.value = army;
        }
      });
      console.log(currentArmy.value.name);
      showSquadSelect.value = true;
      currentSquad.value = null;
    };

    const setCurrentSquad = (squadSelect) => {
      currentArmy.value.squads.forEach((squad) => {
        if (squadSelect === squad.name) {
          currentSquad.value = squad;
        }
      });
      console.log(currentSquad.value.name);
      showModelNumberInput.value = true;
    };

    return {
      setCurrentArmy,
      currentArmy,
      showSquadSelect,
      setCurrentSquad,
      currentSquad,
      showModelNumberInput,
    };
  },
};
</script>

<style></style>
