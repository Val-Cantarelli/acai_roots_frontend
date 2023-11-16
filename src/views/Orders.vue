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
@media only screen and (max-width: 600%) {
    /* Estilos para telas pequenas (exemplo: smartphones) */
}
@media only screen and (min-width: 601%) and (max-width: 1024%) {
 /* Estilos para telas médias (exemplo: tablets) */
}


</style>

