import React, { useEffect, useState } from "react";

export default function AutoSlider() {
  const [images, setImages] = useState([]); // State to store images from the API

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/allStockLogos");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data); // Update state with the fetched images
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .slider-track {
          display: flex;
          width: max-content;
          animation: slide 30s linear infinite;
        }
        .slider-track img {
          height: 12rem; /* Fixed height */
          width: 16rem; /* Fixed width */
          margin: 0; /* Remove gaps between images */
          object-fit: cover; /* Ensure images fill the space */
        }
      `}</style>

      {images.length > 0 ? (
        <div className="slider-track">
          {/* Duplicate images for smooth infinite loop */}
          {images.concat(images).map((src, index) => (
            <img key={index} src={src} alt={`img-${index}`} />
          ))}
        </div>
      ) : (
        <p>Loading images...</p> // Show a loading message while fetching images
      )}
    </div>
  );
}