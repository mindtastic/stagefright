import { Button, Badge } from "react-bootstrap";
import React from "react";

const Registration = (props) => {
    const style = {
        lineBreak: "anywhere"
    }

    return (
        <div className="my-4 d-flex flex-column">
            <Button onClick={() => props.initHandler()}>
                Initialize Registration
            </Button>
            <Button className="mt-2" onClick={() => props.submitHandler()} disabled={!props.submit}>
                Submit Registration
            </Button>
        </div>
    );
}

export default Registration;