import {Card, Container, Spinner} from "react-bootstrap";

export const centering = {display: "flex", alignItems: "center", justifyContent: "center"}

const WaitComponent = ({title, description}: {title: string, description: string}) => {
    return (
        <Container style={centering} className={"mt-4"}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <div style={centering}><Spinner animation="grow" /></div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default WaitComponent;