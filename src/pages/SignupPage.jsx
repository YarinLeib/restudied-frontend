import { Button } from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function SignupPage() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email.toLowerCase());
    formData.append("password", password);
    formData.append("username", username);
    formData.append("name", name);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    axios
      .post(`${API_URL}/auth/signup`, formData)
      .then(() => {
        return axios.post(`${API_URL}/auth/login`, {
          email: email.toLowerCase(),
          password,
        });
      })
      .then((res) => {
        const { authToken } = res.data;
        storeToken(authToken);
        authenticateUser();
        navigate("/items");
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Signup/Login failed";
        setErrorMessage(msg);
      });
  };

  return (
    <div className="bg-gradient-to-br from-orange-400 to-blue-400 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg transform -translate-y-16">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="profileImage">
              Profile Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              id="profileImage"
              style={{ display: "none" }}
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <label htmlFor="profileImage">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ justifyContent: "flex-start", textTransform: "none" }}
              >
                {profileImage ? profileImage.name : "Choose Profile Image"}
              </Button>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors duration-200"
          >
            Sign Up
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 text-red-600 text-center">{errorMessage}</div>
        )}

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
