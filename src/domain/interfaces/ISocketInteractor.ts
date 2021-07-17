export interface ISocketInteractor {
  connect(onConnectionSucceeded: any): void;

  disconnect(): void;
  
  emit(eventName: string): any;

  on(eventName: string, onSendMessage: any): any;
}