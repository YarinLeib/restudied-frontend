import { useState, useEffect } from "react";
import axios from "axios";
import { ItemCard } from "../components/ItemCard";

export function ItemListPage() {
  const [items, setItems] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesTitle = item.title
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const matchesLocation = item.itemLocation
      .toLowerCase()
      .includes(filterLocation.toLowerCase());
    const matchesCategory = filterCategory
      ? item.itemCategory.includes(filterCategory)
      : true;
    return matchesTitle && matchesLocation && matchesCategory;
  });

  return (
    <div className="bg-gray-100 min-h-screen p-8 pb-32 overflow-y-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Available Items</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search by title..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full md:w-1/2"
        />
        <input
          type="text"
          placeholder="Search by location..."
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full md:w-1/2"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full md:w-1/3"
        >
          <option value="">All Categories</option>
          <option value="Books">Books</option>
          <option value="Tech">Tech</option>
          <option value="Stationery">Stationery</option>
          <option value="Clothing">Clothing</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
