import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav({ handleSync }) {
  return (
    <nav>
      <h2>IBM&CO Demand System</h2>
      <ul>
        {/* <Link to="/"> */}
        {/*   <li>Home</li> */}
        {/* </Link> */}
        {/* <Link to="/data"> */}
        {/*   <li>Data</li> */}
        {/* </Link> */}
      </ul>
      {/* <button onClick={() => handleSync(localStorage.getItem("day") || 1)}> */}
      {/*   Sync */}
      {/* </button> */}
      {/* <button onClick={localStorage.removeItem("demand")}> Clear Cache</button> */}
    </nav>
  );
}
