import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, isLoggedIn, setUser } from "../User";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitButtonDisabled, setSubmitButtomDisabled] = useState(false);
  const [error, setError] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/home");
    }
  });

  //Function to handle hide and show password
  const toggleHandlePassword = () => {
    setShowPassword(!showPassword);
  };

  //Function to handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(getUser());
    if (!loginDetails.email || !loginDetails.password || !confirmPass) {
      setError("Please fill all details");
      return;
    }
    if (confirmPass !== loginDetails.password) {
      setError("Both passwords don not match");
      return;
    }
    setSubmitButtomDisabled(true);
    console.log(loginDetails);
    axios
      .post(`http://localhost:8080/login`, loginDetails)
      .then((res) => {
        setSubmitButtomDisabled(false);
        console.log(res.data);
        setUser(res.data);
        console.log(getUser());
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        setSubmitButtomDisabled(false);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Login</h1>
      <form action="">
        <div className="flex flex-col justify-center mb-8">
          <label className="text-[24px]">Email:</label>
          <input
            type="email"
            required
            onChange={(event) =>
              setLoginDetails((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
            className="focus:outline-none border border-black rounded-[5px] h-[40px] w-[320px] text-[20px]"
          />
        </div>
        <div className="flex flex-col justify-center mb-8">
          <div className="flex flex-row justify-between items-center">
            <label className="text-[24px]">Password:</label>
            {showPassword ? (
              <EyeOff onClick={toggleHandlePassword} />
            ) : (
              <Eye onClick={toggleHandlePassword} />
            )}
          </div>
          <input
            type={showPassword ? "text" : "password"}
            required
            onChange={(event) =>
              setLoginDetails((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            className="focus:outline-none border border-black rounded-[5px] h-[40px] w-[320px] text-[20px]"
          />
        </div>
        <div className="flex flex-col justify-center mb-8">
          <div className="flex flex-row justify-between items-center">
            <label className="text-[24px]">Confirm Password:</label>
            {showPassword ? (
              <EyeOff onClick={toggleHandlePassword} />
            ) : (
              <Eye onClick={toggleHandlePassword} />
            )}
          </div>
          <input
            type={showPassword ? "text" : "password"}
            required
            onChange={(e) => setConfirmPass(e.target.value)}
            className="focus:outline-none border border-black rounded-[5px] h-[40px] w-[320px] text-[20px]"
          />
        </div>
        <div className="flex align-center justify-center my-2 text-[#ff0e0e] text-lg">
          {error}
        </div>
        <div className="">
          <input
            type="submit"
            value="Login"
            onClick={handleLogin}
            disabled={submitButtonDisabled}
            className="border border-black rounded-[5px] h-[40px] w-[320px] text-[20px] mb-8"
          />
        </div>
        <div>
          <Link to="/signup" className="no-underline flex justify-center">
            Don't have an account? SignUp
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
