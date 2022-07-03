<template>
  <!-- squad and number select -->
  <div class="form-group">
    <!-- squad -->
    <div class="form-floating mb-3">
      <select class="form-select border-0" id="squad-select">
        <option value="" hidden>Select a squad</option>
        <option>To use v-for here</option>
      </select>
      <label for="squad-select">Squad</label>
    </div>
    <!-- number -->
    <div class="form-floating">
      <input
        type="number"
        class="form-control border-0"
        id="model-number-input"
        placeholder="Model Number"
      />
      <label for="model-number-input">
        <span class="fw-bold">Total</span> no. of models
      </label>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
