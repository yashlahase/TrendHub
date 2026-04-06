import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-primary pt-20">
      <div className="absolute inset-0 z-0">
        {/* Placeholder image from Unsplash for a high-end fashion vibe */}
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
          alt="Fashion Hero"
          className="w-full h-full object-cover opacity-60 scale-110 hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-1000">
          <span className="text-secondary tracking-widest text-sm font-semibold uppercase block mb-4 border-l-2 border-accent pl-4">
            Spring / Summer 2026 Collection
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight">
            Define Your <br />
            <span className="italic text-accent">Personal</span> Style
          </h1>
          <p className="text-secondary/80 text-lg mb-12 max-w-lg leading-relaxed">
            Discover the latest trends from world-class designers. Elevate your wardrobe with pieces that are both timeless and modern.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="btn-primary hover:scale-105 transition-transform duration-300">
              Shop Collection
            </button>
            <button className="btn-outline border-white text-white hover:bg-white hover:text-primary hover:scale-105 transition-transform duration-300">
              Latest Trends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
