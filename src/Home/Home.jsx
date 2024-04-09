import React, { useState } from "react";
import "./Home.css";
import Branch from "../Branch/Branch";
import { Form, Input, Button, Divider } from "antd";

export default function Home({ loadDemand, handleSync }) {
  const [branch, setBranch] = useState(localStorage.getItem("branch") || 1);
  const [day, setDay] = useState(localStorage.getItem("day") || 60);
  const [demand, setDemand] = useState(loadDemand);
  const [isShowingResult, setIsShowingResult] = useState(false);
  const branchNumber = [];

  for (let i = 1; i <= 30; i++) {
    branchNumber.push(i);
  }

  const handleView = () => {
    const atDayDemand = loadDemand.filter(
      (d) => parseInt(d.day) === parseInt(day),
    );
    if (atDayDemand.length === 0) return setDemand([]);
    const displayDemand = atDayDemand[0].transaction.filter(
      (d) => d.branch === parseInt(branch),
    );
    setDemand(displayDemand);

    console.log(displayDemand);
    setIsShowingResult(true);
  };

  const handleDayButton = (action) => {
    setIsShowingResult(false);
    if (action === "decrease" && parseInt(day) <= 1) return;
    if (action === "increase") {
      localStorage.setItem("day", parseInt(day) + 1);
      return setDay(parseInt(day) + 1);
    }
    if (action === "decrease") {
      localStorage.setItem("day", parseInt(day) - 1);
      return setDay(parseInt(day) - 1);
    }
  };

  const [dateForm] = Form.useForm();

  const handleSetDate = () => {
    setDay(parseInt(dateForm.getFieldsValue().startDate));
    setIsShowingResult(false);
    localStorage.setItem("day", day);
  };

  return (
    <div className="page-container">
      <h1>Demand Monitoring System</h1>
      <h2>Select Branch [{branch}]</h2>
      <div className="branch-container">
        <select
          onChange={(e) => {
            setIsShowingResult(false);
            setBranch(e.target.value);
            localStorage.setItem("branch", e.target.value);
          }}
        >
          <option value={0}>Select Branch</option>
          {branchNumber.map((branch) => {
            return (
              <option
                key={branch}
                // onClick={() => {
                //   setIsShowingResult(false);
                //   setBranch(branch);
                //   localStorage.setItem("branch", branch);
                // }}
                value={branch}
              >
                Branch {branch}
              </option>
            );
          })}
        </select>
        <br />

        {/* {branchNumber.map((branch) => { */}
        {/*   return ( */}
        {/*     <div */}
        {/*       key={branch} */}
        {/*       onClick={() => { */}
        {/*         setIsShowingResult(false); */}
        {/*         setBranch(branch); */}
        {/*         localStorage.setItem("branch", branch); */}
        {/*       }} */}
        {/*     > */}
        {/*       Branch {branch} */}
        {/*     </div> */}
        {/*   ); */}
        {/* })} */}
      </div>
      <br />
      <Form form={dateForm} onFinish={handleSetDate}>
        <Form.Item name="startDate" label="Start Date">
          <Input />
        </Form.Item>
        <Button htmlType="submit">Set Start Date</Button>
      </Form>
      <Divider />
      <h2>Day: {day}</h2>
      <div>
        Day: {/* <input */}
        {/*   onChange={(e) => { */}
        {/*     setDay(parseInt(e.target.value); */}
        {/*     setIsShowingResult(false); */}
        {/*   }} */}
        {/* />{" "} */}
        <button onClick={() => handleDayButton("decrease")}>-</button>{" "}
        <button onClick={() => handleDayButton("increase")}>+</button>
      </div>
      <br />
      <div>
        <button
          onClick={() => handleSync(localStorage.getItem("day") || day || 1)}
        >
          Sync
        </button>{" "}
        <button onClick={handleView}>View</button>
      </div>
      {isShowingResult && <Branch day={day} branch={branch} demand={demand} />}
    </div>
  );
}
