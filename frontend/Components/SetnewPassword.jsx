import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [token, setToken] = useState("");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setResponseMsg("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://nodejsday5-passwordresettask.onrender.com/api/user/setnew-password",
        {
          newPassword,
          token,
        }
      );
      setResponseMsg(response.data.message);
      toast.success("Password Set Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setResponseMsg(
        error.response
          ? error.response.data.message
          : "Failed to set new password"
      );
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "24px" }}>Set New Password</h1>
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
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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
          Confirm
        </button>
      </form>
    </div>
  );
};

export default SetNewPassword;
