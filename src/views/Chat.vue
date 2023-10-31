<template>
  <div class="form-autor" v-if="!DefiniuNome">
    <input class="form-autor--input" placeholder="Digite seu nome ..." v-model="Autor" type="text" name="NomeAutor"
      id="NomeAutor">
    <button class="form-autor--button" @click="iniciar()">OK</button>
  </div>
  <div v-else>
    <div class="chat">
      <div v-for="mensagem in Mensagens" class="mensagens">
        <Mensagem v-if="mensagem.autor == Autor" class="interna" :Autor="mensagem.autor" :Data="mensagem.horaTexto">{{
          mensagem.texto }}
        </Mensagem>
        <Mensagem v-else :Autor="mensagem.autor" :Data="mensagem.horaTexto">{{ mensagem.texto }}
        </Mensagem>
      </div>
      <div class="form">
        <div class="form-input">
          <span class="erro">{{ Erro }}</span>
          <input autocomplete="off" v-model="MensagemParaEnviar" required type="text" class="input-mensagem" name="input-mensagem"
          id="inputMensagem">
        </div>
        <button @click="enviarMensagem()" class="button-enviar">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Mensagem from '@/components/Mensagem.vue';
import MensagemExterna from '@/components/MensagemExterna.vue'
import type { IMensagem } from '@/interfaces/IMensagem'
import { LogLevel, HubConnection, HubConnectionBuilder } from '@microsoft/signalr'

export default defineComponent({
  name: "Chat",
  components: {
    Mensagem,
    MensagemExterna
  },
  data() {
    return {
      signalRCliente: {} as HubConnection,
      Mensagens: [] as IMensagem[],
      MensagemParaEnviar: '',
      DefiniuNome: false as boolean,
      Autor: '' as string,
      Erro: '' as string
    }
  },
  async mounted() {
    this.DefiniuNome = false
    this.signalRCliente = new HubConnectionBuilder()
      .withUrl("https://localhost:7048/chathub")
      .configureLogging(LogLevel.Information)
      .build();
    try {
      await this.signalRCliente.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.log(err);
    }
    this.signalRCliente.on("MensagemRecebida", (mensagem: IMensagem) => {
      mensagem.horaTexto == 'xxx'
      console.log(mensagem)
      this.Mensagens.push(mensagem)
    })

  },
  unmounted() {
    this.signalRCliente.stop()
    console.log("Desconected.")
  },
  methods: {
    iniciar() {
      if (this.Autor == '')
        this.Autor = `SemNome${Date.now()}`
      console.log(this.Autor)
      this.DefiniuNome = true
      return this.signalRCliente.invoke("AcessarChat", this.$route.params.tema);
    },
    enviarMensagem() {
      this.MensagemParaEnviar = this.MensagemParaEnviar.trim()
      if (this.MensagemParaEnviar.length === 0) {
        this.Erro = "Não pode ser vazio."
        setTimeout(() => {
          this.Erro = ""
        }, 5000);
      }
      else {
        this.signalRCliente.invoke("EnviaMensagem", {
          Autor: this.Autor,
          Hora: new Date(Date.now()),
          Tema: this.$route.params.tema.toString(),
          Texto: this.MensagemParaEnviar,
          HoraTexto: ''
        })
        this.MensagemParaEnviar = ''
      }
    }
  }
}
)
</script>

<style>
.form {
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;

}

.input-mensagem {
  line-height: 1.5rem;
  width: 100%;
}

.button-enviar {
  width: 20%;
  margin: 0 20px;
}

.mensagens {
  display: flex;
  flex-direction: column;
}

.interna {
  align-self: flex-end;
  margin-right: 2rem;
}

.form-autor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.form-autor--input,
.form-autor--button {
  width: 20%;
  margin-bottom: 0.5rem;
  height: 2rem;
  border-radius: 10px;
}
.form-input {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.erro {
  color: white;
}
</style>

