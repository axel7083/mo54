import {useEffect, useState} from "react";
import WaitComponent from "./WaitComponent";
import {Col, Container, Row} from "react-bootstrap";

const FakeConfirmPage = () => {
    const [loading, setLoading] = useState<boolean>(true);

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
            <Row>
                <Col>
                    You order has been confirmed!
                </Col>
            </Row>
        </Container>
    );
}

export default FakeConfirmPage;