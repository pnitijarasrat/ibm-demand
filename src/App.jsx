import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Home/Home";
import Nav from "./Nav/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Data from "./Data/Data";
import { demandURL } from "./constant/demandUrl";
import axios from "axios";

function App() {
  const [demand, setDemand] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const cacheData = JSON.parse(localStorage.getItem("demand"));
    let data;

    if (cacheData) {
      data = cacheData;
    } else {
      try {
        const res = await fetch(`${demandURL}all_branch_transactions.json`);
        data = await res.json();
        localStorage.setItem("demand", JSON.stringify(data));
      } catch (e) {
        console.log(e);
      }
    }

    setDemand(data);
    setIsLoading(false);
  };

  // This Function handles updating demand
  const handleSync = async () => {
    setIsLoading(true);
    console.log(demand);
    try {
      const res = await fetch(`${demandURL}all_branch_transactions.json`);
      const data = await res.json();
      setDemand(data);
      localStorage.removeItem("demand");
      localStorage.setItem("demand", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log(demand);
  }, []);

  return (
    <BrowserRouter>
      <Nav handleSync={handleSync} />
      <Routes>
        <Route path="/" element={<Home loadDemand={demand} />} />
        <Route path="/data" element={<Data demand={demand} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
