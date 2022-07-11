<template>
  <!-- squad select -->
  <div class="form-group">
    <div class="form-floating mb-3">
      <select
        class="form-select border-0"
        id="squad-select"
        v-model="squadSelect"
        @change="$emit('setSquad', squadSelect)"
      >
        <option value="" hidden>Select a squad</option>
        <option v-for="squad in currentFaction.squads" :key="squad.squadName">
          {{ squad.squadName }}
        </option>
      </select>
      <label for="squad-select">Squad</label>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  props: { currentFaction: Object },

  emits: ["setSquad"],

  setup(props, { emit }) {
    const squadSelect = ref("");

    // reset to empty value when army change
    watch(
      () => props.currentFaction,
      () => {
        squadSelect.value = "";
      }
    );

    return { squadSelect };
  },
};
</script>

<style></style>
