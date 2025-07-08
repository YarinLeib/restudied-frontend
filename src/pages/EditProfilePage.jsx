import { Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function EditProfilePage() {
  const { authenticateUser, setUser } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setCurrentPassword(e.target.value);
  const handleNewPassword = (e) => setNewPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("name", name);
    if (newPassword) formData.append("newPassword", newPassword);
    if (currentPassword) formData.append("password", currentPassword);
    if (profileImage) formData.append("profileImage", profileImage);

    axios
      .put(`${API_URL}/auth/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Profile update response:", response.data);
        
        setUser(response.data);
        
        authenticateUser();
        navigate("/profile");
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Profile update failed";
        setErrorMessage(msg);
      });
  };
  return (
    <div className="bg-gradient-to-br from-blue-400 to-green-400 flex-1 p-4 overflow-y-auto">
      <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
          Edit Profile
        </h1>
        <form onSubmit={handleEditProfileSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsername}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={handleName}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmail}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              value={currentPassword}
              onChange={handlePassword}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={handleNewPassword}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="profileImage">
              Profile Image URL
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
            {user?.profileImage && !profileImage && (
              <div className="mt-2">
                <img
                  src={user.profileImage}
                  alt="Current profile"
                  className="w-24 h-24 object-cover rounded-full border mx-auto"
                  key={user.profileImage} // Force re-render when URL changes
                />
                <p className="text-center text-sm text-gray-600 mt-1">
                  Current Image
                </p>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors duration-200 mb-4"
          >
            Save Changes
          </button>
        </form>
        {errorMessage && (
          <div className="mt-4 text-red-600 text-center">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
