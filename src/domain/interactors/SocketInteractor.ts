import { io, Socket } from 'socket.io-client';
import { getServerUrl } from '../../serverUrlService';
import { ISocketInteractor } from './../interfaces/ISocketInteractor';
export class SocketInteractor implements ISocketInteractor {
    private socket!: Socket;
    
    connect(onConnectionSucceeded: any): void {
        this.socket = io(getServerUrl());
        this.socket.on("connect", onConnectionSucceeded)
    }
    
    emit(eventName: string) {
        this.socket.emit(eventName);
    }

    on(eventName: string, onSendMessage: any) {
        this.socket.off(eventName);
        this.socket.on(eventName, onSendMessage);
    }

    static new(): ISocketInteractor {
        return new SocketInteractor();
    }
}