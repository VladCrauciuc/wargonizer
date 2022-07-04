<template>
  <form @submit.prevent>
    <FactionSelect @setArmy="setCurrentArmy" :reset="reset" />

    <SquadSelect
      v-if="showSquadSelect"
      :currentArmy="currentArmy"
      :reset="reset"
      @setSquad="setCurrentSquad"
    />
    <ModelNumberInput
      v-if="showModelNumberInput"
      :currentSquad="currentSquad"
      :currentArmy="currentArmy"
      @setModelNumber="setCurrentModelNumber"
    />
    <OptionalSquadEquipment v-if="showOptionalSquadEquipment" />

    <div class="d-flex justify-content-center">
      <button
        @click="
          displayValues();
          reset = !reset;
        "
        class="w-25 btn btn-primary"
      >
        Display
      </button>
    </div>
    <div class="row">
      <div
        class="col-12 mt-3 pt-3 border-top border-bottom border-light"
        v-for="army in armyArr"
        :key="army.name"
      >
        <p>Army: {{ army.name }}</p>
        <p>Squad: {{ army.squadName }}</p>
        <p>Number of models: {{ army.number }} models</p>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { armies } from "../../db/_armies.js";

import FactionSelect from "./FactionSelect.vue";
import SquadSelect from "./SquadSelect.vue";
import ModelNumberInput from "./ModelNumberInput.vue";
import OptionalSquadEquipment from "./OptionalSquadEquipment.vue";

export default {
  components: {
    FactionSelect,
    SquadSelect,
    ModelNumberInput,
    OptionalSquadEquipment,
  },
  setup() {
    let reset = ref(false);

    let showSquadSelect = ref(false);
    let showModelNumberInput = ref(false);
    let showOptionalSquadEquipment = ref(false);

    let currentArmy = ref(null);
    let currentSquad = ref(null);
    let currentModelNumber = ref("");

    let selectedArmy = ref("");
    let selectedSquad = ref("");
    let selectedModelNumber = ref("");

    let totalSelectedArmy = ref({
      name: "",
      squadName: "",
      number: "",
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
      if (currentSquad.value.optionalSquadEquipment) {
        showOptionalSquadEquipment.value = true;
      }
    };

    const setCurrentModelNumber = (modelNumberInput) => {
      currentModelNumber.value = modelNumberInput;
      // console.log(currentModelNumber.value);
    };

    const displayValues = () => {
      if (
        currentArmy.value.name &&
        currentSquad.value.name &&
        currentModelNumber.value
      ) {
        selectedArmy.value = currentArmy.value.name;
        selectedSquad.value = currentSquad.value.name;
        selectedModelNumber.value = currentModelNumber.value;

        console.log(selectedArmy.value);
        console.log(selectedSquad.value);
        console.log(selectedModelNumber.value);
        // reset form
        currentArmy.value = {};
        currentSquad.value = {};
        showSquadSelect.value = false;
        showModelNumberInput.value = false;
        showOptionalSquadEquipment.value = false;
      }
      totalSelectedArmy.value.name = selectedArmy.value;
      totalSelectedArmy.value.squadName = selectedSquad.value;
      totalSelectedArmy.value.number = selectedModelNumber.value;
      armyArr.value.push(totalSelectedArmy.value);
      totalSelectedArmy.value = {
        name: "",
        squadName: "",
        number: "",
      };
    };

    return {
      reset,
      setCurrentArmy,
      currentArmy,
      showSquadSelect,
      setCurrentSquad,
      currentSquad,
      showModelNumberInput,
      setCurrentModelNumber,
      currentModelNumber,
      showOptionalSquadEquipment,
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
