<template>
  <!-- number -->
  <div class="form-group mb-3">
    <div class="form-floating">
      <input
        @change="
          adjustNumber($event);
          handleModelNumberInput();
        "
        @keydown.enter.prevent="
          adjustNumber($event);
          handleModelNumberInput();
        "
        type="number"
        class="form-control border-0"
        id="model-number-input"
        placeholder="Model Number"
        :min="currentSquad.min"
        :max="currentSquad.max"
        v-model="modelNumberInput"
      />
      <label for="model-number-input">
        <span class="fw-bold">Total</span> no. of models
        <span v-show="currentSquad.min && currentSquad.max"
          >(between {{ currentSquad.min }} and {{ currentSquad.max }})</span
        >
      </label>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  props: { currentSquad: Object, currentArmy: Object },
  setup(props, { emit }) {
    const modelNumberInput = ref("");

    // reset to empty value when army change
    watch(
      () => props.currentArmy,
      () => {
        modelNumberInput.value = "";
      }
    );

    // reset to empty value when squad change
    watch(
      () => props.currentSquad,
      () => {
        modelNumberInput.value = "";
      }
    );

    // adjust model number between min and max provided by currentSquad
    const adjustNumber = ($event) => {
      if (modelNumberInput.value < props.currentSquad.min) {
        modelNumberInput.value = props.currentSquad.min;
      }
      if (modelNumberInput.value > props.currentSquad.max) {
        modelNumberInput.value = props.currentSquad.max;
      }
      $event.target.blur();
    };

    // emit value of modelNumberInput to Form
    const handleModelNumberInput = () => {
      emit("setModelNumber", modelNumberInput.value);
    };

    return { modelNumberInput, adjustNumber, handleModelNumberInput };
  },
};
</script>

<style></style>
