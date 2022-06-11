import {Button, Table} from "react-bootstrap";
import React from "react";
import {Piece} from "../../../models/Piece";

export const PiecesTable = ({pieces}: {pieces: Piece[]}) => {

    return (
        <Table striped bordered hover >
            <thead>
            <tr>
                <th>Piece Name</th>
                <th>Price</th>
                <th>Available</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {pieces.map((piece, index) => {
                return (
                    <tr key={index}>
                        <td>{piece.name}</td>
                        <td>{piece.price} euros</td>
                        <td>{piece.available}</td>
                        <td width={"sm"}><Button>Add to cart</Button></td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}