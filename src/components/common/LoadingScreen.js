/**
 * LoadingScreen component for initial app loading
 */
import React, { useState, useEffect } from 'react';
import StarryBackground from "../StarryBackground";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen">
      <StarryBackground />
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-8 text-center glow-text animate-pulse">
          Astrimancy Cards
        </h1>
        <div className="w-24 h-24 border-4 border-t-purple-500 border-r-purple-400 border-b-purple-300 border-l-purple-200 rounded-full animate-spin mb-8"></div>
        <p className="text-xl text-gray-300">Loading the cosmic deck...</p>
      </div>
    </div>
  );
}
