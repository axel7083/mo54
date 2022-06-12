import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {add, CartItem, remove, selectCart, update} from "../../../store/features/cart/cartSlice";
import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import {MdDelete} from "react-icons/md";

export const getCartCount = (cart: CartItem[], pieceId: string): number => {
    for (let i = 0; i < cart.length; i++) {
        if(cart[i].pieceId === pieceId)
            return cart[i].quantity;
    }
    return -1;
}

const QuantityEditor = ({pieceId}: {pieceId: string}) => {
    const cart = useAppSelector(selectCart);
    const dispatch = useAppDispatch();

    const isInsideCart = (pieceId: string): boolean => {
        for (let i = 0; i < cart.length; i++) {
            if(cart[i].pieceId === pieceId)
                return true;
        }
        return false;
    }

    const updateCartItem = (pieceId: string, value: number) => {
        if(value < 1) {
            dispatch(remove(pieceId));
        }
        else {
            dispatch(update({
                pieceId: pieceId,
                quantity: value
            }));
        }

    }

    const addToCart = (pieceId: string) => {
        dispatch(add({
            pieceId: pieceId,
            quantity: 1
        }));
    }

    if(isInsideCart(pieceId))
        return (
            <Col style={{display: "flex"}}>
                <Form.Control type="number" value={getCartCount(cart, pieceId)} placeholder="Large text" onChange={(e) => {
                    updateCartItem(pieceId, Number(e.target.value));
                }}/>
                <Button style={{marginLeft: "0.5rem"}} variant={"danger"} onClick={(e) => updateCartItem(pieceId, 0)}><MdDelete/></Button>
            </Col>
        )

    return (
        <Button variant={"info"} onClick={(e) => addToCart(pieceId)}>Add to cart</Button>
    )
}

export default QuantityEditor;