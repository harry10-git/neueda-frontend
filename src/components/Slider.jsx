import React from "react";

// Import images directly
import img1 from "../assets/images-stocks/1.JPG";
import img2 from "../assets/images-stocks/2.JPG";
import img3 from "../assets/images-stocks/3.jpeg";
import img4 from "../assets/images-stocks/4.JPEG";
import img5 from "../assets/images-stocks/5.JPG";
import img6 from "../assets/images-stocks/6.JPG";
import img7 from "../assets/images-stocks/7.PNG";
import img8 from "../assets/images-stocks/8.JPG";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function AutoSlider() {
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

      <div className="slider-track">
        {/* Duplicate images for smooth infinite loop */}
        {images.concat(images).map((src, index) => (
          <img key={index} src={src} alt={`img-${index}`} />
        ))}
      </div>
    </div>
  );
}