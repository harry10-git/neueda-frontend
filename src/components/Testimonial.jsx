import React, { useState } from "react";
import person1 from "../assets/people/1.JPG"; // Import local image for person 1
import person2 from "../assets/people/2.JPG"; // Import local image for person 2
import person3 from "../assets/people/5.JPG"; // Import local image for person 3

const testimonials = [
  {
    id: 1,
    image: person1, // Use local image
    message: "NeuCoin has completely transformed the way I manage my investments. Highly recommended!",
    name: "John Doe",
  },
  {
    id: 2,
    image: person2, // Use local image
    message: "The platform is intuitive and easy to use. I love tracking my portfolio here.",
    name: "Jane Smith",
  },
  {
    id: 3,
    image: person3, // Use local image
    message: "NeuCoin provides excellent insights and tools for investment management.",
    name: "Alice Johnson",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 text-gray-500 hover:text-gray-700 focus:outline-none text-4xl z-10"
        >
          &#8592;
        </button>

        {/* Testimonial Content */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex items-center bg-white shadow-md rounded-lg p-6 w-full flex-shrink-0"
              >
                {/* Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full object-cover mr-6"
                />
                {/* Message and Name */}
                <div>
                  <p className="text-gray-700 text-lg italic mb-4">
                    "{testimonial.message}"
                  </p>
                  <p className="text-gray-900 font-bold text-xl">
                    - {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 text-gray-500 hover:text-gray-700 focus:outline-none text-4xl z-10"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Testimonial;