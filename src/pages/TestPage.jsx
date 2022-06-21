import React from "react";
import DisplayRequest from "../views/DisplayRequest";
import { Container, Row, Col } from "react-bootstrap";

const TestPage = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <DisplayRequest></DisplayRequest>
                </Col>
            </Row>
        </Container>
    );
}

export default TestPage;