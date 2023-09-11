<template>
    <div id="acai-table">
      <Message :msg="msg" v-show="msg"/>
        <div>
            <div id="acai-table-heading">
                <div class="order-id">#:</div>
                <div>Cliente: </div>
                <div>Tamanho do Copo: </div>
                <div>Fruta de base: </div>
                <div>Frutas extras: </div>
                <div>Ações: </div>
            </div>
            <div id="acai-table-rows">
                <div class="acai-table-row" v-for="cup in cups" :key="cup.id" >
                    <div class="order-number">{{ cup.id }}</div>
                    <div> {{ cup.user_name }} </div>
                    <div>{{ cup.size }}</div>
                    <div>{{ cup.typeofcup }}</div>
                    <div>
                        <ul>
                            <li v-for="(extra_fruit,index) in cup.extra_fruits" :key="index">{{extra_fruit}}</li>
                        </ul>
                    </div>
                    <div>
                        <select name="status" class="status" @change="updateCup($event,cup.id)">
                            <option value="">Status</option>
                            <option v-for="s in status" :key="s.id" :value="s.type" :selected="cup.status == s.type">{{ s.type }}</option>
                        </select>
                        <button class="delete-btn" @click="deleteCup(cup.id)">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from './Message.vue';
export default {
    name: "DashboardComp",
    components: {
      Message
    },
    data() {
        return {
            cups: null,
            acai_id: null,
            status: null,
            msg: null,
        }
    },
    methods: {
        async getOrders() {
            //TAREFA: resgatar pedidos registrados do backend
            // Requisição ao servidor usando a rota cups(onde eu salvei os pedidos registrados)
            const req= await fetch("http://localhost:3000/cups");

            //Passar a resposta para Json e guarda em data
            const data = await req.json();

            // this.cups que o template vai usar, vai ser retirado do conteúdo resposta traduzido e armazenado na variável data acima
            this.cups = data;


            //TAREFA: Resgatar status do backend
            this.getStatus();
        },
        async getStatus() {
            const req= await fetch("http://localhost:3000/status");
            const data = await req.json(); 
            this.status = data;
            console.log(data);
        },

        async deleteCup(id) {
            //Poderia ter uma lógica na api que faria a remoção desse item
            const req=await fetch(`http://localhost:3000/cups/${id}`,{
                method: "DELETE"
            });

            const res= await req.json();

            //Mensagem ao usuário:
            this.msg="Pedido removido com sucesso!";
            
            //Limpar mensagem e campos do form após realização do pedido
            setTimeout(()=> this.msg = "", 3000);

            //msg falando que pedido que foi deletado (mostrar pro adm e user)


            //Vai forçar a atualização dos pedidos por meio do backend. E np fim das contas terão sido feitas 3 requisições. 
            //Alternativa à isso é fazer na mão: pegar os itens de cups, excluir o id e reproduz replicando o conteúdo do data do componente, fazendo uma requisição a menos no BE
            this.getOrders();
        },
        async updateCup(event,id) {

          const option = event.target.value;

          const dataJson= JSON.stringify({status:option});

          const req = await fetch(`http://localhost:3000/cups/${id}`,{
            method: "PATCH",
            headers: { "content-Type": "application/json" },
            body: dataJson
          });
          const res = await req.json();

          //Mensagem ao usuário:
          this.msg=`Pedido N ${res.id} foi atualizado para ${res.status}!`;
            
            //Limpar mensagem e campos do form após realização do pedido
            setTimeout(()=> this.msg = "", 3000);
        }


    },
    mounted() {
         //Quando o componente é montade, ele chama, de fato, o método que
        // cria as info das solicitações
        this.getOrders()}
}
</script>

<style scoped>
    #acai-table {
    max-width: 1200px;
    margin: 0 auto;
  }

  #acai-table-heading,
  #acai-table-rows,
  .acai-table-row {
    display:flex;
    flex-wrap: wrap;
  }

  #acai-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .acai-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }

  #acai-table-heading div,
  .acai-table-row div {
    width: 19%;
  }

  #acai-table-heading .order-id,
  .acai-table-row .order-number {
    width: 5%;
  }

  select {
    padding: 12px 6px;
    margin-right: 12px;
  }

  .delete-btn {
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
  
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>