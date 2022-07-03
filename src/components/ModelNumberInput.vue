<template>
  <!-- number -->
  <div class="form-floating">
    <input
      type="number"
      class="form-control border-0"
      id="model-number-input"
      placeholder="Model Number"
      :min="currentSquad.min"
      :max="currentSquad.max"
    />
    <label for="model-number-input">
      <span class="fw-bold">Total</span> no. of models
    </label>
  </div>
</template>

<script>
// import { ref, toRef, toRefs } from "@vue/reactivity";
export default {
  props: { currentSquad: Object },
  setup(props) {},
};
</script>

<style></style>
