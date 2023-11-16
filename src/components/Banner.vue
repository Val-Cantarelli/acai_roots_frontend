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

    #main-banner{
        background-image: url("../assets/acai-copo.jpg");
        background-position: 20 -100px;
        background-size: cover;
        height: 500px;
        display: flex;
        
        background-repeat: no-repeat;
        justify-content: flex-start;
        
  }
    
    
    #main-banner h1 {
    color: #FFF;
    text-align: center;
    font-size: 60px;
    background-color: #222;
    padding: 20px 40px;
  }  
    
</style>
