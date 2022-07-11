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
    <component
      :currentSquad="currentSquad"
      v-if="currentSquad"
      :is="currentSquad.squadValue"
    ></component>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { factions } from "../../db/_factions.js";

import Faction from "./Faction.vue";
import Squad from "./Squad.vue";

import TacticalSquad from "../components/squads/TacticalSquad.vue";
import AssaultSquad from "../components/squads/AssaultSquad.vue";

export default {
  components: {
    Faction,
    Squad,
    TacticalSquad,
    AssaultSquad,
  },
  setup() {
    let reset = ref(false);
    let error = ref("");

    let showSquadSelect = ref(false);

    let currentFaction = ref(null);
    let currentSquad = ref(null);

    // let totalSelectedArmy = computed(() => ({
    //   showAdditionalOptions: ref(false),
    //   name: ref(currentFaction.value.name),
    //   squadName: ref(currentSquad.value.name),
    //   number: ref(currentModelNumber.value),
    //   optSquadEquip: ref(currentOptionalSquadEquipment.value),
    //   specialWeapon: ref(currentSpecialWeapon.value),
    //   heavyWeapon: ref(currentHeavyWeapon.value),
    //   leaderName: ref(currentLeader.value),
    //   leaderWeapon1: ref(currentLeaderWeapon1.value),
    //   leaderWeapon2: ref(currentLeaderWeapon2.value),
    //   leaderOptional: ref(currentLeaderOptional.value),
    // }));

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
      // --- console.log currentSquad.value for test purposes
      console.log(currentSquad.value);
    };

    return {
      reset,
      error,
      setCurrentFaction,
      currentFaction,
      showSquadSelect,
      setCurrentSquad,
      currentSquad,
    };
  },
};
</script>

<style></style>
