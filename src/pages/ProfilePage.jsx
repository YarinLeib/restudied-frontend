import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { ItemCard } from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export function ProfilePage() {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, isLoading, navigate]);

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      axios
        .get(`${API_URL}/items/my-items`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((res) => {
          setItems(res.data);
        })
        .catch((err) => console.error("Failed to fetch items:", err));
    }
  }, [isLoading, isLoggedIn]);

  if (isLoading) return <p>Loading...</p>;

  console.log("User profile image URL:", user?.profileImage);

  return (
    <div className="bg-gray-100 min-h-screen px-4 pt-8 pb-28 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={user?.profileImage || "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-md object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-profile.png";
            }}
          />
          <div>
            <h1 className="text-2xl font-bold">{user?.username}</h1>
            <p className="text-gray-600">{user?.name}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">My Items</h2>

        {items.length === 0 ? (
          <p className="text-gray-500">You haven't added any items yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
