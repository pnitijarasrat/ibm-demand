import React, { useState } from "react";
import { Flex, Divider, Button, Card, Statistic, Row, Col } from "antd";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  BarChart,
} from "recharts";

export default function Dashboard({ demand }) {
  const dateDate = demand
    .map((d) => d.day)
    .sort((a, b) => {
      const numA = parseInt(a);
      const numB = parseInt(b);

      if (numA < numB) {
        return -1; // numA should come before numB
      } else if (numA > numB) {
        return 1; // numA should come after numB
      } else {
        return 0; // numA and numB are equal
      }
    });

  let displayData = JSON.parse(localStorage.getItem("sales")) || [];

  const handleCalculate = () => {
    localStorage.removeItem("sales");
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    for (let i = 0; i < demand.length; i++) {
      const transaction = demand[i].transaction;

      for (let j = 0; j < transaction.length; j++) {
        a = a + parseInt(transaction[j].productA);
        b = b + parseInt(transaction[j].productB);
        c = c + parseInt(transaction[j].productC);
        d = d + parseInt(transaction[j].productD);
      }
    }
    displayData = [
      {
        name: "Sales",
        salesA: a,
        salesB: b,
        salesC: c,
        salesD: d,
        revA: a * 820,
        revB: b * 690,
        revC: c * 420,
        revD: d * 229,
        total: a * 820 + b * 690 + c * 420 + d * 229,
      },
    ];
    localStorage.setItem("sales", JSON.stringify(displayData));
    window.location.reload();
  };

  if (displayData) console.log("retrive sales");
  else console.log("have to calculated");

  return (
    <>
      <div className="page-container">
        <h1>
          <Flex gap="middle" align="center">
            Dashboard <Button onClick={handleCalculate}>Calculate</Button>
          </Flex>
        </h1>
        <div>
          <h3>Date of Displaying Data [{dateDate.length}]</h3>
          <Flex gap="small">
            {dateDate.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </Flex>
        </div>
        <Divider />
        <h2>Sales ( EA )</h2>
        <BarChart
          width={500}
          height={300}
          data={displayData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salesA" fill="#d1cfe2" />
          <Bar dataKey="salesB" fill="#9cadce" />
          <Bar dataKey="salesC" fill="#7ec4cf" />
          <Bar dataKey="salesD" fill="#d4afb9" />
        </BarChart>
        <h2>Revenue</h2>
        <Card>
          <Flex>
            <Statistic title="Total" value={displayData[0].total} />
          </Flex>
          <Flex justify="space-between">
            <Statistic title="Revenue A" value={displayData[0].revA} />
            <Statistic title="Revenue B" value={displayData[0].revB} />
            <Statistic title="Revenue C" value={displayData[0].revC} />
            <Statistic title="Revenue D" value={displayData[0].revD} />
          </Flex>
        </Card>
      </div>
    </>
  );
}
