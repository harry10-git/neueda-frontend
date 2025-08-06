import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Lottie from "react-lottie-player"; // Import Lottie player
import aiAnimation from "../assets/AI.json"; // Import the Lottie animation

const Chatbot = () => {
  const [prompt, setPrompt] = useState(""); // State to store user input
  const [response, setResponse] = useState(null); // State to store full API response
  const [displayedResponse, setDisplayedResponse] = useState(""); // State to store the typewriter effect text
  const [isLoading, setIsLoading] = useState(true); // State to manage loading animation

  useEffect(() => {
    // Simulate initial loading for a few seconds
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop the initial loading animation
    }, 3000); // Show the animation for 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  useEffect(() => {
    if (response) {
      let index = 0;
      setDisplayedResponse(""); // Clear the displayed response
      const interval = setInterval(() => {
        if (index < response.length) {
          setDisplayedResponse((prev) => prev + response[index]); // Add one letter at a time
          index++;
        } else {
          clearInterval(interval); // Clear the interval when done
        }
      }, 20); // Adjust the speed of the typewriter effect here (50ms per letter)

      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim() === "") return; // Do nothing if the prompt is empty

    setIsLoading(true); // Show the loading animation
    setResponse(null); // Clear previous response
    setDisplayedResponse(""); // Clear the displayed response

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: prompt }), // Send the message to the API
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response from the server.");
      }

      const data = await res.json();
      setResponse(data.parts[0].text); // Extract and set the full response text
    } catch (error) {
      setResponse("An error occurred while fetching the response. Please try again.");
    } finally {
      setIsLoading(false); // Stop the loading animation
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-2xl font-bold ">Welcome to our AI Chatbot</h1>
        <h4 className="text-gray-500 mb-6">Please only ask finance related queries and not investment advice</h4>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <input
            type="text"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className={`mt-4 w-full px-4 py-2 font-bold rounded-lg transition-colors ${
              isLoading
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
            disabled={isLoading} // Disable the button while loading
          >
            Submit
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center">
          {isLoading || response === null ? (
            // Show Lottie animation while loading or when response is null
            <Lottie
              loop
              animationData={aiAnimation}
              play
              style={{ width: 500, height: 500 }}
            />
          ) : (
            // Show the response content with typewriter effect
            <div className="bg-indigo-950 shadow-lg rounded-lg p-6 max-w-3xl hover:scale-110 transition-transform duration-300">
              <p className="text-white whitespace-pre-line">{displayedResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;