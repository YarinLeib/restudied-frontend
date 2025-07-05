import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-red-100 to-red-300 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-lg w-full p-8 text-center transform -translate-y-10">
        <div className="flex justify-center mb-4 text-red-600"></div>
        <h1 className="text-4xl font-extrabold text-red-700 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you’re looking for doesn’t exist or was moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
