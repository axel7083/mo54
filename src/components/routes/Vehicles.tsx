import React from 'react';
import {Container, Row, Col, Card} from "react-bootstrap";
import {useAppSelector} from "../../store/hooks";
import {selectVehicles} from "../../store/features/vehicles/vehiclesSlice";
import {useNavigate} from "react-router-dom";
import { IVehicle } from "../../models/Vehicle";

const Vehicle = ({vehicle}: {vehicle: IVehicle}) => {

    const navigate = useNavigate();
    return (
        <Card style={{ width: '8rem', height: '8rem'}} className={"align-items-center"} onClick={(e) => {
            e.preventDefault();
            navigate({
                pathname: '/pieces',
                search: `?vehicle=${vehicle.id}`,
            });
        }}>
            <a href="#">
                <div style={{ width: '100%', height: '4rem', textAlign: "center", marginTop: "1rem"}}>
                    <Card.Img style={{ width: '4rem'}} variant="top" src={vehicle.imageUrl} />
                </div>
                <Card.Body>
                    <Card.Text>{vehicle.name}</Card.Text>
                </Card.Body>
            </a>
        </Card>
    )
}



const Vehicles = () => {

    const vehicles = useAppSelector(selectVehicles);

    return (
        <Container>
            <h3 className={"mt-4"}>Vehicles lists</h3>
            <Container>
                <Row md={8}>
                    {vehicles.map((vehicle, index) => {
                        return (
                            <Col key={index} className={"mt-4 mx-1"}>
                                <Vehicle vehicle={vehicle}/>
                            </Col>
                            )
                    })}
                </Row>
            </Container>
        </Container>
    )
}

export default Vehicles;