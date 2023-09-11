<template>
  <div>
    <Navbar :logo="logo_src" :alt="app_name" />
    <div>
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      logo_src: require("./assets/logo.png"),
      app_name: "Make your bowl"
    }
  }
}
</script>
<style>
  * {
    font-family: "Sofia", sans-serif;
    padding: 0;
    margin:0;
    box-sizing: border-box;
  }

  .main-container {
    margin: 50px;
    min-height: 250px;
  }
  h1 {
    text-align:center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #2229;
    

  }
</style>
