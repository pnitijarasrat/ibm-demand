import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Home/Home";
import Nav from "./Nav/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Data from "./Data/Data";
import { demandURL } from "./constant/demandUrl";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  const [demand, setDemand] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const cacheData = JSON.parse(localStorage.getItem("demand"));
    let data;
    const day = localStorage.getItem("day" || "1");

    if (cacheData) {
      data = cacheData;
    } else {
      try {
        const res = await fetch(
          `${demandURL}all_branch_transactions_day_${day}.json`,
        );
        data = await res.json();
        const newDemand = {
          day: day,
          transaction: data,
        };
        const newDemandData = [...demand, newDemand];
        localStorage.setItem("demand", JSON.stringify(newDemandData));
      } catch (e) {
        console.log(e);
      }
    }

    setDemand(data);
    setIsLoading(false);
  };

  // This Function handles updating demand
  const handleSync = async (day) => {
    setIsLoading(true);
    const cacheData = JSON.parse(localStorage.getItem("demand"));
    const cacheDate = cacheData.map((d) => d.day);
    let data;
    try {
      if (cacheDate.includes(day.toString())) {
        data = cacheData;
        setDemand(data);
      } else {
        const res = await fetch(
          `${demandURL}all_branch_transactions_day_${day}.json`,
        );
        const data = await res.json();
        const newDemand = {
          day: day,
          transaction: data,
        };
        const newDemandData = [...demand, newDemand];
        setDemand(newDemandData);
        localStorage.setItem("demand", JSON.stringify(newDemandData));
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // localStorage.removeItem("demand");
  }, []);

  return (
    <BrowserRouter>
      <Nav handleSync={handleSync} />
      <Routes>
        <Route
          path="/"
          element={<Home handleSync={handleSync} loadDemand={demand} />}
        />
        <Route path="/data" element={<Data demand={demand} />} />
        <Route path="/dashboard" element={<Dashboard demand={demand} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
