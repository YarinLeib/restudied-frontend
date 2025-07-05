import { Link } from "react-router-dom";

export function ItemCard({ item }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <Link to={`/items/${item._id}`}>
        <img
          src={item.itemImage || "https://via.placeholder.com/300"}
          alt={item.title || "Item"}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <h2 className="text-xl font-semibold mt-2">
          {item.title || "Untitled"}
        </h2>
        <p className="text-gray-500 mt-2">
          Description: {item.itemDescription || "No description available."}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Location: {item.itemLocation}
        </p>
      </Link>
    </div>
  );
}
