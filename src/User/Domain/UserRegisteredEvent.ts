import { StringFormatParams } from "zod/v4/core";


/**
 * clase que representa el evento de usuario registrado
 * @export
 * @class UserRegisteredEvent
 * @typedef {UserRegisteredEvent}
 * @property {string} userId - id del usuario registrado
 * @property {string} email - email del usuario registrado
 * @property {string} name - nombre del usuario registrado
 */
export class UserRegisteredEvent {
    public readonly ocurredOn: Date;

    constructor(
        public readonly userId: string,
        public readonly email: string,
        public readonly name: string
    ){
        this.ocurredOn = new Date();
    }
}