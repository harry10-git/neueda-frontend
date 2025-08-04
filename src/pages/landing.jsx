import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

import { Player } from "@lottiefiles/react-lottie-player"; // Import Lottie Player
import investAnimiation from "../assets/Good investment makes it reach the target.json";
import { TypeAnimation } from "react-type-animation";
import AutoSlider from "../components/Slider";

const landing = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div style={{
        backgroundColor: "#fff7f7",
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
      }}
      className="min-h-screen"
    >
      <nav className="bg-amber-500 py-4">
        <h3>space for navbar</h3>
      </nav>

      <div className="grid grid-cols-2">
        <div>
          <Player autoplay loop src={investAnimiation} />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <h3 className="text-3xl">
            Welcome to{" "}
            <span className="text-4xl font-semibold text-violet-600">
              NeuCoin.
            </span>
          </h3>
          <p className="text-xl font-serif">
            Your onestop solution to investment and portfolio management
          </p>

          <TypeAnimation
            sequence={[
              "We help you invest money",
              1000,
              "We help you track money",
              1000,
              "We help you manage money",
              1000
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "1.5em", display: "inline-block" }}
            repeat={Infinity}
          />

          {/* Buttons for Register and Login */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => navigate("/register")}
              className="px-10 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    
        <div className="mt-4">
      <AutoSlider />
        </div>

    
    </div>
  );
};

export default landing;
