import { v7 as uuidv7 } from "uuid";

export class IdGenerator {
    static generate():string {
        return uuidv7();
    }
}