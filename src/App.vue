<template>
  <div id="globalConfig">
    <div class="main-container">
      <Navbar :logo="logo_src" :alt="app_name" />
    </div>
    <div class="main-container">
      <router-view></router-view>
    </div>
    <div class="main-container">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      logo_src: require("./assets/logo.png"),
      app_name: "Açaí Roots"
    };
  }
};
</script>

<style>

#globalConfig {
  flex-direction: column;
  min-height: 100vh;
  margin: -8px;
}
h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #2229;
}

.main-container {
  background-color: #e0e0e0;
  max-width: 100%;
  box-sizing: border-box;
  
  
}


</style>
