import { Button, Form } from "react-bootstrap";
import React from "react";

const Login = (props) => {
    const style = {
        lineBreak: "anywhere"
    }

    const divider = {
        width: "100%",
        height: "1px",
        backgroundColor: "#d1d1d1"
    }

    return (
        <div className="my-4 d-flex flex-column">
            <Button onClick={() => props.initHandler()}>
                Initialize Login
            </Button>
            <div style={divider} className="my-4"></div>
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="AccountKey" value={props.accountKey} onChange={(event) => props.accountKeyHandler(event)} disabled={!props.form}></Form.Control>
                </Form.Group>
            </Form>
            <Button className="mt-2" onClick={() => props.submitHandler()} disabled={!props.submit}>
                Submit Login
            </Button>
        </div>
    );
}

export default Login;