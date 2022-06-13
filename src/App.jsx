import React from "react";
import API from "./API";
import Registration from "./Registration";

export default function () {
  return (
    <>
      <section>
        <span>Using endpoint: {API.baseUrl}</span>
      </section>
      <Registration />
    </>
  );
};
