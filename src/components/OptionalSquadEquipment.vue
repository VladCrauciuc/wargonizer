<template>
  <div class="form-group mb-3">
    <!-- optionalSquadEquipment switch -->
    <div class="form-check form-switch mb-3">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="has-optional-equipment-switch"
        v-model="hasOptionalSquadEquipment"
        @change="
          $emit('setOptionalSquadEquipment', '');
          optionalSquadEquipmentSelect = '';
        "
      />
      <label
        class="form-check-label text-light"
        for="has-optional-equipment-switch"
        >Optional Squad Equipment</label
      >
    </div>
    <!-- optionalSquadEuipment select -->
    <div v-if="hasOptionalSquadEquipment" class="form-floating">
      <select
        class="form-select border-0"
        id="optional-squad-equipment-select"
        v-model="optionalSquadEquipmentSelect"
        @change="
          $emit('setOptionalSquadEquipment', optionalSquadEquipmentSelect)
        "
      >
        <option value="" hidden>Select Optional Equipment</option>
        <option
          v-for="equipment in currentSquad.optionalSquadEquipment"
          :key="equipment"
        >
          {{ equipment }}
        </option>
      </select>
      <label for="optional-squad-equipment-select"
        >Optional Squad Equipment</label
      >
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  props: { currentSquad: Object },

  emits: ["setOptionalSquadEquipment"],

  setup(props, { emit }) {
    const hasOptionalSquadEquipment = ref(false);

    const optionalSquadEquipmentSelect = ref("");

    // reset to empty value when squad change
    // reset hasOptionalSquadEquipment switch
    watch(
      () => props.currentSquad,
      () => {
        hasOptionalSquadEquipment.value = false;
        optionalSquadEquipmentSelect.value = "";
      }
    );

    return {
      hasOptionalSquadEquipment,
      optionalSquadEquipmentSelect,
    };
  },
};
</script>

<style></style>
