import "./App.css";
import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import DashBoard from "./Pages/DashBoard";
import PrivateRoutes from "../Auth/PrivateRoutes";
import { useEffect } from "react";

export const AppContext = createContext("");

function App() {
  const [listData, setListData] = useState([]);
  const [getLaptopId, setGetLaptopId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState(null);
  const [getIdForHistory, setGetIdForHistory] = useState(null);

  // GET data ------------------------------------ //
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://inventory-85i2.onrender.com/api/v1/allLaptops"
        );
        if (!response.ok) {
          throw new Error("not ok");
        }
        const data = await response.json();
        setListData(data);
      } catch (error) {
        console.error("ERROR: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // GET history data -------------------------------- //

  async function getHistoryData() {
    if (!getIdForHistory) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://inventory-85i2.onrender.com/api/v1/history/${getIdForHistory}`
      );
      if (!response.ok) {
        throw new Error("not ok");
      }
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getHistoryData();
  }, [getIdForHistory]);

  // DELETE data----------------------------------- //
  async function handleDelete(id) {
    if (!id) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://inventory-85i2.onrender.com/api/v1/delete/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json", authorization: token },
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
    if (getIdForHistory) {
      handleDelete;
    }
  }, [listData, getIdForHistory]);

  // UPDATE data -------------------------------------------- //

  async function handleUpdate(details) {
    if (!(getLaptopId || details)) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://inventory-85i2.onrender.com/api/v1/reAssign/${getLaptopId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", authorization: token },
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

  // POST New Entry ------------------------------------ //
  async function addNewEntry(details) {
    if (!(getLaptopId || details)) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://inventory-85i2.onrender.com/api/v1/addLaptop`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", authorization: token },
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

  function getLaptopIdsForHistory(id) {
    setGetIdForHistory(id);
  }

  return (
    <AppContext.Provider
      value={{
        listData,
        handleDelete,
        handleUpdate,
        getLaptopIds,
        addNewEntry,
        isLoading,
        history,
        getLaptopIdsForHistory,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            {" "}
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
