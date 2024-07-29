import "./App.css";
import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import DashBoard from "./Pages/DashBoard";
import { useEffect } from "react";

export const AppContext = createContext("");

function App() {
  const [listData, setListData] = useState([]);
  const [getLaptopId, setGetLaptopId] = useState(null);

  // GET data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://inventory-85i2.onrender.com/api/v1/allLaptops"
        );
        if (!response.ok) {
          throw new Error("not ok");
        }
        const data = await response.json();
        console.log(data);
        setListData(data);
        // localStorage.setItem("laptops", JSON.stringify(data.data));
      } catch (error) {
        console.error('ERROR: ',error);
      }
    }
    fetchData();
  }, []);

  // DELETE dat-----------------------------------//
  async function handleDelete(id) {
    console.log("Id getting deleted:" + id);
    if (!id) return;
    try {
      const response = await fetch(
        `https://inventory-85i2.onrender.com/api/v1/delete/${id}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );
      if (!response.ok) {
        throw new Error("not ok");
      }
      const data = await response.json();
      setListData(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    handleDelete;
  }, [listData]);

  // ------------------------------------------------------
  // UPDATE data

  async function handleUpdate(details) {
    if (!(getLaptopId || details)) return;
    try {
      const response = await fetch(
        `https://inventory-85i2.onrender.com/api/v1/reAssign/${getLaptopId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(details),
        }
      );
      if (!response.ok) {
        throw new Error("not ok");
      }
      const data = await response.json();
      setListData(data);
      setGetLaptopId(null);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleUpdate;
  }, [getLaptopId]);

  // ---------------POST New Entry ----------------//
  async function addNewEntry(details) {
    if (!(getLaptopId || details)) return;
    try {
      const response = await fetch(
        `https://inventory-85i2.onrender.com/api/v1/addLaptop`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(details),
        }
      );
      if (!response.ok) {
        throw new Error("not ok");
      }
      const data = await response.json();
      setListData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    addNewEntry;
  }, []);


  function getLaptopIds(id) {
    setGetLaptopId(id);
  }

  // console.log(localStorage.getItem("data"));
  return (
    <AppContext.Provider
      value={{ listData, handleDelete, handleUpdate, getLaptopIds, addNewEntry }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
{
  /* <Route path="/send" element={< />} /> */
}

export default App;
