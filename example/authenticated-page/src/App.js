import React from "react";
import { Router } from "@reach/router";
import { Index } from "./pages/Index";
import { Dashboard } from "./pages/Dashboard";

let NotFound = () => <h1>404</h1>;

function App() {
  return (
    <Router>
      <Index path="/" />
      <Dashboard path="dashboard" />
      <NotFound default />
    </Router>
  );
}

export default App;
