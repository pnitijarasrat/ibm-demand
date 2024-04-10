import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Home/Home";
import Nav from "./Nav/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Data from "./Data/Data";
import { demandURL } from "./constant/demandUrl";
import Dashboard from "./Dashboard/Dashboard";
import CSV from "./CSV/CSV";

function App() {
  const [demand, setDemand] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const cacheData = JSON.parse(localStorage.getItem("demand"));
    console.log(cacheData);
    let data;
    const day = localStorage.getItem("day" || "61");

    if (cacheData) {
      data = cacheData;
      console.log("from cache");
    } else {
      try {
        const res = await fetch(
          `${demandURL}all_branch_transactions_day_${day}.json`,
        );
        const result = await res.json();
        data = [{ day: day, transaction: result }];
        console.log("fetch");
      } catch (e) {
        console.log(e);
      }
    }
    console.log("data", data);
    setDemand(data);
    localStorage.setItem("demand", JSON.stringify(data));
    console.log(data);
    setIsLoading(false);
  };

  const sync = async ({ day }) => {
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
  };

  // This Function handles updating demand
  const handleSync = async (day) => {
    setIsLoading(true);
    const cacheData = JSON.parse(localStorage.getItem("demand"));
    const cacheDate = cacheData.map((d) => d.day);
    let data;
    try {
      if (cacheDate.includes(day.toString())) {
        // TODO: check if the current cache is null or not, if null fetch again else dont do anything
        const dataAtDateCache = cacheData.filter(
          (d) => parseInt(d.day) === parseInt(day),
        );
        if (dataAtDateCache.length > 0) {
          data = cacheData;
        }
        setDemand(data);
      } else {
        // Load if no cache
        // await sync(day);
        console.log("have to cache");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // fetchData();
    // localStorage.removeItem("demand");
  }, []);

  return (
    <BrowserRouter>
      <Nav handleSync={handleSync} />
      <Routes>
        <Route
          path="/"
          element={
            // <Home
            //   isSyncing={isLoading}
            //   handleSync={handleSync}
            //   loadDemand={demand}
            // />
            <CSV />
          }
        />
        <Route path="/data" element={<Data demand={demand} />} />
        <Route path="/dashboard" element={<Dashboard demand={demand} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
