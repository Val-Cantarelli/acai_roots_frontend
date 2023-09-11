<template>
  <Banner />
  <div class="main-container">
  <h1>Monte o seu açaí:</h1>
  <AcaiForm />
  </div>
</template>

<script>

import Banner from "../components/Banner.vue"
import AcaiForm from "@/components/AcaiForm.vue";
export default {
  name: "HomeView",
  components: {
    Banner,
    AcaiForm
}
}

</script>

<script setup></script>

