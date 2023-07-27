<template>
  <div class="form-group mb-3">
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
          $emit('setHeavyWeapon', '');
          heavyWeaponSelect = '';
        "
      />
      <label class="form-check-label text-light" for="has-heavy-weapon-switch"
        >Heavy Weapon</label
      >
    </div>
    <!-- heavyWeapon -->
    <div v-if="hasHeavyWeapon" class="form-floating">
      <select
        class="form-select border-0"
        id="heavy-weapon-select"
        v-model="heavyWeaponSelect"
        @change="$emit('setHeavyWeapon', heavyWeaponSelect)"
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
    currentSpecialWeapon: String,
  },

  emits: ["setHeavyWeapon"],

  setup(props, { emit }) {
    const dontAllowHeavyWeapon = ref(false);
    const hasHeavyWeapon = ref(false);

    const heavyWeaponSelect = ref("");

    // reset to empty value when squad change
    // reset hasHeavyWeapon switch
    watch(
      () => props.currentSquad,
      () => {
        dontAllowHeavyWeapon.value = null;
        hasHeavyWeapon.value = false;
        heavyWeaponSelect.value = "";
      }
    );

    // watch for currentModelNumber and currentSpecialWeapon values
    // disable hasHeavyWeapon if currentModelNumber < currentSquad.max and currentSpecialWeapon.value !== ''
    watch(
      () => [props.currentModelNumber, props.currentSpecialWeapon],
      () => {
        if (
          props.currentSquad.restrictSpecialAndHeavy &&
          props.currentModelNumber < props.currentSquad.max &&
          props.currentSpecialWeapon !== ""
        ) {
          dontAllowHeavyWeapon.value = true;
          hasHeavyWeapon.value = false;
          // console.log(dontAllowHeavyWeapon.value);
          // console.log(props.currentSpecialWeapon);
        } else {
          dontAllowHeavyWeapon.value = null;
          // console.log(dontAllowHeavyWeapon.value);
          // console.log(props.currentSpecialWeapon);
        }
      }
    );

    return { dontAllowHeavyWeapon, hasHeavyWeapon, heavyWeaponSelect };
  },
};
</script>

<style></style>
