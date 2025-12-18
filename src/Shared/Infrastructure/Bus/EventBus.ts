export interface EventBus {
    publish(event:any): Promise<void>;

    subscribe(eventName:string,handler: (event:any) => void): void;
}