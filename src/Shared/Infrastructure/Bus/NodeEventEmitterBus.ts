import { EventEmitter } from "events";
import { EventBus } from "./EventBus";

export class NodeEventEmitterBus implements EventBus {
    private emitter = new EventEmitter();
    async publish(event: any): Promise<void> {
        this.emitter.emit(event.constructor.name, event);
    }
    subscribe(eventName: string, handler: (event: any) => void): void {
        this.emitter.on(eventName, handler);
    }

}