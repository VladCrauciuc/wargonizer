<template>
  <form @submit.prevent>
    <!-- faction comes from here -->
    <Faction @setArmy="setCurrentArmy" :reset="reset" />
    <!-- squad comes from here -->
    <Squad
      v-if="showSquadSelect"
      :currentArmy="currentArmy"
      @setSquad="setCurrentSquad"
    />
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

    let currentArmy = ref(null);
    let currentSquad = ref(null);

    // let totalSelectedArmy = computed(() => ({
    //   showAdditionalOptions: ref(false),
    //   name: ref(currentArmy.value.name),
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

    const setCurrentArmy = (factionSelect) => {
      if (factionSelect !== "") {
        // showSquadSelect.value = false;
        factions.forEach((army) => {
          if (factionSelect === army.name) {
            currentArmy.value = army;
          }
        });
        showSquadSelect.value = true;
      } else {
        currentArmy.value = {};
      }
    };

    const setCurrentSquad = (squadSelect) => {
      currentArmy.value.squads.forEach((squad) => {
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
      setCurrentArmy,
      currentArmy,
      showSquadSelect,
      setCurrentSquad,
      currentSquad,
    };
  },
};
</script>

<style></style>
