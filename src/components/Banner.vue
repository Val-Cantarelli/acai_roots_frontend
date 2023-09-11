<template>
    <div id="main-banner">
    </div>
</template>
<script>
export default {
    name: "Banner"
}
</script>

<style scoped>
    #main-banner {
        background-image: url("../assets/acai-copo.jpg");
        background-position: 0 -250;
        background-size:cover;
        height: 500px;
        display:flex;
        justify-content:flex-start;
        align-items: center;
        background-repeat: no-repeat;
    }  
    #main-banner h1 {
    color: #FFF;
    text-align: center;
    font-size: 60px;
    background-color: #222;
    padding: 20px 40px;
  }    
</style>
