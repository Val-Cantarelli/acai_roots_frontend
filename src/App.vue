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
}

* {
  font-family: "Sofia", sans-serif;
  
  margin: 0;
  box-sizing: border-box;
  text-align: center;
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
  margin-bottom: 10px;
  
  box-sizing: border-box;
  margin: 0 auto;
}

@media only screen and (max-width: 600px) {
  .main-container {
    width: 100%;
    margin-bottom: 0;
  }
}
</style>
