import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Detection({ inputs, result, chartData, history }) {
  return (
    <div className="min-h-screen p-6 text-white font-sans space-y-8">
      <h1 className="text-4xl font-bold text-center mb-6">🔌 Monitoring Dashboard</h1>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(inputs).map(([key,value]) => (
          <div key={key} className="flex flex-col">
            <label className="mb-1 text-white/70">{key}</label>
            <input type="number" value={value} readOnly className="p-3 rounded-3xl bg-white/10 border border-white/20 text-white"/>
          </div>
        ))}
      </div>

      {/* Latest Result */}
      <div className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold mb-2">Latest Result</h2>
        <p><strong>Fault Type:</strong> {result.Fault_Type}</p>
        <p><strong>Diagnosis:</strong> {result.Diagnosis}</p>
        <p><strong>Severity:</strong> {result.Severity}</p>
        <p><strong>System Health:</strong> {result.System_Health}%</p>
        <p><strong>Confidence:</strong> {result.Confidence}%</p>
      </div>

      {/* Live Chart */}
      <div className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Live Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555"/>
            <XAxis dataKey="name" stroke="#ccc"/>
            <YAxis stroke="#ccc"/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="Ia" stroke="#8884d8" strokeWidth={2}/>
            <Line type="monotone" dataKey="Ib" stroke="#82ca9d" strokeWidth={2}/>
            <Line type="monotone" dataKey="Ic" stroke="#ff7300" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* System History */}
      <div className="bg-white/10 border border-white/20 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold mb-4">📊 Fault History</h2>
        {history.length === 0 ? <p>No Prediction Data Yet</p> : (
          <div className="overflow-auto max-h-80">
            <table className="min-w-full text-sm border border-white/10">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-2">Time</th>
                  <th className="p-2">Va</th>
                  <th className="p-2">Vb</th>
                  <th className="p-2">Vc</th>
                  <th className="p-2">Ia</th>
                  <th className="p-2">Ib</th>
                  <th className="p-2">Ic</th>
                  <th className="p-2">Result</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h,i)=>(
                  <tr key={i} className="border-b border-white/10 text-center">
                    <td className="p-2">{h.time}</td>
                    <td>{h.inputs.Va}</td>
                    <td>{h.inputs.Vb}</td>
                    <td>{h.inputs.Vc}</td>
                    <td>{h.inputs.Ia}</td>
                    <td>{h.inputs.Ib}</td>
                    <td>{h.inputs.Ic}</td>
                    <td className={h.result==="Normal Operation"?"text-green-400":"text-red-400"}>{h.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}