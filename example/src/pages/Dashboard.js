import React from "react";
import { navigate } from "@reach/router";
import { Layout } from "../components/Layout";

export const Dashboard = () => {
  const [username, setUsername] = React.useState();

  React.useEffect(() => {
    const localUsername = window.localStorage.getItem("username");
    if (Boolean(localUsername)) {
      setUsername(localUsername);
    } else {
      navigate("/");
    }
  }, []);

  return username ? (
    <Layout>
      <div className="card">
        <h2>Dashboard</h2>
        Welcome <strong className="secondary">{username}</strong>
      </div>
    </Layout>
  ) : null;
};
