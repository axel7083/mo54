import {Table} from "react-bootstrap";
import React from "react";
import {Piece} from "../../../models/Piece";

export const PiecesTable = ({pieces}: {pieces: Piece[]}) => {

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Piece Name</th>
                <th>Price</th>
                <th>Available</th>
            </tr>
            </thead>
            <tbody>
            {pieces.map((piece, index) => {
                return (
                    <tr key={index}>
                        <td>{piece.name}</td>
                        <td>{piece.price} euros</td>
                        <td>{piece.available}</td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}