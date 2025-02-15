import React from 'react';

export function Hero() {
  return (
    <div
      className="bg-cover bg-center h-[50vh] relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl md:text-2xl text-center">
          Find the best flights and hotels at unbeatable prices
        </p>
      </div>
    </div>
  );
}