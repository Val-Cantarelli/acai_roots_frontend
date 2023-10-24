<template>
    <div>
        <Message :msg="msg" v-show="msg"/>
        <div>
            <form id="signup-form"  @submit="createUser">
            <div id="input-container">
                <label for="firstName">Nome: </label>
                <input type="text" id="firstName" name="firstName" 
                v-model="firstName" placeholder="Digite o seu nome aqui..."/>
            </div>

            <div id="input-container">
                <label for="lastName">Sobrenome: </label>
                <input type="text" id="lastName" name="lastName" 
                v-model="lastName" placeholder="Digite o seu nome aqui..."/>
            </div>

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
                <input type="submit" class="submit-button" value="Cadastrar">
            </div>
            
            </form>
        </div>
    </div>


    
</template>
<script>
import Message from "./Message.vue";

export default {
    name: 'SignUpForm',
    data() {
        return{
            id:null,
            firstName:null,
            lastName: null,
            email: null,
            password: null
        }
    },
    components: {
        Message
    },
    methods: {
        async createUser(e) {
            e.preventDefault();
            const data= {
                id: this.id,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
            };

            const dataJson = JSON.stringify(data);
            const req = await fetch("http://localhost:8080/customers",{
                method: "POST",
                headers: {"content-Type":"application/json"},
                body: dataJson
            });
            const res = await req.json();

            this.msg= `Cadastro realizado com sucesso!`;

            setTimeout(() => this.msg = "",3000)
            this.firstName="";
            this.lastName="";
            this.email= "";
            this.password= ""
        },
    },
    
}
</script>
