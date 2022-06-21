import React from "react";

const DisplayRequest = (props) => {
    const style = {
        backgroundColor: "#37474F",
        minHeight: "300px",
        fontFamily: "monospace",
        color: "white",
        padding: "20px",
        borderRadius: "10px"
    }

    return (
        <div>
            <p>Request:</p>
            <div style={style}>
                {props.text}
            </div>
        </div>
    );
}

export default DisplayRequest;