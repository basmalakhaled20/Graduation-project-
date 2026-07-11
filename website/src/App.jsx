import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Predection from "./pages/Predection";
import Detection from "./pages/Detection";
import Layout from "./Layout";
import Area from "./Area";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";

function App() {
  // States مركزية
  const [inputs, setInputs] = useState(() => JSON.parse(localStorage.getItem("inputs")) || { Ia:0, Ib:0, Ic:0, Va:66000, Vb:66000, Vc:66000 });
  const [result, setResult] = useState(() => JSON.parse(localStorage.getItem("result")) || { Fault_Type:"Unknown", Diagnosis:"", Severity:"", System_Health:0, Confidence:0 });
  const [chartData, setChartData] = useState(() => JSON.parse(localStorage.getItem("chartData")) || []);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("history")) || []);

  // -------------------
  // Simulation & Prediction (مرة واحدة فقط)
  useEffect(() => {
    const interval = setInterval(async () => {
      // Generate random inputs
      let Ia = Math.round(Math.random() * 100);
      let Ib = Math.round(Math.random() * 100);
      let Ic = Math.round(Math.random() * 100);
      let Va = 66000 + Math.round(Math.random() * 12000 - 6000);
      let Vb = 66000 + Math.round(Math.random() * 12000 - 6000);
      let Vc = 66000 + Math.round(Math.random() * 12000 - 6000);

      const newInputs = { Ia, Ib, Ic, Va, Vb, Vc };
      setInputs(newInputs);
      localStorage.setItem("inputs", JSON.stringify(newInputs));

      // Fetch prediction
      try {
        const res = await axios.post("http://127.0.0.1:8000/predict", newInputs);
        setResult(res.data);
        localStorage.setItem("result", JSON.stringify(res.data));

        // Update chartData for currents & voltage difference
        setChartData(prev => {
          const updated = [
            ...prev,
            {
              name: new Date().toLocaleTimeString(),
              Ia, Ib, Ic,
              Va, Vb, Vc
            }
          ].slice(-50);
          localStorage.setItem("chartData", JSON.stringify(updated));
          return updated;
        });

        // Update history with System_Health & Confidence
        setHistory(prev => {
          const newEntry = {
            time: new Date().toLocaleTimeString(),
            inputs: newInputs,
            result: res.data.Fault_Type,
            System_Health: res.data.System_Health,
            Confidence: res.data.Confidence
          };
          const updated = [newEntry, ...prev].slice(0, 50);
          localStorage.setItem("history", JSON.stringify(updated));
          return updated;
        });

      } catch(err) {
        console.error(err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home inputs={inputs} result={result} history={history} />} />
          <Route path="predection" element={<Predection inputs={inputs} chartData={chartData} history={history} setInputs={setInputs} setHistory={setHistory} />} />
          <Route path="detection" element={<Detection inputs={inputs} result={result} chartData={chartData} history={history} />} />
          <Route path="area" element={<Area />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;