import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

export function LoginPage() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/items";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email: formData.email.toLowerCase(),
        password: formData.password,
      });

      storeToken(res.data.authToken);
      await authenticateUser();
      navigate(from);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setErrorMessage(msg);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-300 to-orange-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg transform -translate-y-10">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Login
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 text-red-600 text-center">
            <p>{errorMessage}</p>
          </div>
        )}

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
