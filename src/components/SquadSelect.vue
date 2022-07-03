<template>
  <!-- squad and number select -->
  <!-- squad -->
  <div class="form-floating mb-3">
    <select
      class="form-select border-0"
      id="squad-select"
      v-model="squadSelect"
      @change="handleSquadSelect"
    >
      <option value="" hidden>Select a squad</option>
      <option v-for="squad in currentArmy.squads" :key="squad.name">
        {{ squad.name }}
      </option>
    </select>
    <label for="squad-select">Squad</label>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  props: ["currentArmy"],

  emits: ["setSquad"],

  setup(props, { emit }) {
    const squadSelect = ref("");

    const handleSquadSelect = () => {
      emit("setSquad", squadSelect.value);
    };

    return { squadSelect, handleSquadSelect };
  },
};
</script>

<style></style>
