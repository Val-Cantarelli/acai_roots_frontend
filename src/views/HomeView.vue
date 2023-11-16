<template>
  <Banner />
  <div class="main-container">
  <h1>Monte o pedido:</h1>
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
<style>
@media only screen and (max-width: 600%) {
    /* Estilos para telas pequenas (exemplo: smartphones) */
  }
  @media only screen and (min-width: 601%) and (max-width: 1024%) {
  /* Estilos para telas médias (exemplo: tablets) */
  }</style>



