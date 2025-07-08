import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ItemCard } from "../components/ItemCard";
import { Rating, Button } from "@mui/material";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

export function PublicProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const [average, setAverage] = useState(null);
  const { user: loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("User fetch error:", err));

    axios
      .get(`${API_URL}/users/${userId}/items`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Items fetch error:", err));
  }, [userId]);

  useEffect(() => {
    if (userId && loggedInUser) {
      axios.get(`${API_URL}/reviews/${userId}`).then((res) => {
        const already = res.data.some(
          (r) => r.reviewer._id === loggedInUser._id
        );
        setAlreadyReviewed(already);
      });

      axios
        .get(`${API_URL}/reviews/average/${userId}`)
        .then((res) => setAverage(res.data));
    }
  }, [userId, loggedInUser]);

  if (!user) return <p className="text-center mt-20">Loading profile...</p>;

  

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
        {loggedInUser && loggedInUser._id !== userId && !alreadyReviewed && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-1">Rate this user:</h3>

            <Rating
              value={newRating}
              onChange={(event, value) => setNewRating(value)}
            />

            <Button
              className="mt-2"
              variant="contained"
              disabled={!newRating}
              onClick={async () => {
                try {
                  await axios.post(
                    "http://localhost:5005/api/reviews",
                    {
                      reviewee: userId,
                      rating: newRating,
                      comment: "No comment",
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "authToken"
                        )}`,
                      },
                    }
                  );
                  setAlreadyReviewed(true);
                  setNewRating(0);
                  const [avg] = await Promise.all([
                    axios.get(`http://localhost:5005/api/reviews/${userId}`),
                    axios.get(
                      `http://localhost:5005/api/reviews/average/${userId}`
                    ),
                  ]);

                  setAverage(avg.data);
                } catch (err) {
                  alert(
                    err.response?.data?.message || "Could not submit rating."
                  );
                }
              }}
            >
              Submit
            </Button>
          </div>
        )}
        {average && (
          <div className="mt-2">
            {average.avgRating !== undefined ? (
              <p className="text-sm text-gray-600">
                Average Rating: {average.avgRating.toFixed(1)} ★ (
                {average.count} reviews)
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">No reviews yet.</p>
            )}
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">{user?.name}'s Items</h2>

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
