<template>
    <!--Os dados veem das requisições ao servidor backend e eu os acesso por aqui usando o for e interpolo cada um dos dados para o usuário-->
    <div>
        <Message :msg="msg" v-show="msg"/>
        <div>
            <form id="acai-form" method= "POST" @submit="createCup">
            <div class="input-container">
                <label for="name">Nome do cliente: </label>
                <input type="text"  id="name" name="name" v-model="name" 
                placeholder="Digite o nome aqui..." 
                title="O nome deve conter de 3 a 20 letras" maxlength="20" required/>
            </div>

            <div class="input-container">
                <label for="size">Escolha o tamanho do copo: </label>
                <select name="size" id="size" required v-model="size" title="Selecione um item na lista">
                <option value="">Selecione o tamanho do copo</option>
                <option v-for="size in sizes" :key="size.id" :value="size.type">{{size.type}}</option>
                </select>
            </div>

            <div class="input-container">
                <label for="typeofcup">Fruta de base: </label>
                <select name="typeofcup" id="typeofcup" title="Selecione um item na lista" required v-model="typeofcup">
                <option value="">Selecione o tipo </option>
                <option v-for="typeofcup in typeofcups" :key="typeofcup.id" :value="typeofcup.type">{{typeofcup.type}}</option>
                </select>
            </div>

            <div id="extrafruits-container" class="input-container">
                <label id="extrafruits-title" for="extrafruits"> Escolha as frutas:<i>(opcional)</i> </label>
                <div class="checkbox-container" v-for="extrafruit in extrafruits_data" :key="extrafruit.id">
                    <input type="checkbox" name="extrafruits" v-model="extrafruits" :value="extrafruit.type">
                    <span>{{extrafruit.type}}</span>
                </div>
            </div>
            

            <div class="input-container">
                <input class="submit-btn" type="submit"  value="Finalizar pedido">
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
            msg: null
            
        };
    },
    methods: {
        async getIngredients() {
            const req = await fetch("http://localhost:8080/ingredients");
            const data = await req.json();
            this.sizes = data.sizes;
            this.priceBySize =  this.sizes.reduce( (map, obj) => {
                map.set(obj.type, parseFloat(obj.price));
                return map;
            }, new Map());

            this.typeofcups = data.typeofcups;

            this.extrafruits_data = data.extrafruits; 
            this.priceByExtraFruits = this.extrafruits_data.reduce((map, obj)=> {
                map.set(obj.type, parseFloat(obj.price));
                return map;
            },new Map());
            
        },
        async createCup(e) {
            e.preventDefault();
            this.totalPrice = parseFloat(this.priceBySize.get(this.size)) + parseFloat(this.extrafruits.reduce((parcialTotal,elem)=>{
                    parcialTotal=parcialTotal + this.priceByExtraFruits.get(elem);
                    return parcialTotal;
                }, 0))

            const data = {
                name: this.name,
                size: this.size,
                typeofcup: this.typeofcup,
                extrafruits: Array.from(this.extrafruits),
                status: "Solicitado",

                totalPrice: this.totalPrice.toFixed(2)
                
            };
            console.log(this.priceByExtraFruits);
            console.log(this.priceBySize);
            console.log(data);
            
            const dataJson = JSON.stringify(data);
            const req = await fetch("http://localhost:8080/orders", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: dataJson
            });
            const res = await req.json();
            
            const orderIdentifier = res.objectId;        
            this.msg=`Pedido ${orderIdentifier.substring(orderIdentifier.length-4)} finalizado com sucesso!`;
     
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
        width: 380px;

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
        margin-left: 7px;
        font-weight: bold;
    }
    .submit-btn {
        background-color:#a58254 ;
        color:#fff;
        font-weight: bold;
        border: 2px solid #631452;
        padding: 10px;
        font-size: 16px;
        margin: 6px;
        cursor: pointer;
        transition: 0.5s;
    }
    .submit-btn:hover {
        background-color: transparent;
        color: #631452;
    }
    

</style>
