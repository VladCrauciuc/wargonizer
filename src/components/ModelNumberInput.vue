<template>
  <!-- number -->
  <div class="form-floating">
    <input
      type="number"
      class="form-control border-0"
      id="model-number-input"
      placeholder="Model Number"
      :min="minModelNumber"
      :max="maxModelNumber"
    />
    <label for="model-number-input">
      <span class="fw-bold">Total</span> no. of models
    </label>
  </div>
</template>

<script>
import { ref, toRef, toRefs } from "@vue/reactivity";
export default {
  props: ["currentSquad"],
  setup(props) {
    const minModelNumber = ref("");
    const maxModelNumber = ref("");

    (minModelNumber.value = props), "currentSquad.value.min";
    (maxModelNumber.value = props), "currentSquad.value.max";

    return {
      minModelNumber,
      maxModelNumber,
    };
  },
};
</script>

<style></style>
