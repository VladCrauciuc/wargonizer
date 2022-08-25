<template>
  <div class="form-group mb-3">
    <!-- specialWeapon Switch -->
    <div class="form-check form-switch mb-3">
      <input
        class="form-check-input"
        type="checkbox"
        :disabled="dontAllowSpecialWeapon"
        role="switch"
        id="has-special-weapon-switch"
        v-model="hasSpecialWeapon"
        @change="
          setSquadOptions();
          dontAllowHeavyWeapon = null;
          specialWeaponSelect = '';
        "
      />
      <label class="form-check-label text-light" for="has-special-weapon-switch"
        >Special Weapon</label
      >
    </div>
    <!-- Special Weapon -->
    <div v-if="hasSpecialWeapon" class="form-floating mb-3">
      <select
        class="form-select border-0"
        id="special-weapon-select"
        v-model="specialWeaponSelect"
        @change="
          checkSpecialAndHeavy();
          setSquadOptions();
        "
      >
        <option value="" hidden>Select Special Weapon</option>
        <option v-for="weapon in currentSquad.specialWeapons" :key="weapon">
          {{ weapon }}
        </option>
      </select>
      <label for="special-weapon-select">Special Weapon</label>
    </div>
    <!-- hasHeavyWeapon Switch -->
    <div class="form-check form-switch mb-3">
      <input
        class="form-check-input"
        type="checkbox"
        :disabled="dontAllowHeavyWeapon"
        role="switch"
        id="has-heavy-weapon-switch"
        v-model="hasHeavyWeapon"
        @change="
          setSquadOptions();
          dontAllowSpecialWeapon = null;
          heavyWeaponSelect = '';
        "
      />
      <label class="form-check-label text-light" for="has-heavy-weapon-switch"
        >Heavy Weapon</label
      >
    </div>
    <!-- heavyWeapon -->
    <div v-if="hasHeavyWeapon" class="form-floating mb-3">
      <select
        class="form-select border-0"
        id="heavy-weapon-select"
        v-model="heavyWeaponSelect"
        @change="
          checkSpecialAndHeavy();
          setSquadOptions();
        "
      >
        <option value="" hidden>Select Heavy Weapon</option>
        <option v-for="weapon in currentSquad.heavyWeapons" :key="weapon">
          {{ weapon }}
        </option>
      </select>
      <label for="special-weapon-select">Heavy Weapon</label>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  props: {
    currentSquad: Object,
    currentModelNumber: Number,
  },

  // emits: ["setSpecialWeapon"],

  setup(props, { emit }) {
    const dontAllowSpecialWeapon = ref(null);
    const dontAllowHeavyWeapon = ref(null);

    const hasSpecialWeapon = ref(false);
    const hasHeavyWeapon = ref(false);

    const specialWeaponSelect = ref("");
    const heavyWeaponSelect = ref("");

    const squadOptions = ref(["", ""]);

    // reset to empty value when squad change
    // reset hasSpecialWeapon switch
    watch(
      () => props.currentSquad,
      () => {
        dontAllowSpecialWeapon.value = null;
        dontAllowHeavyWeapon.value = null;
        hasSpecialWeapon.value = false;
        hasHeavyWeapon.value = false;
        specialWeaponSelect.value = "";
        heavyWeaponSelect.value = "";
      }
    );

    // splice is for adding or removing from squadOptions
    const splice = (index, length, value) => {
      squadOptions.value.splice(index, length, value);
    };

    // watch for currentModelNumber update and change
    watch(
      () => props.currentModelNumber,
      () => {
        if (
          props.currentModelNumber < props.currentSquad.max &&
          specialWeaponSelect.value !== ""
        ) {
          dontAllowHeavyWeapon.value = true;
          hasHeavyWeapon.value = false;
          heavyWeaponSelect.value = "";
          splice(1, 1, "");
          console.log(squadOptions.value);
        } else if (
          props.currentModelNumber < props.currentSquad.max &&
          heavyWeaponSelect.value !== ""
        ) {
          dontAllowSpecialWeapon.value = true;
          hasSpecialWeapon.value = false;
          specialWeaponSelect.value = "";
          splice(0, 1, "");
        } else {
          dontAllowSpecialWeapon.value = null;
          dontAllowHeavyWeapon.value = null;
        }
      }
    );

    // check hasSpecialWeapon and hasHeavyWeapon based on currentModelNumber
    const checkSpecialAndHeavy = () => {
      if (
        props.currentModelNumber < props.currentSquad.max &&
        specialWeaponSelect.value !== ""
      ) {
        dontAllowHeavyWeapon.value = true;
        hasHeavyWeapon.value = false;
        heavyWeaponSelect.value = "";
      } else if (
        props.currentModelNumber < props.currentSquad.max &&
        heavyWeaponSelect.value !== ""
      ) {
        dontAllowSpecialWeapon.value = true;
        hasSpecialWeapon.value = false;
        specialWeaponSelect.value = "";
      } else if (props.currentModelNumber === props.currentSquad.max) {
        dontAllowSpecialWeapon.value = null;
        dontAllowHeavyWeapon.value = null;
      }
    };

    const setSquadOptions = () => {
      // set or clear specialWeapon
      if (hasSpecialWeapon.value === true && specialWeaponSelect.value !== "") {
        splice(0, 1, specialWeaponSelect.value);
      } else if (hasSpecialWeapon.value === false) {
        splice(0, 1, "");
      }
      // set or clear heavyWeapon
      if (hasHeavyWeapon.value === true && heavyWeaponSelect.value !== "") {
        squadOptions.value.splice(1, 1, heavyWeaponSelect.value);
        splice(1, 1, heavyWeaponSelect.value);
      } else if (hasHeavyWeapon.value === false) {
        splice(1, 1, "");
      }
      console.log(squadOptions.value);
    };

    return {
      checkSpecialAndHeavy,
      setSquadOptions,
      splice,
      dontAllowSpecialWeapon,
      dontAllowHeavyWeapon,
      hasSpecialWeapon,
      hasHeavyWeapon,
      specialWeaponSelect,
      heavyWeaponSelect,
      squadOptions,
    };
  },
};
</script>

<style></style>
