import {Filters} from "../../../store/features/pieces/piecesSlice";
import {useAppSelector} from "../../../store/hooks";
import {selectVehicles} from "../../../store/features/vehicles/vehiclesSlice";
import {Col, Form, Row} from "react-bootstrap";
import Select from "react-select";
import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export const FiltersComponent = ({filters, setFilters}: {filters: Filters, setFilters: (d: (prevState: Filters) => Filters) => void}): JSX.Element => {
    const vehicles = useAppSelector(selectVehicles);

    const [searchParams, setSearchParams] = useSearchParams ();

    useEffect(() => {
        if(searchParams.has("vehicle")) {
            setFilters(prevState => {
                return {...prevState, vehicle: searchParams.get("vehicle")!, page: 0};
            })
        }
    }, [searchParams])

    const findSelectValue = () => {
        if(searchParams.has("vehicle")) {
            const vehicleId = searchParams.get("vehicle");
            const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
            if(vehicle === undefined)
                return undefined; //Something went wrong
            return {value: vehicle.id, label: vehicle.name};
        }

        return undefined;
    }

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Search by name</Form.Label>
                    <Form.Control
                        placeholder="type here"
                        onChange={(e) => {
                            setFilters((prevState) => {
                                return {...prevState, search: e.target.value, page: 0};
                            });
                        }}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Minimum price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={filters.priceMin}
                        onChange={(e) => {
                            setFilters((prevState) => {
                                return {...prevState, priceMin: (e.target.value)?Number(e.target.value):undefined, page: 0};
                            });
                        }} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Maximum price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={filters.priceMax}
                        onChange={(e) => {
                            setFilters((prevState) => {
                                return {...prevState, priceMax: (e.target.value)?Number(e.target.value):undefined, page: 0};
                            });
                        }} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Select vehicle</Form.Label>
                    <Select options={vehicles.map((vehicle) => {
                        return {value: vehicle.id, label: vehicle.name}
                    })}
                            onChange={(e) => {
                                if(e !== null)
                                    setSearchParams({
                                        'vehicle': e?.value
                                    });
                                else
                                    setSearchParams({});
                            }}
                            isClearable={true}
                            isMulti={false}
                            value={findSelectValue()}
                            name="vehicles"
                            classNamePrefix="select"/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group  as={Col} className="mb-3" id="formGridCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Only show availables"
                        onChange={(e) => {
                            setFilters((prevState) => {
                                return {...prevState, available: e.target.checked, page: 0};
                            });
                        }}
                    />
                </Form.Group>
            </Row>
        </Form>
    )
}