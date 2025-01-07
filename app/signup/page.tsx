"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      // API call to create the user in the database
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create account");
      }

      // Automatically log the user in after successful signup
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (signInResponse?.error) {
        setError(signInResponse.error);
      } else {
        console.log("User signed up and logged in successfully");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex max-w-3xl w-full p-6 bg-white rounded-lg shadow-lg mb-20">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Welcome to Bleshita</h2>

          {error && <div className="mb-4 text-red-600">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link href="/api/auth/signin" className="text-indigo-600 hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div
          className="hidden md:block w-1/2 bg-cover bg-center rounded-r-lg"
          style={{
            backgroundImage: 'url("/assets/new/new4.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
};

export default SignUp;
