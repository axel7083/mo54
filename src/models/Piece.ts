import {v4} from "uuid";

class Piece {
    name: string;
    uuid: string;
    price: number;

    compatibilities: string[];

    constructor(name: string, price: number, compatibilities: string[], uuid: string = v4(), ) {
        this.name = name;
        this.price = price;
        this.compatibilities = compatibilities;

        this.uuid = uuid;
    }
}

export { Piece };