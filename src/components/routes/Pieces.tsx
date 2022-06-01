import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../store/hooks";
import {selectPieces} from "../../store/features/pieces/piecesSlice";
import {Container, Table, Row, Col, Form} from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select'
import {selectVehicles} from "../../store/features/vehicles/vehiclesSlice";

const Pieces = () => {
    const [searchParams] = useSearchParams();
    const pieces = useAppSelector(selectPieces);
    const vehicles = useAppSelector(selectVehicles);

    const [vehiclesSelected, setVehiclesSelected] = useState<string[]>([]);

    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);

    return (
        <Container className={"mt-4"}>
            <Row>
                <Col>
                    <h1>List of all the pieces</h1>
                </Col>
            </Row>
            {searchParams.get("vehicle")?<></>:(
                <>

                    <Row>
                        <Col>
                            <h2>Filters</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <h4>Minimum price</h4>
                                <Form.Control value={minPrice} onChange={(e) => {
                                    setMinPrice(Number(e.target.value));
                                }} type="number" placeholder="minimum price" />
                            </Form>
                        </Col>
                        <Col>
                            <Form>
                                <h4>Maximum price</h4>
                                <Form.Control value={maxPrice} onChange={(e) => {
                                    setMaxPrice(Number(e.target.value));
                                }} type="number" placeholder="minimum price" />
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4>Sort by vehicles</h4>
                        </Col>
                    </Row>
                    <Row className={"mb-4"}>
                        <Col>
                            <Select options={vehicles.map((vehicle, index) => {
                                return { value: vehicle.uuid, label: vehicle.name }
                            })}
                                    onChange={(e) => {
                                        setVehiclesSelected(e.map((option) => {
                                            return option.value;
                                        }));
                                    }}
                                    isMulti
                                    name="vehicles"
                                    className="basic-multi-select"
                                    classNamePrefix="select"/>
                        </Col>
                    </Row>
                </>
            )}
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

                            if(piece.price < minPrice)
                                return undefined;

                            if(maxPrice !== 0 && piece.price > maxPrice)
                                return undefined;


                            if(searchParams.get("vehicle") && !piece.compatibilities.includes(searchParams.get("vehicle")!))
                                return undefined;

                            if(vehiclesSelected.length > 0) {
                                for (let i = 0; i < vehiclesSelected.length; i++) {
                                    if(piece.compatibilities.includes(vehiclesSelected[i])) {
                                        return (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{piece.name}</td>
                                                <td>{piece.price} euros</td>
                                                <td>??</td>
                                            </tr>
                                        )
                                    }
                                }
                                return undefined;
                            }
                            else {
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{piece.name}</td>
                                        <td>{piece.price} euros</td>
                                        <td>??</td>
                                    </tr>
                                )
                            }
                        })}
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </Container>
    )
}

export default Pieces;