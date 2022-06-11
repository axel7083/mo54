import {Button, Table, Form} from "react-bootstrap";
import React from "react";
import {Piece} from "../../../models/Piece";
import './option-table.css';
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {add, CartItem, remove, selectCart, update} from "../../../store/features/cart/cartSlice";
import QuantityEditor from "./QuantityEditor";



export const PiecesTable = ({pieces}: {pieces: Piece[]}) => {

    return (
        <Table striped bordered hover >
            <thead>
            <tr>
                <th>Piece Name</th>
                <th>Price</th>
                <th>Available</th>
                <th className={"option-table"}></th>
            </tr>
            </thead>
            <tbody>
            {pieces.map((piece, index) => {
                return (
                    <tr key={index}>
                        <td>{piece.name}</td>
                        <td>{piece.price} euros</td>
                        <td>{piece.available}</td>
                        <td align={"center"} className={"option-table"}>
                            <QuantityEditor pieceId={piece.uuid}/>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}