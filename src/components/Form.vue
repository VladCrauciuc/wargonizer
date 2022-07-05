<template>
  <form @submit.prevent>
    <Faction @setArmy="setCurrentArmy" :reset="!reset" />

    <Squad
      v-if="showSquadSelect"
      :currentArmy="currentArmy"
      @setSquad="setCurrentSquad"
    />
    <ModelNumber
      v-if="showModelNumberInput"
      :currentSquad="currentSquad"
      :currentArmy="currentArmy"
      @setModelNumber="setCurrentModelNumber"
    />
    <p class="text-danger">{{ error }}</p>
    <OptionalSquadEquipment
      :currentSquad="currentSquad"
      v-if="showOptionalSquadEquipment"
      @setOptionalSquadEquipment="setCurrentOptionalSquadEquipment"
    />

    <div class="d-flex justify-content-center">
      <button @click="displayValues()" class="w-25 btn btn-primary">
        Display
      </button>
    </div>
    <div class="row">
      <div
        class="col-12 mt-3 pt-3 border-top border-bottom border-light"
        v-for="army in armyArr"
        :key="army.name"
      >
        <p class="fst-italic">
          <span class="fw-bold">Army:</span> {{ army.name }}
        </p>
        <p class="fst-italic">
          <span class="fw-bold">Squad:</span> {{ army.squadName }}
        </p>
        <p class="fst-italic">
          <span class="fw-bold">Number of models:</span>
          {{ army.number }} models
        </p>
        <p v-if="army.optSquadEquip" class="fst-italic">
          <span class="fw-bold">Optional Squad Equipment:</span>
          {{ army.optSquadEquip }}
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { armies } from "../../db/_armies.js";

import Faction from "./Faction.vue";
import Squad from "./Squad.vue";
import ModelNumber from "./ModelNumber.vue";
import OptionalSquadEquipment from "./OptionalSquadEquipment.vue";

export default {
  components: {
    Faction,
    Squad,
    ModelNumber,
    OptionalSquadEquipment,
  },
  setup() {
    let reset = ref(false);
    let error = ref("");

    let showSquadSelect = ref(false);
    let showModelNumberInput = ref(false);
    let showOptionalSquadEquipment = ref(false);

    let currentArmy = ref(null);
    let currentSquad = ref(null);
    let currentModelNumber = ref("");
    let currentOptionalSquadEquipment = ref("");

    let selectedArmy = ref("");
    let selectedSquad = ref("");
    let selectedModelNumber = ref("");
    let selectedOptionalSquadEquipment = ref("");

    let totalSelectedArmy = ref({
      name: "",
      squadName: "",
      number: "",
      optSquadEquip: "",
    });
    let armyArr = ref([]);

    const setCurrentArmy = (factionSelect) => {
      if (factionSelect !== "") {
        showSquadSelect.value = false;
        armies.forEach((army) => {
          if (factionSelect === army.name) {
            currentArmy.value = army;
          }
        });
        showSquadSelect.value = true;
        showOptionalSquadEquipment.value = false;
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
      // console.log(currentSquad.value.name);
      showModelNumberInput.value = true;
      showOptionalSquadEquipment.value =
        !currentSquad.value.optionalSquadEquipment.length == 0 ? true : false;
    };

    const setCurrentModelNumber = (modelNumberInput) => {
      currentModelNumber.value = modelNumberInput;
    };

    const setCurrentOptionalSquadEquipment = (optionalSquadEquipmentSelect) => {
      currentSquad.value.optionalSquadEquipment.forEach((equipment) => {
        if (optionalSquadEquipmentSelect === equipment) {
          currentOptionalSquadEquipment.value = equipment;
        }
      });
    };

    const displayValues = () => {
      if (!currentSquad.value) {
        error.value = "Please select a squad";
        setTimeout(() => {
          error.value = "";
        }, 1500);
      } else if (!currentModelNumber.value) {
        error.value = "Please input a number of models in squad";
        setTimeout(() => {
          error.value = "";
        }, 1500);
      }

      if (
        currentArmy.value &&
        currentSquad.value &&
        currentModelNumber.value !== ""
      ) {
        reset.value = !reset.value;
        error.value = "";

        selectedArmy.value = currentArmy.value.name;
        selectedSquad.value = currentSquad.value.name;
        selectedModelNumber.value = currentModelNumber.value;
        selectedOptionalSquadEquipment.value =
          currentOptionalSquadEquipment.value;

        console.log(selectedArmy.value);
        console.log(selectedSquad.value);
        console.log(selectedModelNumber.value);
        console.log(selectedOptionalSquadEquipment.value);
        // reset form
        currentArmy.value = null;
        currentSquad.value = null;
        currentModelNumber.value = "";
        currentOptionalSquadEquipment.value = "";
        showSquadSelect.value = false;
        showModelNumberInput.value = false;
        showOptionalSquadEquipment.value = false;
      } else {
        return;
      }
      totalSelectedArmy.value.name = selectedArmy.value;
      totalSelectedArmy.value.squadName = selectedSquad.value;
      totalSelectedArmy.value.number = selectedModelNumber.value;
      totalSelectedArmy.value.optSquadEquip =
        selectedOptionalSquadEquipment.value;
      armyArr.value.push(totalSelectedArmy.value);
      totalSelectedArmy.value = {
        name: "",
        squadName: "",
        number: "",
        optSquadEquip: "",
      };
      // reset selected values
      selectedArmy.value = "";
      selectedSquad.value = "";
      selectedModelNumber.value = "";
      selectedOptionalSquadEquipment.value = "";
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
      displayValues,
      selectedArmy,
      selectedSquad,
      selectedModelNumber,
      armyArr,
      totalSelectedArmy,
    };
  },
};
</script>

<style></style>
