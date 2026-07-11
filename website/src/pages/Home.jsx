import React, { useState, useEffect } from "react";

export default function Home({ inputs: propsInputs, result: propsResult, history: propsHistory }) {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [noteInput, setNoteInput] = useState("");
  const [notesOpen, setNotesOpen] = useState(true);

  const FREQ = 50; // Hz ثابت

  // ===============================
  // استخدام props لو موجودة، أو localStorage لو مش موجودة
  // ===============================
  const [inputs, setInputs] = useState(() => {
    if (propsInputs && Object.keys(propsInputs).length) return propsInputs;
    const saved = localStorage.getItem("inputs");
    return saved ? JSON.parse(saved) : { Ia: 0, Ib: 0, Ic: 0, Va: 66000, Vb: 66000, Vc: 66000 };
  });

  const [result, setResult] = useState(() => {
    if (propsResult && Object.keys(propsResult).length) return propsResult;
    const saved = localStorage.getItem("result");
    return saved ? JSON.parse(saved) : { Fault_Type: "Unknown", Diagnosis: "", Severity: "", System_Health: 0, Confidence: 0 };
  });

  const [history, setHistory] = useState(() => {
    if (propsHistory && propsHistory.length) return propsHistory;
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  // ===============================
  // تحديث القيم تلقائيًا من localStorage لو اتغيرت
  // ===============================
  useEffect(() => {
    const interval = setInterval(() => {
      const savedInputs = localStorage.getItem("inputs");
      const savedResult = localStorage.getItem("result");
      const savedHistory = localStorage.getItem("history");

      if (savedInputs) setInputs(JSON.parse(savedInputs));
      if (savedResult) setResult(JSON.parse(savedResult));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, 1000); // كل ثانية نشوف لو في تحديث

    return () => clearInterval(interval);
  }, []);

  const avgCurrent = ((inputs.Ia + inputs.Ib + inputs.Ic) / 3).toFixed(2);
  const avgVoltage = ((inputs.Va + inputs.Vb + inputs.Vc) / 3).toFixed(2);
  const systemStatus = result.Fault_Type === "Normal Operation" ? "Normal" : "Fault";

  // ===============================
  // Notes handlers
  // ===============================
  const addNote = () => {
    if (!noteInput.trim()) return;
    setNotes(prev => {
      const updatedNotes = [...prev, { id: Date.now(), text: noteInput }];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
    setNoteInput("");
  };

  const deleteNote = id => {
    setNotes(prev => {
      const updatedNotes = prev.filter(n => n.id !== id);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const clearNotes = () => {
    setNotes([]);
    localStorage.removeItem("notes");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  // ===============================
  // JSX
  // ===============================
  return (
    <div className="min-h-screen p-6 text-white font-sans space-y-8">
      <h1 className="text-4xl font-bold text-center mb-6">🔌 Monitoring Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col bg-white/10 p-4 rounded-3xl">
          <p className="text-sm text-white/70">Avg Current</p>
          <p className="text-2xl font-bold">{avgCurrent} A</p>
        </div>
        <div className="flex flex-col bg-white/10 p-4 rounded-3xl">
          <p className="text-sm text-white/70">Avg Voltage</p>
          <p className="text-2xl font-bold">{avgVoltage} V</p>
        </div>
        <div className="flex flex-col bg-white/10 p-4 rounded-3xl">
          <p className="text-sm text-white/70">System Status</p>
          <p className="text-2xl font-bold">{systemStatus}</p>
        </div>
        <div className="flex flex-col bg-white/10 p-4 rounded-3xl">
          <p className="text-sm text-white/70">Frequency</p>
          <p className="text-2xl font-bold">{FREQ} Hz</p>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
        <button onClick={() => setNotesOpen(!notesOpen)} className="text-xl font-bold mb-4 w-full text-left">
          Notes {notesOpen ? "▲" : "▼"}
        </button>
        {notesOpen && (
          <>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                placeholder="Write a note..."
                className="bg-white/10 border border-white/20 p-3 rounded-xl flex-1 outline-none text-white placeholder-white/50"
              />
              <button onClick={addNote} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold">
                Add Note
              </button>
              <button onClick={clearNotes} className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-xl font-semibold">
                Clear Notes
              </button>
            </div>
            {notes.length > 0 && (
              <ul className="mt-4 space-y-2 max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-700/50 scrollbar-track-gray-900/20">
                {notes.map(n => (
                  <li key={n.id} className="flex justify-between bg-white/10 p-3 rounded-xl">
                    {n.text}
                    <button onClick={() => deleteNote(n.id)} className="text-white/80 hover:text-white/100">
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {/* System History */}
      <div className="bg-white/10 border border-white/20 rounded-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">📊 System History</h2>
           
        </div>
        {history.length === 0 ? (
          <p>No Data Yet</p>
        ) : (
          <div className="overflow-auto max-h-96">
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