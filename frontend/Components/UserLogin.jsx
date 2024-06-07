import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login api payloads", password, email);
    const payloads = { password, email };

    await axios
      .post("http://localhost:4000/api/user/login", payloads)
      .then((res) => {
        setResponseMsg(res.data.message);
        setToken(res.data.token);
        if (res.status === 200) {
          toast.success("Login Successful", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setResponseMsg(err.response.data.message);
        toast.error("Login Failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "24px" }}>User login</h1>

      <form
        className="centered-form"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "500px",
          borderRadius: "8px",
          padding: "60px",
          boxSizing: "border-box",
          backgroundColor: "ef476f",
          margin: "0 auto",
          marginTop: "100px",
          width: "90%",
        }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" style={{ color: "white" }}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlForfor="exampleInputPassword1" style={{ color: "white" }}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            marginTop: "24px",
            width: "100px",
            backgroundColor: "073b4c",
            margin: "20px",
          }}
        >
          Login
        </button>
        <p>
          <Link
            to="/reset-password"
            style={{ margin: "20px", color: "yellow" }}
          >
            Forgot Password?
          </Link>
          <Link to="/register" style={{ margin: "20px", color: "yellow" }}>
            New User? Register
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default UserLogin;
