<template>
<div class="main-container" v-if="orders">
    <h1> Gerenciar pedidos: </h1>
    <DashboardComp />
</div>
<div v-else>Não há pedidos no momento!</div>
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