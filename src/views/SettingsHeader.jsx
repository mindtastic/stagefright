import React, { useState } from "react";
import { Container, Navbar, Form, Alert, Badge } from "react-bootstrap";

const SettingsHeader = (props) => {

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand>Mindtastic <Badge className="logo-badge">Stagefright 2.0</Badge></Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Form className="d-flex">
                        <Alert className="my-0 me-4" variant={props.session ? "danger" : "success"}>{props.session ? "Active session" : "No active session"}</Alert>
                        <Form.Group className="me-2">
                            <Form.Label className="mb-0">
                                Cluster
                            </Form.Label>
                            <Form.Select value={props.clusterState} onChange={(event) => props.clusterHandler(event)}>
                                <option value="dev">DEV</option>
                                <option value="stage">STAGE</option>
                                <option value="live">LIVE</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mb-0">
                                Flow
                            </Form.Label>
                            <Form.Select value={props.flowState} onChange={(event) => props.flowHandler(event)}>
                                <option value="browser">Browser</option>
                                <option value="api" disabled>API</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SettingsHeader;