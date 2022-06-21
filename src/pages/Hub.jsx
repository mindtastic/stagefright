import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hub = () => {
    const modes = [
        {
            name: "Registration",
            path: "/registration"
        },
        {
            name: "Login",
            path: "/login"
        },
        {
            name: "Logout",
            path: "/logout"
        }
    ]

    return (
        <Container fluid="lg">
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="d-flex align-items-center flex-column">
                    <h1 className="my-4">Mindtastic Auth API Tester</h1>
                    {modes.map((item, index) =>
                        <Link to={item.path} className="my-4" style={{ width: "80%" }}>
                            <Button style={{ width: "100%" }}>
                                {item.name}
                            </Button>
                        </Link>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Hub;