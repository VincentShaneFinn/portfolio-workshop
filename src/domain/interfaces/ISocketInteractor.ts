export interface ISocketInteractor {
  connect(onConnectionSucceeded: any): void;

  disconnect(): void;
  
  emit(eventName: string, data?: any): any;

  on(eventName: string, onSendMessage: any): any;
}