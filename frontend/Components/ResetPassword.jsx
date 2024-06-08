import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("forgot password api payload", email);
    const payload = { email };

    await axios
      .post(
        "https://nodejsday5-passwordresettask.onrender.com/api/user/reset-password",
        payload
      )
      .then((res) => {
        setResponseMsg(res.data.message);
        toast.success("reset password link sent to your mailid Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
        setResponseMsg("Failed to send reset email");
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "24px" }}>Forgot Password</h1>
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
          marginTop: "50px",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            marginTop: "24px",
            width: "200px",
            backgroundColor: "#073b4c",
            margin: "20px",
          }}
        >
          Send Reset Email
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
