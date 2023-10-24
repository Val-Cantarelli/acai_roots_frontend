<template>
<div id="main-banner">
    <DashboardComp />
</div>

</template>

<script>
import DashboardComp from '../components/DashboardComp.vue';

export default {
    name: "Orders",
    components: {
        DashboardComp
    }
}
</script>
<style scoped>
#main-banner {
        background-position: 0 -250;
        background-size:cover;
        height: 500px;
        display:flex;
        justify-content:flex-start;
        align-items: center;
        
    }  


</style>

