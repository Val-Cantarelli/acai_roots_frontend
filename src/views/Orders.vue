<template>
<div class="main-container">
    <h1> Gerenciar pedidos: </h1>
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