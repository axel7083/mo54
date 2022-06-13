import {useEffect, useState} from "react";
import WaitComponent, {centering} from "./WaitComponent";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const FakeConfirmPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) {
            setTimeout(() => {
                setLoading(false);
            }, 4000);
        }
    }, [loading]);

    if(loading)
        return (
            <WaitComponent title={"Information"} description={"Please wait while we are contacting your bank."}/>
        )

    return (
        <Container className={"mt-4"}>
            <Row >
                <Col style={centering}>
                    You order has been confirmed!
                </Col>
            </Row>
            <Row >
                <Col style={centering}>
                    <Button onClick={(e) => {
                        navigate("/vehicles");
                    }}>Return to vehicles</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default FakeConfirmPage;