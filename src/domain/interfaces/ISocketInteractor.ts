export interface ISocketInteractor {
  connect(onConnectionSucceeded: any): void;
  
  emit(eventName: string): any;

  on(eventName: string, onSendMessage: any): any;
}