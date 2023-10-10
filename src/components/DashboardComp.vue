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
      <div class="acai-table-row" v-for="order in orders" :key="order.objectId" >
        <div class="order-number">{{ order.objectId }}</div>
        <div> {{ order.name }} </div>
        <div>{{ order.size }}</div>
        <div>{{ order.typeofcup }}</div>

        <div>
          <ul v-for="(extrafruit,index) in order.extrafruits" :key="index">
            <li> {{ extrafruit }}</li>
          </ul>
        </div> 

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
          objectId: null,
          status: []
        }
    },
    methods: {
        async getOrders() {
            const req= await fetch("http://localhost:8080/orders");

            const data = await req.json();
            this.orders= data;

            //TAREFA: Resgatar status do backend
            this.getStatus();
        },
        async getStatus() {
            const req= await fetch("http://localhost:8080/status");
            const data = await req.json(); 
            this.status = data;
        },
        async deleteCup(objectId) {
            const req=await fetch(`http://localhost:8080/orders/${objectId}`,{
                method: "DELETE"
            });
            const res= await req.json();
            this.getOrders();
        },
        async updateCup(event,objectId) {
          const option = event.target.value;
          const dataJson= JSON.stringify({status:option});
          const req = await fetch(`http://localhost:8080/orders/${objectId}`, {
            method: "PATCH",
            headers: { "content-Type": "application/json" },
            mode: "cors",
            body: dataJson
          });
          const res = await req.json();
          
          this.msg=`Pedido N ${res.objectId} foi atualizado para ${res.status}!`;
          setTimeout(()=> this.msg = "", 3000);
        }


    },
    mounted() {
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