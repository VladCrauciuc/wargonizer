<template>
  <form @submit.prevent>
    <!-- faction comes from here -->
    <Faction @setFaction="setCurrentFaction" :reset="reset" />
    <!-- squad comes from here -->
    <Squad
      v-if="showSquadSelect"
      :currentFaction="currentFaction"
      @setSquad="setCurrentSquad"
    />
    <ModelNumber
      v-if="showModelNumberInput"
      :currentSquad="currentSquad"
      :currentFaction="currentFaction"
      @setModelNumber="setCurrentModelNumber"
    />
    <component
      v-if="currentSquad"
      :is="currentSquad.squadValue"
      :currentSquad="currentSquad"
      :currentModelNumber="currentModelNumber"
    ></component>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { factions } from "../../db/_factions.js";

import Faction from "./Faction.vue";
import Squad from "./Squad.vue";
import ModelNumber from "./ModelNumber.vue";

import squads from "./squads/_index";

export default {
  components: {
    Faction,
    Squad,
    ModelNumber,
    ...squads,
  },
  setup() {
    let reset = ref(false);
    let error = ref("");

    let showSquadSelect = ref(false);
    let showModelNumberInput = ref(false);

    let currentFaction = ref(null);
    let currentSquad = ref(null);
    let currentModelNumber = ref(0);

    const setCurrentFaction = (factionSelect) => {
      if (factionSelect !== "") {
        // showSquadSelect.value = false;
        factions.forEach((faction) => {
          if (factionSelect === faction.name) {
            currentFaction.value = faction;
          }
        });
        showSquadSelect.value = true;
      } else {
        currentFaction.value = {};
      }
    };

    const setCurrentSquad = (squadSelect) => {
      currentFaction.value.squads.forEach((squad) => {
        if (squadSelect === squad.squadName) {
          currentSquad.value = squad;
        }
      });
      showModelNumberInput.value = true;
      // --- console.log currentSquad.value for test purposes ---
      // console.log(currentSquad.value);
    };

    const setCurrentModelNumber = (modelNumberInput) => {
      currentModelNumber.value = modelNumberInput;
    };

    return {
      reset,
      error,
      setCurrentFaction,
      currentFaction,
      showSquadSelect,
      setCurrentSquad,
      currentSquad,
      showModelNumberInput,
      setCurrentModelNumber,
      currentModelNumber,
    };
  },
};
</script>

<style></style>
