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
    <!-- total model number comes from here -->
    <ModelNumber
      v-if="showModelNumberInput"
      :currentSquad="currentSquad"
      :currentArmy="currentArmy"
      @setModelNumber="setCurrentModelNumber"
    />
    <p class="text-danger">{{ error }}</p>
    <!-- required fields above -->
    <!-- optional squad equipment comes from here -->
    <OptionalSquadEquipment
      :currentSquad="currentSquad"
      v-if="showOptionalSquadEquipment"
      @setOptionalSquadEquipment="setCurrentOptionalSquadEquipment"
    />
    <!-- special weapon comes from here -->
    <SpecialWeapon
      :currentSquad="currentSquad"
      :currentModelNumber="currentModelNumber"
      :currentHeavyWeapon="currentHeavyWeapon"
      v-if="showSpecialWeapon"
      @setSpecialWeapon="setCurrentSpecialWeapon"
    />
    <!-- heavy weapon comes from here -->
    <HeavyWeapon
      :currentSquad="currentSquad"
      :currentModelNumber="currentModelNumber"
      :currentSpecialWeapon="currentSpecialWeapon"
      v-if="showHeavyWeapon"
      @setHeavyWeapon="setCurrentHeavyWeapon"
    />
    <!-- leader comes from here -->
    <Leader
      v-if="showLeader"
      :currentSquad="currentSquad"
      @setLeader="setCurrentLeader"
    />

    <div class="d-flex justify-content-center">
      <button @click="displayValues()" class="w-25 btn btn-primary">
        Display
      </button>
    </div>
  </form>
  <!-- temp container for saved armies -->
  <div
    @click="showAdditionalOptions = !showAdditionalOptions"
    class="row mx-0 mt-3"
    v-for="army in armyArr"
    :key="army.name"
  >
    <!-- army name, squad name, model number name div -->
    <div class="col-12 py-3 bg-secondary rounded">
      <p class="mx-3 my-0">
        <span class="me-3 fst-italic h4">{{ army.name }}</span>
        <span>{{ army.squadName }} ({{ army.number }} models)</span>
      </p>
    </div>
    <!-- additional options div -->
    <div
      v-if="showAdditionalOptions === true"
      class="col-12 py-3 border border-2 border-secondary"
    >
      <div class="row">
        <div class="col-12 col-lg-6">
          <p
            v-if="army.optSquadEquip"
            class="ms-2 pe-2 my-0 border-end border-2 border-secondary"
          >
            <span class="text-info">Optional Squad Equipment: </span>
            <span>{{ army.optSquadEquip }}</span>
          </p>
          <p
            v-if="army.specialWeapon"
            class="ms-2 pe-2 my-0 border-end border-2 border-secondary"
          >
            <span class="text-info">Special Weapon: </span>
            <span>{{ army.specialWeapon }}</span>
          </p>
          <p
            v-if="army.heavyWeapon"
            class="ms-2 pe-2 my-0 border-end border-2 border-secondary"
          >
            <span class="text-info">Heavy Weapon: </span>
            <span>{{ army.heavyWeapon }}</span>
          </p>
        </div>
        <div class="col-12 col-lg-6">
          <p
            v-if="army.leaderWeapon1"
            class="ms-2 pe-2 my-0 border-end border-2 border-secondary"
          >
            <span class="text-info">Leader Weapon 1: </span>
            <span>{{ army.leaderWeapon1 }}</span>
          </p>
          <p
            v-if="army.leaderWeapon2"
            class="ms-2 pe-2 my-0 border-end border-2 border-secondary"
          >
            <span class="text-info">Leader Weapon 2: </span>
            <span>{{ army.leaderWeapon2 }}</span>
          </p>
          <p
            v-if="army.leaderOptional"
            class="ms-2 pe-2 my-0 border-end border-2 border-secondary"
          >
            <span class="text-info">Leader Optional Weapon: </span>
            <span>{{ army.leaderOptional }}</span>
          </p>
        </div>
      </div>
    </div>
    <div>
      <!-- <p>No additional options and loadouts</p> -->
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { armies } from "../../db/_armies.js";

