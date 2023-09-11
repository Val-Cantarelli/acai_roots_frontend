<template>
    <div class="message-container">
        <p>{{ msg }}</p>
    </div>

</template>

<script>
export default {
    name: "Message",
    props: {
        msg: String
    }

}
</script>

<style scoped>
.message-container {
    color:rgb(248, 248, 253);
    background-color: tomato;
    border: 2px solid #868680;
    border-radius: 10px;
    margin: 30px auto;
    padding: 10px;
    max-width: 400px;


}
</style>