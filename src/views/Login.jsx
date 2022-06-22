import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";

const Login = (props) => {
    const style = {
        lineBreak: "anywhere"
    }

    const divider = {
        width: "100%",
        height: "2px",
        backgroundColor: "#1d1d1d"
    }

    const [userID, setUserID] = useState("");

    const userIDChange = (event) => {
        setUserID(event.target.value);
    }

    return (
        <div className="my-4 d-flex flex-column">
            <Button>
                Initialize Login
            </Button>
            <div style={divider} className="my-4"></div>
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="User ID" value={userID} onChange={userIDChange} disabled={!props.submit}></Form.Control>
                </Form.Group>
            </Form>
            <Button className="mt-2" disabled={!props.submit}>
                Submit Login
            </Button>
        </div>
    );
}

export default Login;