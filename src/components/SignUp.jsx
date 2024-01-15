import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../User";
import axios from "axios";
import { nanoid } from "nanoid";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitButtonDisabled, setSubmitButtomDisabled] = useState(false);
  const [error, setError] = useState("");
  const [signupDetails, setSignupDetails] = useState({
    id: nanoid(),
    email: "",
    password: "",
    name: "",
    phone: "",
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

  //Function to handle Signup
  const handleSignup = (e) => {
    e.preventDefault();
    if (
      !signupDetails.email ||
      !signupDetails.password ||
      !signupDetails.name ||
      !signupDetails.phone
    ) {
      setError("Please fill all details");
      return;
    }
    setSubmitButtomDisabled(true);
    axios
      .post(`http://localhost:8080/signup`, signupDetails)
      .then((res) => {
        console.log(res.data);
        setSubmitButtomDisabled(false);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        setSubmitButtomDisabled(false);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>SignUp</h1>
      <form action="">
        <div className="">
          <div className="flex flex-row justify-center items-center gap-[32px]">
            <div className="flex flex-col">
              <label className="text-[24px]">Email:</label>
              <input
                type="email"
                required
                onChange={(event) =>
                  setSignupDetails((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                className="focus:outline-none border border-black rounded-[5px] h-[40px] w-[320px] text-[20px] mb-8"
              />
            </div>
            <div className="">
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
                  setSignupDetails((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                className="focus:outline-none border border-black rounded-[5px] h-[40px] w-[320px] text-[20px] mb-8"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-[32px]">
            <div className="flex flex-col">
              <label className="text-[24px]">Full Name:</label>
              <input
                type="text"
                required
                onChange={(event) =>
                  setSignupDetails((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                className="focus:outline-none border border-black rounded-[5px] h-[40px] w-[320px] text-[20px] mb-8"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[24px]">Phone No:</label>
              <input
                type="number"
                required
                onChange={(event) =>
                  setSignupDetails((prev) => ({
                    ...prev,
                    phone: event.target.value,
                  }))
                }
                className="focus:outline-none border border-black rounded-[5px] h-[40px] w-[320px] text-[20px] mb-8"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex align-center justify-center my-2 text-[#ff0e0e] text-lg">
            {error}
          </div>
          <div>
            <input
              type="submit"
              value="SignUp"
              onClick={handleSignup}
              disabled={submitButtonDisabled}
              className="border border-black rounded-[5px] h-[40px] w-[320px] text-[20px] mb-8 bg-[#CAE9FF]"
            />
          </div>
          <div>
            <Link to="/login" className="no-underline flex justify-center">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
