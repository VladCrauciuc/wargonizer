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
        @change="checkSpecialAndHeavy"
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
        @change="checkSpecialAndHeavy"
      >
        <option value="" hidden>Select Heavy Weapon</option>
        <option v-for="weapon in currentSquad.heavyWeapons" :key="weapon">
          {{ weapon }}
        </option>
      </select>
      <label for="special-weapon-select">Heavy Weapon</label>
    </div>
    <!-- hasLeader Switch -->
    <div class="form-check form-switch mb-3">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="has-leader-switch"
        v-model="hasLeader"
        @change="
          leaderWeapon1Select = '';
          leaderWeapon2Select = '';
          leaderOptionalSelect = '';
        "
      />
      <label class="form-check-label text-light" for="has-leader-switch"
        >Has Leader</label
      >
    </div>
    <!-- leaderWeapon1 -->
    <div
      v-if="hasLeader && currentSquad.leader.leaderWeapon1.length !== 0"
      class="form-floating mb-3"
    >
      <select
        class="form-select border-0"
        id="leader-weapon1-select"
        v-model="leaderWeapon1Select"
      >
        <option value="" hidden>Select Leader Weapon 1</option>
        <option
          v-for="weapon in currentSquad.leader.leaderWeapon1"
          :key="weapon"
        >
          {{ weapon }}
        </option>
      </select>
      <label for="leader-weapon1-select">Leader Weapon 1</label>
    </div>
    <!-- leaderWeapon2 -->
    <div
      v-if="hasLeader && currentSquad.leader.leaderWeapon2.length !== 0"
      class="form-floating mb-3"
    >
      <select
        class="form-select border-0"
        id="leader-weapon2-select"
        v-model="leaderWeapon1Select"
      >
        <option value="" hidden>Select Leader Weapon 2</option>
        <option
          v-for="weapon in currentSquad.leader.leaderWeapon2"
          :key="weapon"
        >
          {{ weapon }}
        </option>
      </select>
      <label for="leader-weapon2-select">Leader Weapon 1</label>
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
    const hasLeader = ref(false);

    const specialWeaponSelect = ref("");
    const heavyWeaponSelect = ref("");
    const leaderWeapon1Select = ref("");
    const leaderWeapon2Select = ref("");

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

    // watch for currentModelNumber
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
        } else if (
          props.currentModelNumber < props.currentSquad.max &&
          heavyWeaponSelect.value !== ""
        ) {
          dontAllowSpecialWeapon.value = true;
          hasSpecialWeapon.value = false;
          specialWeaponSelect.value = "";
        } else {
          dontAllowSpecialWeapon.value = null;
          dontAllowHeavyWeapon.value = null;
        }
      }
    );
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

    return {
      checkSpecialAndHeavy,
      dontAllowSpecialWeapon,
      dontAllowHeavyWeapon,
      hasSpecialWeapon,
      hasHeavyWeapon,
      hasLeader,
      leaderWeapon1Select,
      leaderWeapon2Select,
      specialWeaponSelect,
      heavyWeaponSelect,
    };
  },
};
</script>

<style></style>
