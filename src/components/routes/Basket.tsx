import {Button, Card, Col, Container, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectCart} from "../../store/features/cart/cartSlice";
import {selectPieces, selectPiecesByIds} from "../../store/features/pieces/piecesSlice";
import {useNavigate} from "react-router-dom";
import QuantityEditor, {getCartCount} from "./pieces/QuantityEditor";
import {Piece} from "../../models/Piece";
import {FormEvent, useState} from "react";

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const BasketRecommendation = () => {

    const cart = useAppSelector(selectCart).map((item) => item.pieceId);
    const pieces = useAppSelector(selectPieces).filter((piece) => !cart.includes(piece.uuid));

    const getRandomPieces = (count: number) => {
        const selected = []
        for (let i = 0; i < count; i++) {
            selected.push(pieces[getRandomInt(pieces.length - 1)]);
        }
        return selected;
    }

    // If not enough item are present
    if(pieces.length < 5)
        return <></>;

    return (
        <Container>
            <Row className={"mb-4 mt-4"}>
                <Col>
                    <h3>
                        Those items are usually bought with some item(s) you selected.
                    </h3>
                </Col>
            </Row>
            <Row>
                {getRandomPieces(5).map((piece, index) => {
                    return (
                        <Col key={index}>
                            <Card style={{height: "12rem"}}>
                                <Card.Body>
                                    <Card.Title>
                                        {piece.name}
                                    </Card.Title>
                                    <Card.Text>{piece.price} €</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <QuantityEditor pieceId={piece.uuid}/>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

const BasketList = ({pieces}: {pieces: Piece[]}) => {
    return (
        <Card className={"p-4"}>
            <Card.Body>
                <Card.Title className={"mb-4"}>
                    My cart ({pieces.length} items)
                </Card.Title>
                <hr/>
                {
                    pieces.map((piece, index) => {
                        return (
                            <Row key={index} style={{display: "flex", alignItems: "center"}} className={"mt-4"}>
                                <Col>
                                    {piece.name}
                                </Col>
                                <Col md="auto">
                                    <QuantityEditor pieceId={piece.uuid}/>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Card.Body>
        </Card>
    )
}

const BasketPrice = ({price, delivery, discount}: {price: number, delivery: number, discount: boolean}) => {

    const compute = () => {
        if(discount)
            return price * 0.90 + delivery;
        return price + delivery;
    }

    const navigate = useNavigate();

    return (
        <Card className={"p-4"}>
            <Container>
                <Row>
                    <h3>Total</h3>
                </Row>
                <Row>
                    <Col>
                        Pieces
                    </Col>
                    <Col md="auto">
                        {price} €
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Delivery
                    </Col>
                    <Col md="auto">
                        {delivery} €
                    </Col>
                </Row>
                {discount?(<>
                    <hr/>
                    <Row>
                        <Col>
                            <b>
                                Reduction
                            </b>
                        </Col>
                        <Col md="auto">
                            <b>
                                10 %
                            </b>
                        </Col>
                    </Row>
                </>):(<></>)}
                <hr/>
                <Row>
                    <Col>
                        Total with TVA
                    </Col>
                    <Col md="auto">
                        {compute().toFixed(2)} €
                    </Col>
                </Row>
                <Row className={"mt-4"}>
                    <Button variant={"success"} onClick={(e) => {
                        navigate("/payment")
                    }}>Order</Button>
                </Row>
            </Container>
        </Card>
    )
}

const BasketCode = ({setApplyDiscount}: {setApplyDiscount: (b: boolean) => void}) => {

    const [isValid, setValid] = useState<boolean | undefined>(undefined);
    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(code.length === 0)
        {
            setValid(false);
            setError("The code is too short.");
            setApplyDiscount(false);
            return;
        }

        setValid(undefined);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if(code === "MO54") {
                setApplyDiscount(true);
                setValid(true);
            }
            else {
                setApplyDiscount(false);
                setError("The code is not valid");
            }


        }, 1500);
    };

    return (
        <Card className={"p-4"}>
            <Container>
                <Row>
                    <h3>Discount code</h3>
                </Row>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId={"code"}>
                            <Row>
                                <InputGroup className="mb-3">
                                    <Form.Control disabled={loading} isValid={isValid} isInvalid={(isValid !== undefined)?!isValid:undefined} value={code} onChange={(e) => setCode(e.target.value)}/>
                                    <Button disabled={loading} type="submit" variant="outline-secondary" onClick={(e) => {
                                    }}>
                                        {loading?(<Spinner size={"sm"} animation="grow" />):<>Use</>}
                                    </Button>
                                </InputGroup>
                            </Row>
                            {isValid === false?(<Row><Col>{error}</Col></Row>):(<></>)}
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        </Card>
    )
}

const Basket = () => {
    const cart = useAppSelector(selectCart);
    const pieces = useAppSelector((state => selectPiecesByIds(state, cart.map((item) => item.pieceId))));
    const navigate = useNavigate();

    const [applyDiscount, setApplyDiscount] = useState<boolean>(false);

    const computeTotal = () => {
        let total = 0;

        for (let i = 0; i < pieces.length; i++)
            total += getCartCount(cart, pieces[i].uuid) * pieces[i].price;

        return total;
    }

    if(cart.length === 0)
        return (
            <Container>
                <Card className={"mt-4"}>
                    <Card.Body>
                        <Card.Title>Information</Card.Title>
                        <Card.Text>You do no have any items in the cart</Card.Text>
                    </Card.Body>
                    <Card.Footer><Button onClick={(e) => {
                        navigate("/pieces");
                    }}>Click here to explore pieces</Button></Card.Footer>
                </Card>
            </Container>
        )

    return (
        <Container>
            <Row className={"mt-4"}>
                <Col>
                    <BasketList pieces={pieces}/>
                </Col>
                <Col md="auto">
                    <Row>
                        <BasketPrice delivery={10} discount={applyDiscount} price={computeTotal()}/>
                    </Row>
                    <Row className={"mt-4"}>
                        <BasketCode setApplyDiscount={setApplyDiscount}/>
                    </Row>
                </Col>
            </Row>
            <Row className={"mt-4 mb-4"}>
                <BasketRecommendation/>
            </Row>
        </Container>
    )
}

export default Basket;