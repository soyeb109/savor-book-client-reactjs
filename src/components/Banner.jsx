import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <section
      className="relative flex items-center justify-center h-64 md:h-[400px] lg:h-[500px] bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 text-white px-6 text-center overflow-hidden rounded-lg shadow-lg"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.75)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 opacity-70 rounded-lg"></div>
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to Savor Book!
        </h1>
        <p className="text-lg md:text-xl font-semibold drop-shadow-md">
          <Typewriter
            words={[
              "Discover Delicious Recipes",
              "Share Your Culinary Creations",
              "Cook, Taste & Enjoy!",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </p>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-yellow-400 via-red-400 to-pink-400 opacity-60 rounded-b-lg pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
};

export default Banner;
