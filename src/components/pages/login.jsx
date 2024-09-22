import { useState } from "react";
import { useForm } from "react-hook-form";
import service from "../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/docsslice.js";

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const submit = (data) => {
    service
      .login(data)
      .then((res) => {
        dispatch(login({ data: res }));
        navigate("/");
      })
      .catchatch((err) => {
        console.log("error is ", err);
        setErrorMessage("Invalid email or password.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-black">
      <div className="relative w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full p-4 bg-gray-800 text-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-600" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`w-full p-4 bg-gray-800 text-white border border-gray-300  rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-600" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-transform transform hover:scale-105"
          >
            Submit
          </button>
        </form>

        {/* Error Popup */}
        {errorMessage && (
          <div className="absolute top-4 right-4 p-4 bg-red-600 text-white rounded-lg shadow-lg">
            <p>{errorMessage}</p>
            <button
              className="absolute top-1 right-1 text-xl font-bold"
              onClick={() => setErrorMessage("")}
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
