import React, { useState, useCallback, useContext, useReducer } from "react";
import API from "./API";

export default function Registration() {
  
  const [pending, setPending] = useState(false);
  const [preLines, dispatch] = useReducer(lineReducer, []);
  
  const register = async() => {
    dispatch(resetLineAction());
    setPending(true);
    dispatch(addLineAction("Initiating registration..."));
    
    try {
      // Fetch flow
      const registrationAction = await API.initRegistration();
      const actionUrl = new URL(registrationAction)
      dispatch(addLineAction(`Got flowID: ${actionUrl.searchParams.get("flow")}`));

      dispatch(addLineAction("Submitting registration with flowId..."));
      const registrationResult = await API.submitRegistration(actionUrl);
      debugger;

    } catch (e) {
      dispatch(addLineAction(e.toString()));
    }
    setPending(false);
  };

  return (
    <section id="registration">
      <h2>Registration</h2>
      <button disabled={pending} onClick={register}>Register new account</button>
      <pre>
        {preLines.map(s => s + "\n")}
      </pre>
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