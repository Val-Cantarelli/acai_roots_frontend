<template>
    <div>
        <div id="nav">
        <router-link to="/" id="logo-url">
            <h1>Make your cup</h1>
        </router-link>

        <router-link to="/">Home</router-link> |
        <router-link to="/Orders">Pedidos</router-link> |
        <router-link to="/SignUpView">Cadastro/Log In</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    props: ["logo", "alt"]
}

</script>

<style scoped>
    #nav {
        background-color: #a58254;
        overflow: auto;
        border-bottom: 4px solid #631452;
        padding: 15px 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    #nav #logo-url {
        margin:auto;
        margin-left: 0;
    }
    #nav a{
        color:whitesmoke;
        text-decoration: none;
        margin: 12px;
        transition: .5s;
    
    }
    #nav a:hover {
        color: #631452;
        
    }
    #nav h1{
        justify-content: flex-start;
        margin: 12px;
        color:whitesmoke;
        text-decoration: none;
    }
</style>
