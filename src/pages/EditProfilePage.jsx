import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function EditProfilePage() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userData = res.data;
        setUser(userData);
        setUsername(userData.username || "");
        setName(userData.name || "");
        setEmail(userData.email || "");
        setIsLoadingUser(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setIsLoadingUser(false);
      });
  }, []);

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
      .then(() => navigate("/profile"))
      .catch((err) => {
        const msg = err.response?.data?.message || "Profile update failed";
        setErrorMessage(msg);
      });
  };

  if (isLoadingUser) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-gradient-to-br from-blue-400 to-green-400 flex-1 p-4 overflow-y-auto">
      <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
          Edit Profile
        </h1>
        <form onSubmit={handleEditProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="profileImage">
              Profile Image
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

            {profileImage ? (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="New"
                  className="w-24 h-24 object-cover rounded-full border mx-auto"
                />
                <p className="text-center text-sm text-gray-600 mt-1">
                  New Selected Image
                </p>
              </div>
            ) : user?.profileImage ? (
              <div className="mt-2">
                <img
                  src={user.profileImage}
                  alt="Current"
                  className="w-24 h-24 object-cover rounded-full border mx-auto"
                />
                <p className="text-center text-sm text-gray-600 mt-1">
                  Current Image
                </p>
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors duration-200"
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