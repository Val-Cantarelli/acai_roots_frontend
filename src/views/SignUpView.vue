<template>
  <div class="main-container">
    <h1>Realize seu cadastro:</h1>
    <SignUpForm />
    <router-link to="/Login">Realizar login</router-link>
  </div>
  </template>
  
  <script>
  
import SignUpForm from "@/components/SignUpForm.vue";
 
  export default {
    name: "SignUpView",
    components: {
      SignUpForm
  }
  }
  
  </script>
  
  <script setup></script>
  