import React, {useState} from 'react';
import {useAppSelector} from "../../store/hooks";
import {selectPieces, selectPiecesFiltered} from "../../store/features/pieces/piecesSlice";
import {Container, Table, Row, Col, Form} from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select'
import {selectVehicles} from "../../store/features/vehicles/vehiclesSlice";


const FiltersComponent = (): JSX.Element => {

    const vehicles = useAppSelector(selectVehicles);

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Search by name</Form.Label>
                <Form.Control placeholder="type here" />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Select vehicle</Form.Label>
                    <Select options={vehicles.map((vehicle, index) => {
                        return {value: vehicle.id, label: vehicle.name}
                    })}
                            onChange={(e) => {
                                console.log(e);
                            }}
                            isMulti={false}
                            name="vehicles"
                            classNamePrefix="select"/>
                </Form.Group>


            </Row>
        </Form>
    )
}


const Pieces = () => {
    const pieces = useAppSelector((state => selectPiecesFiltered(state, {})));

    return (
        <Container className={"mt-4"}>
            <Row>
                <Col>
                    <h1>Pieces</h1>
                </Col>
            </Row>
            <FiltersComponent/>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Piece Name</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pieces.map((piece, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{piece.name}</td>
                                    <td>{piece.price} euros</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </Container>
    )
}

export default Pieces;