<template>
  <div class="container">
    <div
      class="d-flex flex-column justify-content-center align-items-center mt-3 mb-3"
    >
      <h1>The Wargonizer</h1>
      <h4 class="fst-italic">main</h4>
    </div>
    <Form />
  </div>
</template>

<script>
import Form from "./components/Form.vue";
export default {
  name: "App",
  components: { Form },
  setup() {},
};
</script>

<style></style>
