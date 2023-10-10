<template>
    <!--Os dados veem das requisições ao servidor backend e eu os acesso por aqui usando o for e interpolo cada um dos dados para o usuário-->
    <div>
        <Message :msg="msg" v-show="msg"/>
        <div>
            <form id="acai-form" method= "POST" @submit="createCup">
            <div class="input-container">
                <label for="name">Nome do cliente: </label>
                <input type="text" id="name" name="name" 
                v-model="name" placeholder="Digite o seu nome aqui..."/>
            </div>

            <div class="input-container">
                <label for="size">Escolha o tamanho do copo: </label>
                <select name="size" id="size" v-model="size">
                <option value="">Selecione o tamanho do seu copo</option>
                <!--Os dados serão impressos pela interpolação de acordo com o db.json-->
                <option v-for="size in sizes" :key="size.id" :value="size.type">{{size.type}}</option>
                </select>
            </div>

            <div class="input-container">
                <label for="typeofcup">Fruta de base: </label>
                <select name="typeofcup" id="typeofcup" v-model="typeofcup">
                <option value="">Selecione o tipo </option>
                <option v-for="typeofcup in typeofcups" :key="typeofcup.id" :value="typeofcup.type">{{typeofcup.type}}</option>
                </select>
            </div>

            <div id="extrafruits-container" class="input-container">
                <label id="extrafruits-title" for="extrafruits"> Escolha as frutas (opcional): </label>
                <div class="checkbox-container" v-for="extrafruit in extrafruits_data" :key="extrafruit.id">
                    <input type="checkbox" name="extrafruits" v-model="extrafruits" :value="extrafruit.type">
                    <span>{{extrafruit.type}}</span>
                </div>
            </div>

            <div class="input-container">
                <input class="submit-btn" type="submit"  value="Finalizar meu pedido">
            </div>
            </form>
        </div>
    </div>    
</template>

<script>
import Message from './Message.vue';

export default {
    name: "AcaiForm",
    components: {
        Message
    },
    data() {
        return {
            sizes: null,
            typeofcups: null,
            extrafruits_data: null,
            name: null,
            size: null,
            typeofcup: null,
            extrafruits: [],
            msg: null,
            //status: status.id(1)
        };
    },
    methods: {
        async getIngredients() {
            // (AJAX req) Recupera os "ingredients" que estão no banco de dados por meio do db.json
            const req = await fetch("http://localhost:8080/ingredients");
            const data = await req.json();
            //teste
            console.log(data);
            this.sizes = data.sizes;
            this.typeofcups = data.typeofcups;
            this.extrafruits_data = data.extrafruits;

            
        },
        // Insere informações do usuário no banco de dados. Vou usar event para que o form pare quando clicar no submit
        async createCup(e) {

            e.preventDefault();
            //teste
            console.log("funcionando");
            const data = {
                name: this.name,
                size: this.size,
                typeofcup: this.typeofcup,
                extrafruits: Array.from(this.extrafruits),
                //O cup sempre vem como solicitado - fazer o backend fazer isso
                status: "Solicitado"
            };
            console.log(data);
            // Os dados de data precisam estar em texto para o navegador podem entender. O backend terá de converter de novo para json para acessar esses dados
            const dataJson = JSON.stringify(data);
            const req = await fetch("http://localhost:8080/orders", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: dataJson
            });
            const res = await req.json();
            //Dá pra ver que foi criado tanto no json fake quanto no console quando identifica o pedido pelo id=1
            console.log(res);
            //Como limpar o form e colocar um feedback?

            //Mensagem ao usuário:
            this.msg=`Pedido N ${res.id} finalizado com sucesso!`;
            
            //Limpar mensagem e campos do form após realização do pedido
            setTimeout(()=> this.msg = "", 3000);
            this.name = "";
            this.typeofcup = "";
            this.size = "";
            this.extrafruits= [];

        },
    },
    mounted() {
        this.getIngredients();
        
    },
    components: { Message }
}
</script>

<style scoped>
    #acai-form {
    max-width: 400px;
    margin:0 auto;
    }

    .input-container{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

    }
    label{
        font-weight: bold;
        margin-bottom: 15px;
        color:#631452;
        padding: 5px 10px;
        border-left: 4px solid #a58254 ;


    }
    input,select {
        padding: 5px 10px;
        width: 300px;

    }
    #extrafruits-container{
        flex-direction: row;
        flex-wrap: wrap;

    }

    #extrafruits-title{ 
        width: 100%;
    }
    .checkbox-container{
        display:flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20px;

    }
    .checkbox-container span,
    .checkbox-container input {
        width: auto;
    }
    .checkbox-container span {
        margin-left: 6px;
        font-weight: bold;
    }
    .submit-btn {
        background-color:#a58254 ;
        color:#fff;
        font-weight: bold;
        border: 2px solid #631452;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: 0.5s;
    }
    .submit-btn:hover {
        background-color: transparent;
        color: #631452;
    }

</style>
