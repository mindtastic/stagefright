import { Button } from "react-bootstrap";
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
                Initialize Logout
            </Button>
            <Button className="mt-2" onClick={() => props.submitHandler()} disabled={!props.submit}>
                Submit Logout
            </Button>
        </div>
    );
}

export default Login;