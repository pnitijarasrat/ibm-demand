import React, { useState } from "react";
import { Form, Input, Button, Divider } from "antd";
import xlsx from "json-as-xlsx";
import mockData from "../Demand/demand.json";

export default function Data({ demand }) {
  const [filterForm] = Form.useForm();
  const [filter, setFilter] = useState(false);
  const [filterData, setFilterData] = useState([]);

  const handleConfirmFilter = () => {
    setFilterData(
      demand.filter(
        (data) =>
          parseInt(data.day) >=
            parseInt(filterForm.getFieldValue("startDate")) &&
          parseInt(data.day) <= parseInt(filterForm.getFieldValue("endDate")) &&
          parseInt(data.branch) ===
            parseInt(filterForm.getFieldValue("branch")),
      ),
    );
    setFilter(true);
    console.log(
      demand.filter(
        (data) =>
          parseInt(data.day) >=
            parseInt(filterForm.getFieldValue("startDate")) &&
          parseInt(data.day) <= parseInt(filterForm.getFieldValue("endDate")) &&
          parseInt(data.branch) ===
            parseInt(filterForm.getFieldValue("branch")),
      ),
    );
  };

  let data = [
    {
      sheet: "Demand",
      columns: [
        { label: "Day", value: "day" }, // Top level data
        { label: "Branch", value: "branch" }, // Custom format
        { label: "Product A", value: "productA" }, // Run functions
        { label: "Product B", value: "productB" }, // Run functions
        { label: "Product C", value: "productC" }, // Run functions
        { label: "Product D", value: "productD" }, // Run functions
        { label: "Gender", value: "gender" }, // Run functions
      ],
      content: filterData,
    },
  ];

  let settings = {
    fileName: "demand", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
  };

  return (
    <div className="page-container">
      <h1>Data</h1>
      <Form
        labelCol={{ span: 2 }}
        form={filterForm}
        onFinish={handleConfirmFilter}
      >
        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="branch" label="Branch" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <div className="footer">
          <Button
            // onClick={() => {
            //   handleConfirmFilter();
            // }}
            htmlType="submit"
          >
            Confirm
          </Button>
        </div>
      </Form>
      <Divider />
      {filter && (
        <div>
          <h1>Data Summary</h1>
          <div>
            <div>Start Date: {filterForm.getFieldValue("startDate")}</div>
            <div>End Date: {filterForm.getFieldValue("endDate")}</div>
            <div>Branch: {filterForm.getFieldValue("branch")}</div>
          </div>
          <div className="footer">
            <Button onClick={() => xlsx(data, settings)}>Download</Button>
          </div>
        </div>
      )}
    </div>
  );
}