import Faction from "./Faction.vue";
import Squad from "./Squad.vue";
import ModelNumber from "./ModelNumber.vue";
import OptionalSquadEquipment from "./OptionalSquadEquipment.vue";
import SpecialWeapon from "./SpecialWeapon.vue";
import HeavyWeapon from "./HeavyWeapon.vue";
import Leader from "./Leader.vue";
import { computed } from "@vue/runtime-core";

export default {
  components: {
    Faction,
    Squad,
    ModelNumber,
    OptionalSquadEquipment,
    SpecialWeapon,
    HeavyWeapon,
    Leader,
  },
  setup() {
    let reset = ref(false);
    let error = ref("");

    let showSquadSelect = ref(false);
    let showModelNumberInput = ref(false);
    let showOptionalSquadEquipment = ref(false);
    let showSpecialWeapon = ref(false);
    let showHeavyWeapon = ref(false);
    let showLeader = ref(false);
    let currentHasLeader = ref(false);
    let showAdditionalOptions = ref(false);

    let currentArmy = ref(null);
    let currentSquad = ref(null);
    let currentModelNumber = ref(0);
    let currentOptionalSquadEquipment = ref("");
    let currentSpecialWeapon = ref("");
    let currentHeavyWeapon = ref("");
    let currentLeaderWeapon1 = ref("");
    let currentLeaderWeapon2 = ref("");
    let currentLeaderOptional = ref("");

    let totalSelectedArmy = computed(() => ({
      name: ref(currentArmy.value.name),
      squadName: ref(currentSquad.value.name),
      number: ref(currentModelNumber.value),
      optSquadEquip: ref(currentOptionalSquadEquipment.value),
      specialWeapon: ref(currentSpecialWeapon.value),
      heavyWeapon: ref(currentHeavyWeapon.value),
      leaderName: ref(currentSquad.value.leader.name),
      leaderWeapon1: ref(currentLeaderWeapon1.value),
      leaderWeapon2: ref(currentLeaderWeapon2.value),
      leaderOptional: ref(currentLeaderOptional.value),
    }));
    // let totalSelectedArmy = ref({});
    let armyArr = ref([]);

    const setCurrentArmy = (factionSelect) => {
      if (factionSelect !== "") {
        // showSquadSelect.value = false;
        armies.forEach((army) => {
          if (factionSelect === army.name) {
            currentArmy.value = army;
          }
        });
        showSquadSelect.value = true;
        showModelNumberInput.value = false;
        showOptionalSquadEquipment.value = false;
        showSpecialWeapon.value = false;
        showHeavyWeapon.value = false;
        showLeader.value = false;
        currentSquad.value = {};
      } else {
        currentArmy.value = {};
      }
    };

    const setCurrentSquad = (squadSelect) => {
      currentArmy.value.squads.forEach((squad) => {
        if (squadSelect === squad.name) {
          currentSquad.value = squad;
        }
      });
      // --- console.log currentSquad.value for test purposes
      // console.log(currentSquad.value.leader.name);
      showModelNumberInput.value = true;
      showOptionalSquadEquipment.value =
        !currentSquad.value.optionalSquadEquipment.length == 0 ? true : false;
      showSpecialWeapon.value =
        !currentSquad.value.specialWeapons.length == 0 ? true : false;
      showHeavyWeapon.value =
        !currentSquad.value.heavyWeapons.length == 0 ? true : false;
      showLeader.value = currentSquad.value.hasLeader ? true : false;
    };

    const setCurrentModelNumber = (modelNumberInput) => {
      currentModelNumber.value = modelNumberInput;
    };

    const setCurrentOptionalSquadEquipment = (optionalSquadEquipmentSelect) => {
      if (optionalSquadEquipmentSelect !== "") {
        currentSquad.value.optionalSquadEquipment.forEach((equipment) => {
          if (optionalSquadEquipmentSelect === equipment) {
            currentOptionalSquadEquipment.value = equipment;
          }
        });
      } else {
        currentOptionalSquadEquipment.value = "";
      }
    };

    const setCurrentSpecialWeapon = (specialWeaponSelect) => {
      if (specialWeaponSelect !== "") {
        currentSquad.value.specialWeapons.forEach((special) => {
          if (specialWeaponSelect === special) {
            currentSpecialWeapon.value = special;
          }
        });
      } else {
        currentSpecialWeapon.value = "";
      }
    };

    const setCurrentHeavyWeapon = (heavyWeaponSelect) => {
      if (heavyWeaponSelect !== "") {
        currentSquad.value.heavyWeapons.forEach((heavy) => {
          if (heavyWeaponSelect === heavy) {
            currentHeavyWeapon.value = heavy;
          }
        });
      } else {
        currentHeavyWeapon.value = "";
      }
    };

    const setCurrentLeader = (leader) => {
      if (leader.hasLeader) {
        currentHasLeader.value = leader.hasLeader;
      } else {
        currentHasLeader.value = false;
      }
      if (leader.leaderWeapon1Select !== "") {
        currentSquad.value.leader.leaderWeapon1.forEach((weapon) => {
          if (leader.leaderWeapon1Select === weapon) {
            currentLeaderWeapon1.value = weapon;
          }
        });
      } else {
        currentLeaderWeapon1.value = "";
      }
      if (leader.leaderWeapon2Select !== "") {
        currentSquad.value.leader.leaderWeapon2.forEach((weapon) => {
          if (leader.leaderWeapon2Select === weapon) {
            currentLeaderWeapon2.value = weapon;
          }
        });
      } else {
        currentLeaderWeapon2.value = "";
      }
      if (leader.leaderOptionalSelect !== "") {
        currentSquad.value.leader.leaderOptionalEquipment.forEach((weapon) => {
          if (leader.leaderOptionalSelect === weapon) {
            currentLeaderOptional.value = weapon;
          }
        });
      } else {
        currentLeaderOptional.value = "";
      }
    };

    const displayValues = () => {
      if (
        !currentArmy.value === {} ||
        !currentSquad.value ||
        !currentModelNumber.value
      ) {
        error.value = "Please select a faction, squad, and number of models";
        setTimeout(() => {
          error.value = "";
        }, 2000);
        return;
      } else if (
        currentArmy.value &&
        currentSquad.value &&
        currentModelNumber.value
      ) {
        reset.value = !reset.value;
        error.value = "";

        // --- console.log values for test purposes ---
        // console.log(currentArmy.value.name);
        // console.log(currentSquad.value.name);
        // console.log(currentModelNumber.value);
        // console.log(currentOptionalSquadEquipment.value);
        // console.log(currentSpecialWeapon.value);
        // console.log(currentHeavyWeapon.value);
        // console.log(currentHasLeader.value);
        // console.log(currentLeaderWeapon1.value);
        // console.log(currentLeaderWeapon2.value);
        // console.log(currentLeaderOptional.value);

        armyArr.value.push(totalSelectedArmy.value);

        showSquadSelect.value = false;
        showModelNumberInput.value = false;
        showOptionalSquadEquipment.value = false;
        showSpecialWeapon.value = false;
        showHeavyWeapon.value = false;
        showLeader.value = false;
      }
      // reset current values
      currentArmy.value = {};
      currentSquad.value = {};
      currentModelNumber.value = 0;
      currentOptionalSquadEquipment.value = "";
      currentSpecialWeapon.value = "";
      currentHeavyWeapon.value = "";
      currentHasLeader.value = false;
      currentLeaderWeapon1.value = "";
      currentLeaderWeapon1.value = "";
      currentLeaderOptional.value = "";
    };

    return {
      showAdditionalOptions,
      reset,
      error,
      setCurrentArmy,
      currentArmy,
      showSquadSelect,
      setCurrentSquad,
      currentSquad,
      showModelNumberInput,
      setCurrentModelNumber,
      currentModelNumber,
      showOptionalSquadEquipment,
      setCurrentOptionalSquadEquipment,
      currentOptionalSquadEquipment,
      showSpecialWeapon,
      setCurrentSpecialWeapon,
      currentSpecialWeapon,
      showHeavyWeapon,
      setCurrentHeavyWeapon,
      currentHeavyWeapon,
      showLeader,
      currentHasLeader,
      setCurrentLeader,
      currentLeaderWeapon1,
      currentLeaderWeapon2,
      currentLeaderOptional,
      totalSelectedArmy,
      armyArr,
      displayValues,
    };
  },
};
</script>

<style></style>
