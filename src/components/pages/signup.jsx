import React from "react";
import { useForm } from "react-hook-form";
import service from "../appwrite/config.js";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submit(e) {
    service
      .signup(e)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black p-4">
      <div className="relative w-full max-w-md p-6 bg-white bg-opacity-10 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <input
              type="text"
              className="w-full bg-black bg-opacity-20 border border-gray-300 p-4 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Name"
              {...register("name", { required: true, minLength: 3 })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                Name is required and should be at least 3 characters long.
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              className="w-full bg-black bg-opacity-20 border border-gray-300 p-4 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                Invalid email address.
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              className="w-full bg-black bg-opacity-20 border  border-gray-300 p-4 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password is required and should be at least 6 characters long.
              </p>
            )}
          </div>
          <div>
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg cursor-pointer transition-all"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
