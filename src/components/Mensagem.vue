<template>
<div class="mensagem">
    <div class="autor"><span>{{ Autor }}</span></div>
    <div class="texto"><slot></slot></div>
    <div class="horario">{{ Data }}</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Mensagem",
    props: {
        Autor: String,
        Data: String
    }
})

</script>

<style scoped>
.mensagem {
    border: 1px solid white;
    border-radius: 10px;
    width: 35%;
    padding: 3px 15px;
    color: white;
    margin-bottom: 0.6rem;
}

.autor {
    font-weight: bold;
}

.texto {
    margin: 7px 0;
}

.horario {
    text-align: end;
}
</style>