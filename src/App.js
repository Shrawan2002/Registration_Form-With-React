import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import SuccessPage from "./Components/SuccessPage";
import FormPage from "./Components/FormPage";

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <Routes>
      <Route path="/" element={<FormPage onSubmit={handleSubmit} />} />
      <Route
        path="/success"
        element={
          submittedData ? (
            <SuccessPage formdata={submittedData} />
          ) : (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">No data submitted</h1>
              </div>
            </div>
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
