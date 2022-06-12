import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../store/hooks";
import {Filters, selectPiecesFiltered} from "../../../store/features/pieces/piecesSlice";
import {Container, Row, Col, Pagination} from "react-bootstrap";
import {FiltersComponent} from "./FiltersComponent";
import {PiecesTable} from "./PiecesTable";
import {useSearchParams } from "react-router-dom";


const Pieces = () => {
    const [filters, setFilters] = useState<Filters>({page: 0, elementPerPage: 10});
    const pieces = useAppSelector((state => selectPiecesFiltered(state, filters)));



    return (
        <Container className={"mt-4"}>
            <Row>
                <Col>
                    <h1>Pieces</h1>
                </Col>
            </Row>
            <FiltersComponent filters={filters} setFilters={setFilters}/>
            <PiecesTable pieces={pieces}/>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Pagination>
                        {
                            (filters.page !== 0)?(
                                <>
                                    <Pagination.First onClick={(e) => {
                                        setFilters(prevState => {
                                            return {...prevState, page: 0};
                                        });
                                    }}/>
                                    <Pagination.Prev onClick={(e) => {
                                        setFilters(prevState => {
                                            return {...prevState, page: prevState.page - 1};
                                        })
                                    }} />
                                </>
                            ):(<></>)
                        }
                        <Pagination.Item>{filters.page}</Pagination.Item>

                        {
                            (pieces.length < filters.elementPerPage)?(<></>):(
                                <>
                                    <Pagination.Next onClick={(e) => {
                                        setFilters(prevState => {
                                            return {...prevState, page: prevState.page + 1};
                                        })
                                    }}/>
                                </>
                            )
                        }
                    </Pagination>
                </Col>
            </Row>

        </Container>
    )
}

export default Pieces;