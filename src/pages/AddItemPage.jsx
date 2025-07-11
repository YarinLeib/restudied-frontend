import { useState } from "react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export function AddItemPage() {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading, navigate]);
  const [formData, setFormData] = useState({
    title: "",
    itemDescription: "",
    itemLocation: "",
    itemCategory: "",
    itemCondition: "",
    itemLanguage: "",
    itemImage: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.itemDescription)
      newErrors.itemDescription = "Description is required.";
    if (!formData.itemLocation)
      newErrors.itemLocation = "Location is required.";
    if (!formData.itemCategory)
      newErrors.itemCategory = "Category is required.";
    if (!formData.itemCondition)
      newErrors.itemCondition = "Condition is required.";
    if (!formData.itemImage) newErrors.itemImage = "Image is required.";
    if (formData.itemCategory === "Books" && !formData.itemLanguage) {
      newErrors.itemLanguage = "Language is required for books.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, itemImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          formPayload.append(key, value);
        }
      });

      const token = localStorage.getItem("authToken");

      const response = await axios.post(`${API_URL}/items`, formPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/items");
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error adding item:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-400 to-yellow-400 flex-1 p-4 overflow-y-auto">
      <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Add New Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="itemDescription"
              className="block text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter description"
            ></textarea>
            {errors.itemDescription && (
              <p className="text-red-600 text-sm mt-1">
                {errors.itemDescription}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="itemLocation" className="block text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="itemLocation"
              value={formData.itemLocation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter location"
            />
            {errors.itemLocation && (
              <p className="text-red-600 text-sm mt-1">{errors.itemLocation}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="itemCategory" className="block text-gray-700 mb-2">
              Category
            </label>
            <select
              name="itemCategory"
              value={formData.itemCategory}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Select Category</option>
              <option value="Books">Books</option>
              <option value="Tech">Tech</option>
              <option value="Stationery">Stationery</option>
              <option value="Clothing">Clothing</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Other">Other</option>
            </select>
            {errors.itemCategory && (
              <p className="text-red-600 text-sm mt-1">{errors.itemCategory}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="itemCondition" className="block text-gray-700 mb-2">
              Condition
            </label>
            <select
              name="itemCondition"
              value={formData.itemCondition}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Select condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Used">Used</option>
            </select>
            {errors.itemCondition && (
              <p className="text-red-600 text-sm mt-1">
                {errors.itemCondition}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="itemLanguage" className="block text-gray-700 mb-2">
              Language
            </label>
            <input
              type="text"
              name="itemLanguage"
              value={formData.itemLanguage}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="English, Dutch..."
            />
            {errors.itemLanguage && (
              <p className="text-red-600 text-sm mt-1">{errors.itemLanguage}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="itemImage" className="block text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              name="itemImage"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.itemImage && (
              <p className="text-red-600 text-sm mt-1">{errors.itemImage}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 mb-4"
          >
            {loading ? "Submitting..." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
}
