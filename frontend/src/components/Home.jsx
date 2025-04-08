import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { Link } from "react-router-dom";

// Mock featured games data (would come from API in production)
const featuredGames = [
  {
    id: 1,
    title: "Tic Tak Toe",
    genre: "Arcade",
    rating: 4.8,
    image: "src/assets/image.png",
    url: "/index.html",
  },
  {
    id: 2,
    title: "Stone Paper Scissors",
    genre: "FPS",
    rating: 4.6,
    url: "/stonePaper.html",
    image: "src/assets/Image2.png",
  },
  {
    id: 3,
    title: "Galactic Conquest",
    genre: "Strategy",
    rating: 4.7,
    image: "src/assets/games/game3.jpg",
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate featured games
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredGames.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const GameCard = ({ game }) => (
    <div className="bg-black/40 backdrop-blur-sm p-5 rounded-lg shadow-xl border border-[#FFD700]/20 flex flex-col h-full transform transition-all duration-300 hover:scale-105">
      <div className="h-48 relative overflow-hidden rounded-lg mb-4">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${game.image || 'src/assets/tech/contrabg2.jpeg'})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        <div className="absolute bottom-2 right-2 bg-[#FFD700] text-black px-2 py-1 rounded-md text-sm font-bold">
          {game.rating}★
        </div>
      </div>
      <h3 className="text-xl text-white font-bold mb-1">{game.title}</h3>
      <p className="text-[#FFD700] text-sm mb-2">{game.genre}</p>
      <p className="text-gray-300 text-sm mb-4 flex-grow">Experience the ultimate adventure in this award-winning game.</p>
  
      {game.url ? (
        <a 
          href={game.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#FF3131] text-white py-2 px-4 rounded-md hover:bg-[#FF3131]/80 transition-colors w-full text-center"
        >
          Play Now
        </a>
      ) : (
        <button className="bg-[#FF3131] text-white py-2 px-4 rounded-md hover:bg-[#FF3131]/80 transition-colors w-full">
          Play Now
        </button>
      )}
    </div>
  );
  

  return (
    <section className="w-full min-h-screen">
      {/* Hero Section with Carousel */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${featuredGames[currentIndex]?.image || 'src/assets/tech/contrabg2.jpeg'})`,
            filter: "blur(2px)",
          }}
        />
        
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />

        {/* Main Content */}
        <div className="relative z-10 pt-32 px-6 md:px-12 lg:px-24 h-full flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h1 className={`${styles.heroHeadText} text-[#FF3131] font-bold uppercase`}>
              <span className="text-[#FFD700]">GameVerse! 🎮🔥</span>
            </h1>
            <p className={`${styles.heroSubText} mt-4 text-white leading-relaxed`}>
              Experience the ultimate gaming adventure with thrilling action, heart-pounding battles, and immersive storylines.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="bg-[#FFD700] text-black px-8 py-3 rounded-lg text-lg font-semibold uppercase transition-all duration-300 hover:bg-white shadow-lg">
                Explore Games
              </button>
              <Link to="/register" className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] px-8 py-3 rounded-lg text-lg font-semibold uppercase transition-all duration-300 hover:bg-[#FFD700] hover:text-black shadow-lg">
                Join Now
              </Link>
            </div>
          </motion.div>

          {/* Game Stats Section */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-auto mb-12 text-center">
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-[#FFD700]/20">
              <h3 className="text-[#FFD700] text-3xl font-bold">1000+</h3>
              <p className="text-white text-sm">Games</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-[#FFD700]/20">
              <h3 className="text-[#FFD700] text-3xl font-bold">10M+</h3>
              <p className="text-white text-sm">Players</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-[#FFD700]/20">
              <h3 className="text-[#FFD700] text-3xl font-bold">200+</h3>
              <p className="text-white text-sm">Tournaments</p>
            </div>
          </div>
          
          {/* Image Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {featuredGames.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-[#FFD700] w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Games Section */}
      <div className="bg-black py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#FFD700] font-bold mb-10 text-center">
            Featured Games
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="canvas-loader"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <button className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] px-8 py-3 rounded-lg text-lg font-semibold uppercase transition-all duration-300 hover:bg-[#FFD700] hover:text-black">
              View All Games
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;