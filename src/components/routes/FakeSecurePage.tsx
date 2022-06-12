import Cards from 'react-credit-cards';
import {useEffect, useState} from "react";
import 'react-credit-cards/es/styles-compiled.css';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import WaitComponent, {centering} from "./WaitComponent";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/hooks";
import {reset} from "../../store/features/cart/cartSlice";

interface CardInfo {
    cvc: string,
    expiry: string,
    focus: string,
    name: string,
    number: string,
}

const FakeSecurePage = () => {

    const [cardInfo, setCardInfo] = useState<CardInfo>({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    });

    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {

        if(loading) {
            setTimeout(() => {
                setLoading(false);
            }, 4000);
        }
    }, [loading]);


    if(loading)
        return (
            <WaitComponent title={"Information"} description={"You are being redirected to a secure payment page."}/>
        )

    return (
        <Container className={"mt-4"}>
            <Row sm={"auto"} style={centering}>
                <Col>
                    <Cards
                        {...cardInfo}/>
                </Col>
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="FormcardNumber">
                            <Form.Label>Card number</Form.Label>
                            <Form.Control isInvalid={(cardInfo.number.length > 16)} type="text" placeholder="Enter card number" onChange={(e) => {
                                setCardInfo(prevState => {
                                    return  {...prevState, number: e.target.value};
                                })
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="FormName">
                            <Form.Label>Card Owner</Form.Label>
                            <Form.Control type="text" placeholder="Enter card's owner name" onChange={(e) => {
                                setCardInfo(prevState => {
                                    return  {...prevState, name: e.target.value};
                                })
                            }} />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formValidityDate">
                                <Form.Label>Validity Date</Form.Label>
                                <Form.Control isInvalid={((cardInfo.expiry.length > 4) && (!cardInfo.expiry.includes("/"))) || (cardInfo.expiry.length > 5)} type="text" placeholder="XX/XX" onChange={(e) => {
                                    setCardInfo(prevState => {
                                        return  {...prevState, expiry: e.target.value};
                                    })
                                }}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formCvc">
                                <Form.Label>CVC</Form.Label>
                                <Form.Control isInvalid={(cardInfo.cvc.length > 3)} type="text" placeholder="XXX" onChange={(e) => {
                                    setCardInfo(prevState => {
                                        return  {...prevState, cvc: e.target.value};
                                    })
                                }}/>
                            </Form.Group>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row sm={"auto"} style={centering}>
                <Col>
                    <Button variant={"danger"} onClick={(e) => {
                        navigate("/cart");
                    }}>Cancel</Button>
                </Col>
                <Col>
                    <Button variant={"success"} onClick={(e) => {
                        dispatch(reset()); // Reset the basket
                        navigate("/confirm");
                    }}>Confirm payment</Button>
                </Col>
            </Row>

        </Container>

    )
}

export default FakeSecurePage;