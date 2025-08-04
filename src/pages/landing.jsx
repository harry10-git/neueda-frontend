import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Player } from "@lottiefiles/react-lottie-player"; // Import Lottie Player
import investAnimiation from "../assets/Good investment makes it reach the target.json";
import { TypeAnimation } from "react-type-animation";
import AutoSlider from "../components/Slider";
import Navbar from "../components/Navbar"; // Import Navbar
import { AuthContext } from "../context/authContext"; // Import AuthContext

const Landing = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { user } = useContext(AuthContext); // Get user from AuthContext

  return (
    <div
      style={{
        backgroundColor: "#fff7f7",
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
      }}
      className="min-h-screen"
    >
      {/* Conditionally render Navbar */}
      {user && <Navbar />}

      <div className="grid grid-cols-2 py-4">
        <div>
          <Player autoplay loop src={investAnimiation} />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <h3 className="text-4xl">
            Welcome to{" "}
            <span className="text-4xl font-semibold text-violet-600">
              NeuCoin.
            </span>
          </h3>
          <p className="text-2xl font-serif">
            Your one-stop solution to investment and portfolio management
          </p>

          <TypeAnimation
            sequence={[
              "We help you invest money",
              1000,
              "We help you track money",
              1000,
              "We help you manage money",
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={Infinity}
          />

          {/* Conditional Buttons */}
          <div className="mt-6 flex space-x-4">
            {user ? (
              <button
                onClick={() => navigate("/home")}
                className="px-12 py-3 text-white font-semibold rounded-lg shadow-md  bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))] hover:scale-110 text-xl duration-300"
              >
                Let's dive in
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <AutoSlider />
      </div>
    </div>
  );
};

export default Landing;