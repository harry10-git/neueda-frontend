import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext"; // Import AuthContext for user data

const News = () => {
  const { user } = useContext(AuthContext); // Access user from context
  const [news, setNews] = useState([]); // State to store news data
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (user && user.user_id) {
          const response = await fetch(`http://localhost:3001/api/stockNews/${user.user_id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setNews(data); // Update state with fetched news
        }
      } catch (err) {
        setError(err.message); // Handle errors
      }
    };

    fetchNews();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <h3 className="text-center text-3xl font-serif mb-6">News Section</h3>
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {news.length > 0 ? (
        <div className="space-y-6 w-full max-w-4xl">
          {news.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 bg-white shadow-md rounded-lg p-4"
            >
              {/* News Image */}
              <img
                src={item.image}
                alt={item.headline}
                className="w-32 h-32 object-cover rounded-md"
              />
              {/* News Details */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {item.headline}
                  </a>
                </h4>
                <p className="text-sm text-gray-600 mb-2">{item.summary}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Stock:</span> {item.stock} |{" "}
                  <span className="font-semibold">Source:</span> {item.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading news...</p>
      )}
    </div>
  );
};

export default News;