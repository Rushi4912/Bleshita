"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      // Here we're trying to sign in using the credentials provider
      // If you need to create an account, consider handling this on your backend instead
      const response = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        // Adding firstName and lastName for custom handling, if required
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      if (response?.error) {
        setError(response.error); // Set error if there was one
      } else {
        // Successfully signed in (or registered depending on your logic)
        console.log("User signed up successfully");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
              <label htmlFor="firstName" className="block text-gray-600 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-600 font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black"
                placeholder="Enter your last name"
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
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
    </div>
  );
};

export default SignUp;
