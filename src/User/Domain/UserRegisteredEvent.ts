import { StringFormatParams } from "zod/v4/core";

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