<template>
  <form class="pt-3" @submit.prevent>
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
    <!-- squad and number select -->
    <div v-if="showSquadSelectAndNumber" class="form-group mb-3">
      <!-- squad -->
      <div class="form-floating mb-3">
        <select
          @change="setCurrentSquad"
          class="form-select border-0"
          id="squad-select"
          v-model="squadSelect"
        >
          <option value="" hidden>Select a squad</option>
          <option v-for="squad in currentArmy.squads" :key="squad.name">
            {{ squad.name }}
          </option>
        </select>
        <label for="squad-select">Squad</label>
      </div>
      <!-- number -->
      <div class="form-floating">
        <input
          v-model="modelNumberInput"
          @change="correctNumber"
          type="number"
          :min="minModelNumber"
          :max="maxModelNumber"
          class="form-control border-0"
          id="model-number-input"
          placeholder="Model Number"
        />
        <label for="model-number-input">
          <span class="fw-bold">Total</span> no. of models
        </label>
      </div>
    </div>
    <!-- squad leader and loadout -->
    <div v-if="showHasLeaderCheck" class="form-group">
      <!-- Squad Leader Switch -->
      <div class="form-check form-switch mb-3">
        <input
          v-model="showLeaderWeapons"
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="has-leader-switch"
        />
        <label class="form-check-label text-light" for="has-leader-switch"
          >Has Squad Leader</label
        >
      </div>
      <!-- Squad Leader Weapons Row -->
      <div v-if="showLeaderWeapons" class="row g-3 mb-3">
        <div class="col-6">
          <div class="form-floating">
            <select class="form-select border-0" id="leader-weapon1">
              <option class="leader-weapon1" value="" selected hidden>
                Select your Squad Leader First Weapon
              </option>
              <option
                v-for="weapon in currentSquad.leader.leaderWeapon1"
                :key="weapon"
              >
                {{ weapon }}
              </option>
            </select>
            <label for="leader-weapon1">Squad Leader First Weapon</label>
          </div>
        </div>
        <div class="col-6">
          <div class="form-floating">
            <select class="form-select border-0" id="leader-weapon2">
              <option class="leader-ranged-option" value="" selected hidden>
                Select your Squad Leader Second Weapon
              </option>
              <option
                v-for="weapon in currentSquad.leader.leaderWeapon2"
                :key="weapon"
              >
                {{ weapon }}
              </option>
            </select>
            <label for="leader-weapon2">Squad Leader Second Weapon</label>
          </div>
        </div>
      </div>
    </div>
    <!-- special weapon -->
    <div class="form-group">
      <!-- Special Weapon Switch -->
      <div v-if="showHasSpecialWeaponCheck" class="form-check form-switch mb-3">
        <input
          v-model="showSpecialWeapons"
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="has-special-weapon-switch"
        />
        <label
          class="form-check-label text-light"
          for="has-special-weapon-switch"
          >Has Special Weapon</label
        >
      </div>
      <!-- Special Weapon -->
      <div v-if="showSpecialWeapons" class="form-floating">
        <select class="form-select mb-3" id="special-weapon-select">
          <option class="special-weapon-option" value="" selected hidden>
            Select your Special Weapon
          </option>
          <option v-for="weapon in currentSquad.specialWeapons" :key="weapon">
            {{ weapon }}
          </option>
        </select>
        <label for="special-weapon-select">Special Weapon</label>
      </div>
    </div>
    <!-- heavy weapon -->
    <div class="form-group">
      <!-- heavy Weapon Switch -->
      <div v-if="showHasHeavyWeaponCheck" class="form-check form-switch mb-3">
        <input
          v-model="showHeavyWeapons"
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="has-heavy-weapon-switch"
        />
        <label class="form-check-label text-light" for="has-heavy-weapon-switch"
          >Has Heavy Weapon</label
        >
      </div>
      <!-- heavy Weapon -->
      <div v-if="showHeavyWeapons" class="form-floating">
        <select class="form-select mb-3" id="heavy-weapon-select">
          <option class="heavy-weapon-option" value="" selected hidden>
            Select your Heavy Weapon
          </option>
          <option v-for="weapon in currentSquad.heavyWeapons" :key="weapon">
            {{ weapon }}
          </option>
        </select>
        <label for="heavy-weapon-select">Heavy Weapon</label>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { armies } from "../../db/_armies.js";

export default {
  setup() {
    let showSquadSelectAndNumber = ref(false);
    let showHasLeaderCheck = ref(false);
    let showLeaderWeapons = ref(false);
    let showHasSpecialWeaponCheck = ref(false);
    let showSpecialWeapons = ref(false);
    let showHasHeavyWeaponCheck = ref(false);
    let showHeavyWeapons = ref(false);

    let factionSelect = ref("");
    let currentArmy = ref(null);
    let squadSelect = ref("");
    let currentSquad = ref(null);
    let modelNumberInput = ref("");
    let minModelNumber = ref("");
    let maxModelNumber = ref("");

    const setCurrentArmy = () => {
      armies.forEach((army) => {
        if (factionSelect.value === army.name) {
          currentArmy.value = army;
        }
      });
      squadSelect.value = "";
      currentSquad.value = null;
      showSquadSelectAndNumber.value = false;
      modelNumberInput.value = "";
      showHasLeaderCheck.value = false;
      showSquadSelectAndNumber.value = true;
      showHasSpecialWeaponCheck.value = false;
      showSpecialWeapons.value = false;
      showHasHeavyWeaponCheck.value = false;
      showHeavyWeapons.value = false;
    };

    const setCurrentSquad = () => {
      currentArmy.value.squads.forEach((squad) => {
        if (squadSelect.value === squad.name) {
          currentSquad.value = squad;
        }
      });

      minModelNumber.value = currentSquad.value.min;
      maxModelNumber.value = currentSquad.value.max;
      modelNumberInput.value = "";
      showHasLeaderCheck.value = false;
      showLeaderWeapons.value = false;
      showSpecialWeapons.value = false;
      showHeavyWeapons.value = false;

      if (currentSquad.value.hasLeader) {
        showHasLeaderCheck.value = true;
      } else {
        showHasLeaderCheck.value = false;
      }
      if (currentSquad.value.specialWeapons) {
        showHasSpecialWeaponCheck.value = true;
      } else {
        showHasSpecialWeaponCheck.value = false;
      }
      if (currentSquad.value.heavyWeapons) {
        showHasHeavyWeaponCheck.value = true;
      } else {
        showHasHeavyWeaponCheck.value = false;
      }
    };

    const correctNumber = (e) => {
      if (modelNumberInput.value < minModelNumber.value) {
        modelNumberInput.value = minModelNumber.value;
      }
      if (modelNumberInput.value > maxModelNumber.value) {
        modelNumberInput.value = maxModelNumber.value;
      }
      e.target.blur();
    };

    return {
      armies,
      factionSelect,
      setCurrentArmy,
      currentArmy,
      squadSelect,
      setCurrentSquad,
      currentSquad,
      modelNumberInput,
      minModelNumber,
      maxModelNumber,
      correctNumber,
      showHasLeaderCheck,
      showLeaderWeapons,
      showHasSpecialWeaponCheck,
      showSpecialWeapons,
      showHasHeavyWeaponCheck,
      showHeavyWeapons,
      showSquadSelectAndNumber,
    };
  },
};
</script>

<style></style>
