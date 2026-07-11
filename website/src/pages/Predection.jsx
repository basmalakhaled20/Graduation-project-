import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from "recharts";

export default function Predection({ chartData, history }) {
  // LineChart data for Voltage only
  const lineData = chartData.map((entry) => ({
    time: entry.name,
    Va: entry.Va,
    Vb: entry.Vb,
    Vc: entry.Vc,
  }));

  // Fault count calculation
  const faultCounts = {};
  history.forEach((h) => {
    faultCounts[h.result] = (faultCounts[h.result] || 0) + 1;
  });
  const barData = Object.entries(faultCounts).map(([fault, count]) => ({ fault, count }));

  return (
    <div className="p-6 space-y-10 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center">📊 Dynamic Fault Prediction</h1>

     <ResponsiveContainer width="100%" height={300}>
  <LineChart data={[...lineData].reverse()}>
    <XAxis dataKey="time" stroke="#ccc" />
    <YAxis stroke="#ccc" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="Va" stroke="#3b82f6" name="Va" />
    <Line type="monotone" dataKey="Vb" stroke="#22c55e" name="Vb" />
    <Line type="monotone" dataKey="Vc" stroke="#eab308" name="Vc" />
  </LineChart>
</ResponsiveContainer>

      {/* BarChart for Fault Count */}
      <div className="bg-slate-800/40 backdrop-blur-md border border-slate-500/20 rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Fault Occurrences</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="fault" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#f43f5e" name="Occurrences" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* History Table */}
      <div className="bg-slate-800/50 border border-slate-500/20 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold mb-4">📊 System History</h2>
        {history.length === 0 ? (
          <p>No Prediction Data Yet</p>
        ) : (
          <div className="overflow-auto max-h-80">
            <table className="min-w-full text-sm border border-white/10">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-2">Time</th>
                  <th className="p-2">Ia</th>
                  <th className="p-2">Ib</th>
                  <th className="p-2">Ic</th>
                  <th className="p-2">Va</th>
                  <th className="p-2">Vb</th>
                  <th className="p-2">Vc</th>
                  <th className="p-2">Result</th>
                  <th className="p-2">Health</th>
                  <th className="p-2">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className="border-b border-white/10 text-center">
                    <td className="p-2">{h.time}</td>
                    <td>{h.inputs.Ia}</td>
                    <td>{h.inputs.Ib}</td>
                    <td>{h.inputs.Ic}</td>
                    <td>{h.inputs.Va}</td>
                    <td>{h.inputs.Vb}</td>
                    <td>{h.inputs.Vc}</td>
                    <td className={h.result === "Normal Operation" ? "text-green-400" : "text-red-400"}>{h.result}</td>
                    <td>{h.System_Health ?? 0}%</td>
                    <td>{h.Confidence ?? 0}%</td>
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