import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, pass }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Invalid username or password");
        return;
      }
      console.log("Login successful", data);
      setErrorMessage("");
      navigate("/products", { replace: true });
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center w-2/5 p-10 bg-white">
        <div className="mb-12">
          <img
            src="src/assets/imgs/logo.png"
            alt="Logo"
            className="h-20 w-30"
          />
        </div>
        <h2 className="text-3xl font-bold mb-6">Login</h2>

        {errorMessage && (
          <div className="mb-4 text-red-600">{errorMessage}</div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-black"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-black"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="keep-signed-in"
                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <label
                htmlFor="keep-signed-in"
                className="ml-2 block text-sm text-black"
              >
                Keep me signed in
              </label>
            </div>
            <div>
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-black text-white font-bold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Login
          </button>
        </form>
        <a href="#" className="flex mt-10 text-center text-sm text-black-800">
          Have trouble or need help?{" "}
        </a>
      </div>

      <div className="flex flex-col justify-center w-3/5 bg-gradient-to-r from-purple-300 via-purple-200 to-white p-20">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Manage your designs for your clients in one place.
          </h2>
          <p className="text-gray-700 mb-8">Increased customer acquisition.</p>
        </div>
        <div className="flex">
          <div className="bg-white p-4 rounded-xl shadow-lg flex-col items-center my-auto mt-20">
            <div className="flex">
              <img
                src="src/assets/imgs/user.png"
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900">
                  Leen Fahed
                </p>
                <p className="text-sm text-gray-500">fahedleen@gmail.com</p>
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <span className="mb-3 text-sm text-gray-700">Admin</span>
              <span className="mb-3 inline-block px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md ml-40 mt-40 h-24 w-60">
            <p className="text-gray-700">Income 2023</p>
            <div className="h-5 w-full bg-gray-100 rounded-md">
              <img
                src="src/assets/imgs/stat.png"
                alt="Arrow Icon"
                className="h-10 w-full"
              />
            </div>
          </div>
        </div>
        <div className="ml-60 mb-20 flex items-end">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg shadow-md">
            <img
              src="src/assets/imgs/up-right-arrow.png"
              alt="Arrow Icon"
              className="h-6 w-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
