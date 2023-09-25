<template>
    <div>
            <form id="login-form"  @submit="authUser">
            <div class="input-container">
                <label for="email">E-mail: </label>
                <input type="email" id="email" name="email" 
                v-model="email" placeholder="Digite o seu email aqui..."/>
            </div>

            <div class="input-container">
                <label for="password">Senha: </label>
                <input type="password" id="password" name="password" 
                v-model="password" placeholder="*******"/>
            </div>

            <div>
                <input type="submit" class="submit-button" value="LogIn">
            </div>
            </form>
        </div>
</template>

<script>
export default {
    name: "LoginForm"

}


</script>
