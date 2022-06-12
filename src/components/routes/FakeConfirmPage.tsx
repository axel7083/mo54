import {useEffect, useState} from "react";
import WaitComponent from "./WaitComponent";
import {Container} from "react-bootstrap";

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
        <Container>
            The order has been validated!
        </Container>
    );
}

export default FakeConfirmPage;