import React from "react";
import { Badge } from "react-bootstrap";

const FlowData = (props) => {
    const style = {
        lineBreak: "anywhere"
    }

    return (
        <div className="mt-2">
            {props.data.map((item, index) => {
                if (item.value) {
                    return (
                        <div key={index}>
                            <Badge bg="success">{item.name}</Badge>
                            <p className="d-block" style={style}>{item.value}</p>
                        </div>
                    )
                }
            }
            )}
        </div>
    );
}

export default FlowData;