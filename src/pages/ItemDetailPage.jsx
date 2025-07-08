import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

export function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/items/${id}`)
      .then((response) => setItem(response.data))
      .catch((error) => console.error("Error fetching item:", error));
  }, [id]);

  if (!item) {
    return (
      <div className="text-center mt-20 text-gray-500">Loading item...</div>
    );
  }

  return (
    <div className="bg-gray-100 flex-1 p-4 overflow-y-auto">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate("/items")}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ← Back to Items
        </button>

      <div className="bg-white rounded shadow p-6">
        <img
          src={item.itemImage || "https://via.placeholder.com/300"}
          alt={item.title}
          className="w-full h-64 object-contain rounded bg-gray-100"
        />
        <h1 className="text-2xl font-bold mt-4">{item.title}</h1>
        <p className="mt-2 text-gray-700">{item.itemDescription}</p>
        <p className="mt-2 text-sm text-gray-500">
          Location: {item.itemLocation}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Condition: {item.itemCondition}
        </p>
        {item.itemLanguage && (
          <p className="mt-2 text-sm text-gray-500">
            Language: {item.itemLanguage}
          </p>
        )}

        <p className="mt-4">
          <span className="text-sm text-gray-600">Listed by: </span>
          <a
            href={`/users/${item.owner._id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            {item.owner.username}
          </a>
        </p>

        {user && user._id === item.owner._id && (
          <div className="mt-6">
            <button
              onClick={() => navigate("/edit-item/" + item._id)}
              className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Item
            </button>
          </div>
        )}

        {user && user._id !== item.owner._id && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!newMessage.trim()) return;

              try {
                await axios.post(
                  `${API_URL}/messages`,
                  {
                    receiver: item.owner._id,
                    content: newMessage,
                    itemId: item._id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                      )}`,
                    },
                  }
                );
                setNewMessage("");
                alert("Message sent!");
              } catch (err) {
                console.error("Failed to send message:", err);
              }
            }}
            className="mt-6"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write a message to the owner..."
              className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
}
