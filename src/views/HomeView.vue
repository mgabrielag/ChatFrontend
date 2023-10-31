
<template>
  <main>
    <h1>Escolha uma sala para conversar online:</h1>
    <button @click="acessarSala('Backend')">Desenvolvimento Backend</button>
    <button @click="acessarSala('Frontend')">Desenvolvimento Frontend</button>
    <button @click="acessarSala('Mobile')">Mobile</button>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import signalR from '@microsoft/signalr'

export default defineComponent({
  name: "HomeView",
  methods: {
    acessarSala(tema : string) {
      this.$router.push(`chat/${tema}`)
    }
  }
})
</script>

<style scoped>
h1 {
  color: white;
}

main {
  align-items: center;
  display: flex;
  flex-direction: column;
}

button {
  background-color: rgba(255, 255, 255, 0.473);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bolder;
  height: 4rem;
  margin-bottom: 1rem;
  width: 40%;
}
</style>
