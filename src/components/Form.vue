<template>
  <form @submit.prevent>
    <!-- faction comes from here -->
    <Faction @setArmy="setCurrentArmy" :reset="!reset" />
    <!-- squad comes from here -->
    <Squad
      v-if="showSquadSelect"
      :currentArmy="currentArmy"
      @setSquad="setCurrentSquad"
    />
    <!-- total number comes from here -->
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
      v-if="showSpecialWeapon"
      @setSpecialWeapon="setCurrentSpecialWeapon"
    />
    <!-- heavy weapon comes from here -->
    <HeavyWeapon
      :currentSquad="currentSquad"
      v-if="showHeavyWeapon"
      @setHeavyWeapon="setCurrentHeavyWeapon"
    />

    <!-- temp container for saved armies -->
    <div class="d-flex justify-content-center">
      <button @click="displayValues()" class="w-25 btn btn-primary">
        Display
      </button>
    </div>
  </form>
  <div class="row mx-0">
    <div
      class="col-12 mt-3 pt-3 bg-secondary text-light rounded"
      v-for="army in armyArr"
      :key="army.name"
    >
      <p class="fst-italic h4">
        <span class="fw-bold">Army:</span> {{ army.name }}
      </p>
      <p class="fst-italic mb-0">
        <span class="fw-bold">Squad:</span> {{ army.squadName }}
      </p>
      <p
        class="fst-italic"
        :class="{
          'mb-0': army.optSquadEquip || army.specialWeapon || army.heavyWeapon,
        }"
      >
        <span class="fw-bold">Number of models:</span>
        {{ army.number }} models
      </p>
      <p
        v-if="army.optSquadEquip"
        class="fst-italic"
        :class="{ 'mb-0': army.specialWeapon }"
      >
        <span class="fw-bold">Optional Squad Equipment:</span>
        {{ army.optSquadEquip }}
      </p>
      <p
        v-if="army.specialWeapon"
        class="fst-italic"
        :class="{ 'mb-0': army.heavyWeapon }"
      >
        <span class="fw-bold">Special Weapon:</span>
        {{ army.specialWeapon }}
      </p>
      <p v-if="army.heavyWeapon" class="fst-italic">
        <span class="fw-bold">Heavy Weapon:</span>
        {{ army.heavyWeapon }}
      </p>
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

export default {
  components: {
    Faction,
    Squad,
    ModelNumber,
    OptionalSquadEquipment,
    SpecialWeapon,
    HeavyWeapon,
  },
  setup() {
    let reset = ref(false);
    let error = ref("");

    let showSquadSelect = ref(false);
    let showModelNumberInput = ref(false);
    let showOptionalSquadEquipment = ref(false);
    let showSpecialWeapon = ref(false);
    let showHeavyWeapon = ref(false);

    let currentArmy = ref(null);
    let currentSquad = ref(null);
    let currentModelNumber = ref("");
    let currentOptionalSquadEquipment = ref("");
    let currentSpecialWeapon = ref("");
    let currentHeavyWeapon = ref("");

    let selectedArmy = ref("");
    let selectedSquad = ref("");
    let selectedModelNumber = ref("");
    let selectedOptionalSquadEquipment = ref("");
    let selectedSpecialWeapon = ref("");
    let selectedHeavyWeapon = ref("");

    let totalSelectedArmy = ref({
      name: "",
      squadName: "",
      number: "",
      optSquadEquip: "",
      specialWeapon: "",
      heavyWeapon: "",
    });
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
        showOptionalSquadEquipment.value = false;
        showSpecialWeapon.value = false;
        showHeavyWeapon.value = false;
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
      // console.log(currentSquad.value.specialWeapons.length);
      showModelNumberInput.value = true;
      showOptionalSquadEquipment.value =
        !currentSquad.value.optionalSquadEquipment.length == 0 ? true : false;
      showSpecialWeapon.value =
        !currentSquad.value.specialWeapons.length == 0 ? true : false;
      showHeavyWeapon.value =
        !currentSquad.value.heavyWeapons.length == 0 ? true : false;
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
        currentModelNumber.value !== ""
      ) {
        reset.value = !reset.value;
        error.value = "";

        totalSelectedArmy.value.name = currentArmy.value.name;
        totalSelectedArmy.value.squadName = currentSquad.value.name;
        totalSelectedArmy.value.number = currentModelNumber.value;
        totalSelectedArmy.value.optSquadEquip =
          currentOptionalSquadEquipment.value;
        totalSelectedArmy.value.specialWeapon = currentSpecialWeapon.value;
        totalSelectedArmy.value.heavyWeapon = currentHeavyWeapon.value;
        armyArr.value.push(totalSelectedArmy.value);
        totalSelectedArmy.value = {
          name: "",
          squadName: "",
          number: "",
          optSquadEquip: "",
          specialWeapon: "",
          heavyWeapon: "",
        };
        showSquadSelect.value = false;
        showModelNumberInput.value = false;
        showOptionalSquadEquipment.value = false;
        showSpecialWeapon.value = false;
        showHeavyWeapon.value = false;
      }
      // reset current values
      currentArmy.value = {};
      currentSquad.value = {};
      currentModelNumber.value = "";
      currentOptionalSquadEquipment.value = "";
      currentSpecialWeapon.value = "";
      currentHeavyWeapon.value = "";
    };

    return {
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
      selectedArmy,
      selectedSquad,
      selectedModelNumber,
      selectedOptionalSquadEquipment,
      selectedSpecialWeapon,
      selectedHeavyWeapon,
      armyArr,
      totalSelectedArmy,
      displayValues,
    };
  },
};
</script>

<style></style>
