<template>
  <div class="form-group mb-3">
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
        v-model="leaderWeapon2Select"
      >
        <option value="" hidden>Select Leader Weapon 2</option>
        <option
          v-for="weapon in currentSquad.leader.leaderWeapon2"
          :key="weapon"
        >
          {{ weapon }}
        </option>
      </select>
      <label for="leader-weapon2-select">Leader Weapon 2</label>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    currentSquad: Object,
  },

  setup() {
    const hasLeader = ref(false);

    const leaderWeapon1Select = ref("");
    const leaderWeapon2Select = ref("");

    return {
      hasLeader,
      leaderWeapon1Select,
      leaderWeapon2Select,
    };
  },
};
</script>

<style></style>
