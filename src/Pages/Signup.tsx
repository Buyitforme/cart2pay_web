import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading, Text } from "../Components/Typography";
import { Button } from "../Components/Button";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email");
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("Invalid phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (validateForm()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setModalOpen(true);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-4 left-4">
        <Link to="/">
          {/* Logo */}
          <div className="flex-shrink-0 h-auto">
            <Link to="/" className="flex">
              <Heading
                size="xl"
                weight="bold"
                color="default"
                className="cursor-pointer text-2xl"
              >
                Cart2
              </Heading>
              <Heading
                size="xl"
                weight="bold"
                color="primary"
                className="cursor-pointer text-2xl"
              >
                PAY
              </Heading>
            </Link>
          </div>
        </Link>
      </div>
      <div className="w-full max-w-md p-8 mt-24 space-y-8 bg-white rounded-lg shadow-md lg:w-3/8 lg:mx-auto">
        <div className="flex flex-col items-start space-y-2">
          <div className="flex gap-2 justify-start items-center">
            <Heading
              size="xl"
              weight="bold"
              color="default"
              className="text-2xl"
            >
              Let's get started
            </Heading>
            <span className="text-4xl">🎉</span>
          </div>

          <Text
            size="sm"
            weight="medium"
            color="subtle"
            className="w-full "
          >
            No more cart abandonment, Register to get started today!
          </Text>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            Create account
          </Button>
        </form>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary">
            Login
          </Link>
        </p>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold">Congratulations!</h2>
            <p>You've taken the first step on clearing your cart.</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setModalOpen(false);
                navigate("/login");
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
