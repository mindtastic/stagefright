import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hub = ({ activeSession }) => {
    const modes = [
        {
            name: "Registration",
            path: "/registration",
            requiresSession: false
        },
        {
            name: "Login",
            path: "/login",
            requiresSession: false
        },
        {
            name: "Logout",
            path: "/logout",
            requiresSession: true
        }
    ]

    return (
        <Container fluid="lg">
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="d-flex align-items-center flex-column">
                    <h1 className="my-4">Mindtastic Stagefright&trade;</h1>
                    {modes.map((item, index) =>
                        <Link to={item.path} className={"my-4 " + ((item.requiresSession ? !activeSession : activeSession) ? "disabled-link" : "")} style={{ width: "80%" }} key={index}>
                            <Button style={{ width: "100%" }} disabled={item.requiresSession ? !activeSession : activeSession}>
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