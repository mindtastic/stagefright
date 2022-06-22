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
            <p className="mb-0 mt-2">{props.title}:</p>
            <div style={style}>
                {(Object.keys(props.text)).map((key, index) => (
                    <div>
                        <span style={{ fontWeight: "700" }}>{key}: </span>

                        <pre>
                            {(typeof props.text[key] === "object" ? JSON.stringify(props.text[key], null, 4) : props.text[key])}
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DisplayRequest;