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

  const [reportData, setReportData] = useState({
    reason: "",
    message: "",
  });

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

  const handleSubmitRating = async () => {
    try {
      await axios.post(
        `${API_URL}/reviews`,
        {
          reviewee: userId,
          rating: newRating,
          comment: "No comment",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setAlreadyReviewed(true);
      setNewRating(0);
      const [avg] = await Promise.all([
        axios.get(`${API_URL}/reviews/${userId}`),
        axios.get(`${API_URL}/reviews/average/${userId}`),
      ]);
      setAverage(avg.data);
    } catch (err) {
      alert(err.response?.data?.message || "Could not submit rating.");
    }
  };

  const handleReportUser = async () => {
    try {
      await axios.post(
        `${API_URL}/reports`,
        {
          reportedUser: userId,
          reason: reportData.reason,
          message: reportData.message || "",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      alert("Reported successfully");
      setReportData({ reason: "", message: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Report failed.");
    }
  };

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

        {average && (
          <div className="mb-4 text-sm text-gray-700">
            Average Rating: {average.avgRating?.toFixed(1) || "N/A"} ★ (
            {average.count || 0} reviews)
          </div>
        )}

        {loggedInUser && loggedInUser._id !== userId && (
          <div className="mt-4 flex flex-col sm:flex-row gap-6 items-start">
            {!alreadyReviewed && (
              <div>
                <h3 className="text-lg font-semibold mb-1">Rate this user:</h3>
                <Rating
                  value={newRating}
                  onChange={(event, value) => setNewRating(value)}
                />
                <Button
                  className="mt-2"
                  variant="contained"
                  size="small"
                  disabled={!newRating}
                  onClick={handleSubmitRating}
                >
                  Submit
                </Button>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-red-700 mb-1">
                Report
              </h3>
              <select
                className="border border-gray-300 rounded p-1 text-sm"
                value={reportData.reason}
                onChange={(e) =>
                  setReportData((prev) => ({
                    ...prev,
                    reason: e.target.value,
                    message: "", // reset message if reason changes
                  }))
                }
              >
                <option value="">Select</option>
                <option value="Inappropriate Content">Inappropriate</option>
                <option value="Spam">Spam</option>
                <option value="Harassment">Harassment</option>
                <option value="Other">Other</option>
              </select>

              {reportData.reason === "Other" && (
                <textarea
                  placeholder="Optional comment"
                  className="mt-2 p-1 border border-gray-300 rounded text-sm w-full"
                  rows={2}
                  value={reportData.message}
                  onChange={(e) =>
                    setReportData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                />
              )}

              <Button
                className="mt-2"
                variant="outlined"
                color="error"
                size="small"
                disabled={!reportData.reason}
                onClick={handleReportUser}
              >
                Report
              </Button>
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold mt-10 mb-4">
          {user?.name}'s Items
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-500">This user hasn't added any items yet.</p>
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
