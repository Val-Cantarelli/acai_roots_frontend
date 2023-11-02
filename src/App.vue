<template>
  <div>
    
    <div>
      <Navbar :logo="logo_src" :alt="app_name" />
    </div>
    <div>
      <router-view></router-view>
    </div>
    <div>
      <Footer></Footer>
    </div>
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
      app_name: "Açaí Roots"
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
    margin: 25px;
    min-height: 250px;
  }
  h1 {
    text-align:center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #2229;
  }
  @media (max-width: 768px) {
    .main-container {
      margin: 10%;
    }
    h1 {
      font-size: 32%; 
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 24%; 
    }
  }
  
</style>
