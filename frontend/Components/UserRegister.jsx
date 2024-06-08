import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("payloads ->", username, email, password);
    const payloads = { username, email, password };

    await axios
      .post(
        "https://nodejsday5-passwordresettask.onrender.com/api/user/register",
        payloads
      )
      .then((res) => {
        setResponseMsg(res.data.message);
        if (res.status === 200) {
          toast.success("Register Successful", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setResponseMsg(err.response.data.message);
      });
    console.log(responseMsg);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "24px" }}>Register</h1>
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
          backgroundColor: "#ef476f",
          margin: "0 auto",
          marginTop: "100px",
          width: "90%",
        }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="exampleInputUsername">Username</label>
          <input
            type="text"
            value={username}
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            marginTop: "24px",
            width: "100px",
            backgroundColor: "#073b4c",
            margin: "20px",
          }}
        >
          Register
        </button>
        <Link to="/login" style={{ margin: "20px", color: "yellow" }}>
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default UserRegister;
