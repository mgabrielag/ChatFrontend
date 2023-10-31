import signalR, {HubConnectionBuilder, HubConnection} from '@microsoft/signalr'
import type { IMensagem } from './interfaces/IMensagem';

export class SignalR {
    connection: HubConnection

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7048/chathub")
        .configureLogging(signalR.LogLevel.Information)
        .build();
    }

    public async Iniciar() {
        try {
            await this.connection.start();
            console.log("SignalR Connected.");
        } catch (err) {
            console.log(err);
            setTimeout(this.Iniciar, 5000);
        }
    }

    public async AcessarChat(tema : string) : Promise<boolean> {
        return this.connection.invoke("AcessarChat", tema);        
    }

    public async EnviaMensagem(mensagem : IMensagem) {
        this.connection.invoke("EnviaMensagem", mensagem)
    }
}