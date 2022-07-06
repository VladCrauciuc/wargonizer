<template>
  <div class="form-group mb-3">
    <!-- specialWeapon Switch -->
    <div class="form-check form-switch mb-3">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="has-special-weapon-switch"
        v-model="hasSpecialWeapon"
        @change="$emit('setSpecialWeapon', '')"
      />
      <label class="form-check-label text-light" for="has-special-weapon-switch"
        >Special Weapon</label
      >
    </div>
    <!-- Special Weapon -->
    <div v-if="hasSpecialWeapon" class="form-floating">
      <select
        class="form-select border-0"
        id="special-weapon-select"
        v-model="specialWeaponSelect"
        @change="$emit('setSpecialWeapon', specialWeaponSelect)"
      >
        <option value="" hidden>Select Special Weapon</option>
        <option v-for="weapon in currentSquad.specialWeapons" :key="weapon">
          {{ weapon }}
        </option>
      </select>
      <label for="special-weapon-select">Special Weapon</label>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  props: { currentSquad: Object },

  emits: ["setSpecialWeapon"],

  setup(props, { emit }) {
    const hasSpecialWeapon = ref(false);

    const specialWeaponSelect = ref("");

    // reset to empty value when squad change
    // reset hasSpecialWeapon switch
    watch(
      () => props.currentSquad,
      () => {
        hasSpecialWeapon.value = false;
        specialWeaponSelect.value = "";
      }
    );

    return { hasSpecialWeapon, specialWeaponSelect };
  },
};
</script>

<style></style>
