import React, { useState } from "react";
import { Container, Navbar, Form } from "react-bootstrap";

const SettingsHeader = () => {
    const [cluster, setCluster] = useState("live");
    const [flow, setFlow] = useState("browser");

    const clusterChange = (event) => {
        setCluster(event.target.value);
    }

    const flowChange = (event) => {
        setFlow(event.target.value);
    }

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand>Mindtastic</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Form className="d-flex">
                        <Form.Group className="me-2">
                            <Form.Label>
                                Cluster
                            </Form.Label>
                            <Form.Select value={cluster} onChange={clusterChange}>
                                <option value="dev">DEV</option>
                                <option value="stage">STAGE</option>
                                <option value="live">LIVE</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Flow
                            </Form.Label>
                            <Form.Select value={flow} onChange={flowChange}>
                                <option value="browser">Browser</option>
                                <option value="api">API</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SettingsHeader;