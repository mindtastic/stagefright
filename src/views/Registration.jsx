import { Button } from "react-bootstrap";
import React from "react";

const Registration = (props) => {

    return (
        <div className="my-4 d-flex flex-column align-items-start">
            <Button onClick={() => props.initHandler()}>
                Initialize Registration
            </Button>
            <Button className="mt-2">
                Submit Registration
            </Button>
        </div>
    );
}

export default Registration;