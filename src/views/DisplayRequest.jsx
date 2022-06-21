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
                {(Object.keys(props.request)).map((key, index) =>
                    <p><span style={{ fontWeight: "700" }}>{key}: </span>{(typeof props.request[key] === "object" ? JSON.stringify(props.request[key]) : props.request[key])}</p>
                )}
            </div>
        </div>
    );
}

export default DisplayRequest;