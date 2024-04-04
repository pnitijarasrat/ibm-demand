import React from "react";

export default function Branch({ day, demand, branch }) {
  let sumDemand = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  };
  for (let i = 0; i < demand.length; i++) {
    sumDemand = {
      day: day,
      branch: branch,
      a: sumDemand.a + demand[i].productA,
      b: sumDemand.b + demand[i].productB,
      c: sumDemand.c + demand[i].productC,
      d: sumDemand.d + demand[i].productD,
    };
  }
  return (
    <div>
      <h2>
        Demand at the end of Day {day} of Branch {branch}
      </h2>
      <div>
        Day: {day} Branch: {branch}
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{sumDemand.a}</td>
            <td>{sumDemand.b}</td>
            <td>{sumDemand.c}</td>
            <td>{sumDemand.d}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
