import React, { useState } from "react";
import { Input, Form, Button, Divider, Flex } from "antd";
import { demandURL } from "../constant/demandUrl";
import { CSVLink } from "react-csv";

export default function CSV() {
  const [form] = Form.useForm();
  const [fetching, setFetching] = useState(false);
  const [demand, setDemand] = useState([]);

  const handleRequestData = async (day) => {
    setFetching(true);
    setDemand([]);
    let dataArray = [];
    try {
      const res = await fetch(
        `${demandURL}all_branch_transactions_day_${day}.json`,
      );
      const data = await res.json();

      console.log(data);

      handleCalculation(data, dataArray, day);
      setDemand(dataArray);

      console.log("fetch at", day);
    } catch (e) {
      console.log(e);
    }
    console.log(dataArray);
    setFetching(false);
  };

  const handleCalculation = (demand, dataArray, day) => {
    // split by branch by looping the branch number and filter the demand
    // then sum demand of that branch and push to the data array
    for (let i = 1; i < 35; i++) {
      const branchDemand = demand.filter((d) => d.branch === i);
      let productA = 0;
      let productB = 0;
      let productC = 0;
      let productD = 0;
      for (let j = 0; j < branchDemand.length; j++) {
        productA += branchDemand[j].productA;
        productB += branchDemand[j].productB;
        productC += branchDemand[j].productC;
        productD += branchDemand[j].productD;
      }
      if (
        productA !== 0 &&
        productB !== 0 &&
        productC !== 0 &&
        productD !== 0
      ) {
        dataArray.push({
          branch: i,
          day: day,
          productA: productA,
          productB: productB,
          productC: productC,
          productD: productD,
        });
      }
    }
  };

  const handleSubmit = () => {
    const day = form.getFieldsValue("day").date;
    handleRequestData(day);
  };

  const demandHeader = [
    { label: "Branch", key: "branch" },
    { label: "Day", key: "day" },
    { label: "Product A", key: "productA" },
    { label: "Product B", key: "productB" },
    { label: "Product C", key: "productC" },
    { label: "Product D", key: "productD" },
  ];

  const handleDisplayDate = (input) => {
    const boardDate = parseInt(input);
    const index = boardDate - 1;
    const week = Math.floor(index / 5);
    // This is the first week, nothing different
    if (week === 0) return boardDate;
    // This is not the first week so everything fucks
    else return boardDate + 2 * week;
  };

  return (
    <div className="page-container">
      <h1>Request Data</h1>
      <div>
        This page will handle requesting data of{" "}
        <i>
          <b>all branch</b>
        </i>{" "}
        of the requested date
      </div>
      <Divider />
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="date" label="Requested Date ( Board Date )">
          <Input />
        </Form.Item>
        <Flex justify="space-between" style={{ width: "100%" }}>
          <Button htmlType="submit">Request</Button>
          {demand.length !== 0 && (
            <CSVLink
              headers={demandHeader}
              filename={`day_$form.getFieldsValue("day").date`}
              data={demand}
            >
              <Button type="primary" style={{ color: "white" }}>
                Export Demand CSV
              </Button>
            </CSVLink>
          )}
        </Flex>
      </Form>
      <Divider />
      <div>
        <h3>Note</h3>
        <div>
          It's good idea to download the csv demand ( by clicking the blue
          button above ) everytime the day changes, it would help me a lot.
          Thanks you kub.
        </div>
      </div>
      <br />
      {fetching ? (
        <div>Requesting....</div>
      ) : demand.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Branch</th>
              <th>Product A</th>
              <th>Product B</th>
              <th>Product C</th>
              <th>Product D</th>
            </tr>
          </thead>
          <tbody>
            {demand.map((d) => (
              <tr key={d.branch}>
                <td>{d.day}</td>
                <td>{d.branch}</td>
                <td>{d.productA}</td>
                <td>{d.productB}</td>
                <td>{d.productC}</td>
                <td>{d.productD}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Data </div>
      )}
      <Flex justify="end" gap="middle" style={{ marginBottom: "32px" }}></Flex>
    </div>
  );
}
