import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index";
import { Dashboard } from "./pages/Dashboard";

let NotFound = () => <h1>404</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Index />} />
        <Route element={<Dashboard />} path="dashboard" />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
