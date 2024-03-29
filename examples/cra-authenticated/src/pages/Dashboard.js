import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";

export const Dashboard = () => {
  const [username, setUsername] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    const localUsername = window.localStorage.getItem("username");
    if (Boolean(localUsername)) {
      setUsername(localUsername);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return username ? (
    <Layout>
      <div className="card">
        <h1>Dashboard</h1>
        Welcome <strong className="secondary">{username}</strong>
      </div>
    </Layout>
  ) : null;
};
