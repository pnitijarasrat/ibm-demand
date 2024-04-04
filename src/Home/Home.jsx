import React, { useState } from "react";
import "./Home.css";
import Branch from "../Branch/Branch";
import mockDemand from "../Demand/demand.json";

export default function Home({ loadDemand }) {
  const [branch, setBranch] = useState(1);
  const [day, setDay] = useState(1);
  const [demand, setDemand] = useState(loadDemand);
  const [isShowingResult, setIsShowingResult] = useState(false);
  const branchNumber = [];

  for (let i = 1; i <= 30; i++) {
    branchNumber.push(i);
  }

  const handleView = () => {
    setDemand(
      loadDemand.filter(
        (d) =>
          parseInt(d.day) === parseInt(day) &&
          parseInt(d.branch) === parseInt(branch),
      ),
    );
    setIsShowingResult(true);
  };

  const handleDayButton = (action) => {
    setIsShowingResult(false);
    if (action === "decrease" && parseInt(day) <= 1) return;
    if (action === "increase") return setDay(parseInt(day) + 1);
    if (action === "decrease") return setDay(parseInt(day) - 1);
  };

  return (
    <div className="page-container">
      <h1>Demand Monitoring System</h1>
      <h2>Select Branch [{branch}]</h2>
      <div className="branch-container">
        {branchNumber.map((branch) => {
          return (
            <div
              key={branch}
              onClick={() => {
                setIsShowingResult(false);
                setBranch(branch);
              }}
            >
              Branch {branch}
            </div>
          );
        })}
      </div>
      <h2>Day: {day}</h2>
      <div>
        Day:{" "}
        <input
          onChange={(e) => {
            setDay(e.target.value);
            setIsShowingResult(false);
          }}
        />{" "}
        <button onClick={() => handleDayButton("decrease")}>-</button>{" "}
        <button onClick={() => handleDayButton("increase")}>+</button>
      </div>
      <br />
      <button onClick={handleView}>View</button>
      {isShowingResult && <Branch day={day} branch={branch} demand={demand} />}
    </div>
  );
}
