import React from "react";
import { navigate } from "@reach/router";
import { Layout } from "../components/Layout";

export const Index = () => {
  const inputRef = React.useRef();

  const login = e => {
    e.preventDefault();

    // Simulate an authentication based on local storage
    window.localStorage.setItem("username", inputRef.current.value);

    // redirect to a private route
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="card">
        <h2>Login form</h2>
        <form onSubmit={login}>
          <label for="username">Username</label>
          <input id="username" type="text" ref={inputRef} />

          <button type="submit">Login</button>
        </form>
      </div>
    </Layout>
  );
};
