import React from "react";
import { Router } from "@reach/router";
import logo from "./logo.svg";
import "./App.css";

const Index = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

let Authenticated = () => <div data-cy="loggedin">Authenticated route</div>;
let NotFound = () => <h1>404</h1>;

function App() {
  const isAuthenticated = Boolean(window.localStorage.getItem("logged"));

  return (
    <Router>
      <Index path="/" />
      {isAuthenticated && <Authenticated path="dashboard" />}
      <NotFound default />
    </Router>
  );
}

export default App;
