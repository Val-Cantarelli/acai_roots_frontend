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
    color:#e13838;
    background-color: #dfcbb1;
    border: 2px solid #a4a0a3;
    border-radius: 10px;
    margin: 30px auto;
    padding: 10px;
    max-width: 400px;


}
</style>