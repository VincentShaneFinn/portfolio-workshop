import { io, Socket } from 'socket.io-client';
import { getServerUrl } from '../../serverUrlService';
import { ISocketInteractor } from './../interfaces/ISocketInteractor';
export class SocketInteractor implements ISocketInteractor {
    public constructor() {
        this.on = this.on.bind(this);
    }
    
    private socket!: Socket;
    
    connect(onConnectionSucceeded: any): void {
        this.socket = io(getServerUrl());
        this.socket.on("connect", onConnectionSucceeded);
    }

    disconnect(): void {
        this.socket.disconnect();
    }
    
    emit(eventName: string) {
        this.socket.emit(eventName);
    }

    on(eventName: string, onSendMessage: any) {
        this.socket.on(eventName, onSendMessage);
    }
}