import React from 'react';
import {Container, Row, Col, Card, Button} from "react-bootstrap";
import {useAppSelector} from "../../store/hooks";
import {selectVehicles} from "../../store/features/vehicles/vehiclesSlice";
import {useNavigate} from "react-router-dom";

const Vehicles = () => {

    const vehicles = useAppSelector(selectVehicles);
    const navigate = useNavigate();

    return (
        <Container>
            <h3 className={"mt-4"}>Vehicles lists</h3>
            <Container>
                <Row xs={2} md={4}>
                    {vehicles.map((vehicle, index) => {
                        return (
                            <Col key={index}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{vehicle.name}</Card.Title>
                                        <Card.Text>
                                            Put some content here to make it look like something interesting
                                        </Card.Text>
                                        <Button variant="primary" onClick={(e) => {
                                            navigate({
                                                pathname: '/pieces',
                                                search: `?vehicle=${vehicle.uuid}`,
                                            });
                                        }}>See vehicle's pieces</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </Container>
    )
}

export default Vehicles;