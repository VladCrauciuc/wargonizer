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
          $emit('setLeader', {
            hasLeader: hasLeader,
            leaderWeapon1Select: '',
            leaderWeapon2Select: '',
            leaderOptionalSelect: '',
          });
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
        @change="
          $emit('setLeader', {
            hasLeader: true,
            leaderWeapon1Select: leaderWeapon1Select,
            leaderWeapon2Select: leaderWeapon2Select,
            leaderOptionalSelect: leaderOptionalSelect,
          })
        "
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
        @change="
          $emit('setLeader', {
            hasLeader: true,
            leaderWeapon1Select: leaderWeapon1Select,
            leaderWeapon2Select: leaderWeapon2Select,
            leaderOptionalSelect: leaderOptionalSelect,
          })
        "
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
    <!-- leaderOptionalEquipment -->
    <div
      v-if="
        hasLeader && currentSquad.leader.leaderOptionalEquipment.length !== 0
      "
      class="form-floating"
    >
      <select
        class="form-select border-0"
        id="leader-optional-select"
        v-model="leaderOptionalSelect"
        @change="
          $emit('setLeader', {
            hasLeader: true,
            leaderWeapon1Select: leaderWeapon1Select,
            leaderWeapon2Select: leaderWeapon2Select,
            leaderOptionalSelect: leaderOptionalSelect,
          })
        "
      >
        <option value="" hidden>Select Leader Optional Equipment</option>
        <option
          v-for="weapon in currentSquad.leader.leaderOptionalEquipment"
          :key="weapon"
        >
          {{ weapon }}
        </option>
      </select>
      <label for="leader-optional-select">Leader Optional Weapon</label>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  props: { currentSquad: Object },

  emits: ["setLeader"],

  setup(props, { emit }) {
    const hasLeader = ref(false);

    const leaderWeapon1Select = ref("");
    const leaderWeapon2Select = ref("");
    const leaderOptionalSelect = ref("");

    // reset to empty value when squad change
    // reset hasHeavyWeapon switch
    watch(
      () => props.currentSquad,
      () => {
        hasLeader.value = false;
        leaderWeapon1Select.value = "";
        leaderWeapon2Select.value = "";
        leaderOptionalSelect.value = "";
      }
    );

    return {
      hasLeader,
      leaderWeapon1Select,
      leaderWeapon2Select,
      leaderOptionalSelect,
    };
  },
};
</script>

<style></style>
