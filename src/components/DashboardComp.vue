<template>

    <div id="acai-table" v-if="orders">
      <div>
        <div id="acai-table-heading">
          <div class="order-id">#:</div>
          <div>Cliente: </div>
          <div>Tamanho do Copo: </div>
          <div>Fruta de base: </div>
          <div>Frutas extras: </div>
          <div>Ações: </div>
        </div>
      </div>

      <div id="acai-table-rows">
        <div class="acai-table-row" v-for="order in orders" :key="order.id" >
          <div class="order-number">{{ order.id }}</div>
          <div> {{ order.user_name }} </div>
          <div>{{ order.size }}</div>
          <div>{{ order.typeofcup }}</div>
          <div>
            <ul v-for="(extrafruit,index) in order.extrafruits" :key="index">
              <li> {{ extrafruit }}</li>
            </ul>
          </div>
          <div>
            <select name="status" class="status" @change="updateCup($event,order.id)">
              <!--<option :value="s.type">Solicitado</option>-->
              <option :value="s.type" v-for="s in status" :key="s.id" :selected="order.status == s.type">
                {{ s.type }}
              </option>
            </select>

            <button class="delete-btn" @click="deleteCup(order.id)">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
    <h2>Não há pedidos no momento!</h2>
  </div>
           
</template>

<script>

export default {
    name: "DashboardComp",
    data() {
        return {
          orders: null,
          orderId: null,
          status: []
        }
    },
    methods: {
        async getOrders() {
            //TAREFA: resgatar pedidos registrados do backend
            // Requisição ao servidor usando a rota orders(onde eu salvei os pedidos registrados)
            const req= await fetch("http://localhost:8080/orders");

            //Passar a resposta para Json e guarda em data
            const data = await req.json();

            // this.orders que o template vai usar, vai ser retirado do conteúdo resposta traduzido e armazenado na variável data acima
            this.orders= data;


            //TAREFA: Resgatar status do backend
            this.getStatus();
        },
        async getStatus() {
            const req= await fetch("https://schedule-management.fly.dev/status");
            const data = await req.json(); 
            this.status = data;
            console.log(data);

        },

        async deleteCup(id) {
            //Poderia ter uma lógica na api que faria a remoção desse item
            const req=await fetch(`http://localhost:8080/orders${id}`,{
                method: "DELETE"
            });

            const res= await req.json();

            //Mensagem ao usuário:
            this.msg="Pedido removido com sucesso!";
            
            //Limpar mensagem e campos do form após realização do pedido
            setTimeout(()=> this.msg = "", 3000);

            //msg falando que pedido que foi deletado (mostrar pro adm e user)


            //Vai forçar a atualização dos pedidos por meio do backend. E np fim das contas terão sido feitas 3 requisições. 
            //Alternativa à isso é fazer na mão: pegar os itens de orders, excluir o id e reproduz replicando o conteúdo do data do componente, fazendo uma requisição a menos no BE
            this.getOrders();
        },
        async updateCup(event,id) {

          const option = event.target.value;

          const dataJson= JSON.stringify({status:option});

          const req = await fetch(`http://localhost:8080/orders/${id}`, {
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