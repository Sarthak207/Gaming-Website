import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";
import axios from "axios";

// Categories for filtering
const categories = ["All", "RPG", "FPS", "MMORPG", "Racing", "Survival", "Strategy"];

const GameCard = ({ gameId, index }) => {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const getGame = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/games/${gameId}`);
        console.log(res.data);
        setGameData(res.data);
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    getGame();
  }, [gameId]);

  if (!gameData) {
    return <div>Loading...</div>;
  }

  const discountedPrice = gameData.discount
    ? (gameData.price - (gameData.price * gameData.discount) / 100).toFixed(2)
    : null;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.75)}
      className="w-full sm:w-[300px] bg-[#1A1A1D] rounded-xl overflow-hidden shadow-lg border border-[#FFD700] group hover:transform hover:scale-105 transition-all duration-300"
    >
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={gameData.image}
          alt={gameData.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x180?text=Game+Image";
          }}
        />
        {gameData.discount > 0 && (
          <div className="absolute top-2 right-2 bg-[#FF3131] text-white px-2 py-1 rounded-md font-bold text-sm">
            {gameData.discount}% OFF
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-[#FFD700] px-2 py-1 rounded-md text-sm">
          {gameData.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-[#FFD700] font-bold text-xl">{gameData.title}</h3>
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(gameData.rating) ? "text-[#FFD700]" : "text-gray-400"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1 text-white text-sm">{gameData.rating}</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {gameData.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            {gameData.discount > 0 ? (
              <div>
                <span className="text-gray-400 line-through text-sm">${gameData.price}</span>
                <span className="text-white font-bold ml-2">${discountedPrice}</span>
              </div>
            ) : (
              <span className="text-white font-bold">${gameData.price}</span>
            )}
          </div>
          <button className="bg-[#FF3131] hover:bg-red-700 text-white px-3 py-1 rounded-md font-medium text-sm transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Games = () => {
  const [games, setGames] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/games");
        setGames(res.data);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = activeCategory === "All"
    ? games
    : games.filter((game) => game.category === activeCategory);

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="mt-10">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-[#FFD700] uppercase`}>
          Browse Our Collection
        </p>
        <h2 className={`${styles.sectionHeadText} text-[#FF3131]`}>
          Featured <span className="text-[#FFD700]">Games</span>
        </h2>
      </motion.div>

      {/* Filter and Sort */}
      <div className="flex flex-wrap justify-between items-center mt-8 mb-6">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-[#FFD700] text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-8 flex flex-wrap gap-7 justify-center"
      >
        {sortedGames.map((game, index) => (
          <GameCard key={game.id} gameId={game.id} index={index} />
        ))}
      </motion.div>

      <div className="flex justify-center mt-10">
        <button className="bg-[#FFD700] hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105">
          Load More Games
        </button>
      </div>
    </div>
  );
};

export default SectionWrapper(Games, "games");
