import React, { useState, useCallback, useContext, useReducer } from "react";
import API from "./API";

const uuidLen = 36;

export default function Login() {
  
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState(""); 
  const [preLines, dispatch] = useReducer(lineReducer, []);
  
  const login = async() => {
    reset();
    setPending(true);
    print("Creating login flow...");

    const action = await API.initLogin();
    const actionUrl = new URL(action)
    print(`Got flowID: ${actionUrl.searchParams.get("flow")}`);

    const loginResponse = await API.submitLogin(actionUrl);
    debugger;

    
    setPending(false);
  };

  const reset = () => {
    dispatch(resetLineAction());
  };

  const print = (str) => {
    dispatch(addLineAction(str));
  }

  return (
    <section id="Login">
      <h2>Login</h2>
      <input type="text" style={{width: '280px'}}maxLength={uuidLen} value={input} onChange={(ev) => setInput(ev.target.value)}></input>
      <button disabled={pending} onClick={login}>Login</button>
      <pre>
        {preLines.map(s => s + "\n")}
      </pre>
      <p style={{fontWeight: 'bold'}}></p>
    </section>
  );
};

// State management
const resetLineAction = () => ({ type: 'RESET' });
const addLineAction = (line) => ({ type: 'ADD', newLine: line });
const lineReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state.concat([action.newLine])
    case 'RESET':
      return [];
    default:
      throw new Error("Invalid dispatch action for lines")
  }
};