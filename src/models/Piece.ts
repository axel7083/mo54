import {v4} from "uuid";

class Piece {
    name: string;
    uuid: string;
    price: number;
    available: number;

    compatibilities: string[];

    constructor(name: string, price: number, compatibilities: string[], available: number, uuid: string = v4(), ) {
        this.name = name;
        this.price = price;
        this.available = available;
        this.compatibilities = compatibilities;

        this.uuid = uuid;
    }
}

export { Piece };