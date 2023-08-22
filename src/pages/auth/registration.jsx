import React, { useState, useEffect } from "react";
import "./registration.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
    login_status : "",
    messages : [],
  });

  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("Users");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        setLocalData(parsedData);
      }
    }
  }, []);

  const { email, username, password, mobileNumber, dateOfBirth, login_status, messages  } = data;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "email") {
      if (value !== "" && !validateemail(value)) {
        errorMessage = "Invalid email address";
      }
    }

    if (name === "username") {
      if (value !== "" && !validateUsername(value)) {
        errorMessage = "Invalid username";
      }
    }

    if (name === "password") {
      if (value !== "" && !validatePassword(value)) {
        errorMessage = "Invalid Password";
      }
    }

    if (name === "mobileNumber") {
      if (value !== "" && !validateMobileNumber(value)) {
        errorMessage = "Invalid mobile number";
      }
    }

    setData({ ...data, [name]: value, [`${name}Error`]: errorMessage });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newFormData = {
      email,
      username,
      password,
      mobileNumber,
      dateOfBirth,
      login_status ,
      messages,
    };

    const existingUser = localData.find((item) => item.username === username);
    if (existingUser) {
      alert("User already exists");
      return;
    }

    const updatedData = [...localData, newFormData];
    localStorage.setItem("Users", JSON.stringify(updatedData));
    setLocalData(updatedData);
    setData({
      email: "",
      username: "",
      password: "",
      mobileNumber: "",
      dateOfBirth: "",
      messages : [],
    });

    console.log(data);
    navigate("/");
  };

  const validateemail = (email) => {
    const emailPattern = /^[A-Za-z0-9_.]+\@([a-z])+\.[a-z]{3}$/;
    return emailPattern.test(email);
  };

  const validateUsername = (username) => {
    const usernamePattern = /^[a-zA-Z\s]+$/;
    return usernamePattern.test(username);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    return passwordPattern.test(password);
  };

  const validateMobileNumber = (mobileNumber) => {
    const mobileNumberPattern = /^[0-9]{10}$/;
    return mobileNumberPattern.test(mobileNumber);
  };

  return (
    <div className="RegistrationForm">
      <form className="form" onSubmit={submitHandler}>
        <h2>Register </h2>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            value={username}
            onChange={changeHandler}
            required
          />
          {data.usernameError && (
            <span className="error">{data.usernameError}</span>
          )}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="*******"
            id="password"
            value={password}
            onChange={changeHandler}
            required
          />
          {data.passwordError && (
            <span className="error">{data.passwordError}</span>
          )}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={changeHandler}
            required
          />
          {data.emailError && <span className="error">{data.emailError}</span>}
        </div>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            maxLength={10}
            value={mobileNumber}
            onChange={changeHandler}
            required
          />
          {data.mobileNumberError && (
            <span className="error">{data.mobileNumberError}</span>
          )}
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={changeHandler}
            required
          />
        </div>

        <div className="form-group-1">
          <button className="submit">Submit</button>
          <p className="signin" onClick={() => navigate("/")}>
            Sign in
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
