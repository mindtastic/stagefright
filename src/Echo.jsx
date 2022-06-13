import React, { useState, useReducer } from "react";
import API from "./API";

export default function Echo() {
  
  const [pending, setPending] = useState(false);
  const [sessionToken, setSessionToken] = useState(""); 
  const [preLines, dispatch] = useReducer(lineReducer, []);
  
  const query = async() => {
    reset();
    setPending(true);
    
    print("Querying echo service...");
    try {

      const echoResponse = await API.queryEcho(sessionToken);
      print(echoResponse);

    } catch (e) {
      print(e.toString());
    }
    
    setPending(false);
  };
  
  const reset = () => {
    dispatch(resetLineAction());
  };
  
  const print = (str) => {
    dispatch(addLineAction(str));
  }
  
  return (
    <section id="echo">
    <h2>Echo service</h2>
    <input placeholder="Session Token" type="text" style={{width: '280px'}} value={sessionToken} onChange={(ev) => setSessionToken(ev.target.value)}></input>
    <button disabled={pending} onClick={query}>Query Echo Service</button>
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