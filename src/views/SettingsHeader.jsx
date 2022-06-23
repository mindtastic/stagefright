import React, { useState } from "react";
import { Container, Navbar, Form, Alert } from "react-bootstrap";

const SettingsHeader = (props) => {
    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand>Mindtastic</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Alert className="my-0 me-4" variant={props.session ? "danger" : "success"}>{props.session ? "Active session" : "No active session"}</Alert>
                    <Form className="d-flex">
                        <Form.Group className="me-2">
                            <Form.Label>
                                Cluster
                            </Form.Label>
                            <Form.Select value={props.clusterState} onChange={(event) => props.clusterHandler(event)}>
                                <option value="dev">DEV</option>
                                <option value="stage">STAGE</option>
                                <option value="live">LIVE</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
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