import {v4} from "uuid";

class Vehicle {
    name: string;
    uuid: string;

    constructor(name: string, uuid: string = v4()) {
        this.name = name;
        this.uuid = uuid;
    }
}

export default Vehicle;