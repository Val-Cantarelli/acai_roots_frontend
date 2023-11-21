<template>
  

  <div id="acai-table" v-if="orders.length > 0">
    
    <div class="fixed-heading">
      <h1> Gerenciar pedidos: </h1>
      <div id="acai-table-heading">
        <div class="order-id">N˚</div>
        <div>Cliente</div>
        <div>Tamanho </div>
        <div>Fruta de base </div>
        <div>Frutas extras </div>
        <div>Total (R$)</div>
        <div>Ações </div>
      </div>
  </div>
    <div id="acai-table-rows">
      <div class="acai-table-row" v-for="order in orders" :key="order.objectId">
        <div class="order-number">{{ order.objectId.substring(order.objectId.length-4) }}</div>
        <div>{{ order.name }}</div>
        <div>{{ order.size }}</div>
        <div>{{ order.typeofcup }}</div>        
        <div>
          <div v-if="order.extrafruits.length > 0">
            <ul v-for="(extrafruit,index) in order.extrafruits" :key="index">
              <li> {{ extrafruit }}</li>
            </ul>
          </div>
          <div v-else>Sem extras</div>
        </div> 


        <div class="order-value">R$ {{order.totalPrice }}</div>
          <div>
            <select name="status" class="status" @change="updateCup($event,order.objectId)">
              <option :value="s.type" v-for="s in status" :key="s.objectId" :selected="order.status == s.type">
                {{ s.type }}
              </option>
            </select>
            <button class="delete-btn" @click="deleteCup(order.objectId)">Cancelar</button>
          </div>  
      </div>
    </div>
  </div>    
  <div class="noOrders" v-else>
    <h1>Não há pedidos no momento!</h1>
  </div>

</template>

<script>

export default {
    name: "DashboardComp",
  
    data() {
        return {
          orders: [],
          objectId: null,
          status: []
        }
    },
    methods: {
        async getOrders() {
            const req= await fetch("https://schedule-management.fly.dev/orders");

            const data = await req.json();
            this.orders= data;

            this.getStatus();
        },
        async getStatus() {
            const req= await fetch("https://schedule-management.fly.dev/status");
            const data = await req.json(); 
            this.status = data;
        },
        async deleteCup(objectId) {
          try{
              await fetch(`https://schedule-management.fly.dev/orders/${objectId}`, {
                method: "DELETE"
                
              });

              this.getOrders();

          } catch (error) {
            console.log("Erro ao excluir pedido:", error);
          }
        },
        async updateCup(event,objectId) {
          const option = event.target.value;
          const dataJson= JSON.stringify({status:option});
          const req = await fetch(`https://schedule-management.fly.dev/orders/${objectId}`, {
            method: "PATCH",
            headers: { "content-Type": "application/json" },
            mode: "cors",
            body: dataJson
          });
          const res = await req.json();
          
          
        }
    },
    mounted() {
      this.getOrders()}
}
</script>

<style scoped>
  #acai-table {
    max-width: 1300px;
    width: 100%;
    margin: auto;  
  }  
 

  .fixed-heading {
    width: auto;
  }
  .fixed-heading h1 {
    font-size: 42px;
    margin-bottom: 30px;
    color: rgba(6, 6, 6, 0.6);
    text-align:center;  
         
  } 
 
  #acai-table-rows {
    overflow:scroll;
    max-width: 1500px;
    max-height: 350px;
    width: 100%;
    margin:0 auto;
  }

 
  #acai-table-heading,
  #acai-table-rows,
  .acai-table-row {
    display:flex;
    flex-wrap:wrap;
    align-items: left;
    text-align: left;
  }

  #acai-table-heading {
      
    font-weight: bold;
    padding: 15px;
    border-bottom: 5px solid #3b1337;  
    background-color:#fff;  
  }

  .acai-table-row {
    padding: 12px;
    border-bottom: 1px solid #927171;
    width: 100%;
  }

  #acai-table-heading div,
  .acai-table-row div {
    flex:1;
    padding: 5px;
    max-width: 100%;
    width: 160px;
    
  }

  #acai-table-heading .order-id,
  .acai-table-row .order-number {
    width: 13%;
  }

  select {
    padding: 5px 22px;
    margin-right: 12px;
    align-items:self-end;
  }

  .delete-btn {
    background-color:#dfcbb1 ;
    color:#e13838;
    font-weight: bold;
    border: 2px solid #a4a0a3;
    font-size: 16px;
    cursor: pointer;
    transition: 0.5s;
    padding: 5px 50px; 
  }
  
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }
  

  #msg{
        background-position: 0 -250;
        background-size:cover;
        height: 500px;
        display:flex;
        justify-content:flex-start;
        align-items: center;
        
        }
    #msg h1 {
        color: #333;
        text-align: center;
        font-size: 60px;
        padding: 150px 0px;
    }    
</style>