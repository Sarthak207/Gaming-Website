import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

// Sample game data (you would move this to your constants file)
const gamesData = [
  {
    id: 1,
    title: "Cyber Legends",
    category: "RPG",
    image: "/src/assets/game1.webp",
    rating: 4.8,
    price: 59.99,
    discount: 15,
    tags: ["Open World", "Action", "Adventure"],
  },
  {
    id: 2,
    title: "Battlefield Heroes",
    category: "FPS",
    image: "/src/assets/game2.webp",
    rating: 4.5,
    price: 49.99,
    discount: 0,
    tags: ["Multiplayer", "Shooter", "Strategy"],
  },
  {
    id: 3,
    title: "Fantasy Realms",
    category: "MMORPG",
    image: "/src/assets/game3.webp",
    rating: 4.7,
    price: 39.99,
    discount: 25,
    tags: ["Fantasy", "Multiplayer", "Role-Playing"],
  },
  {
    id: 4,
    title: "Speed Racers",
    category: "Racing",
    image: "/src/assets/game4.webp",
    rating: 4.3,
    price: 29.99,
    discount: 0,
    tags: ["Racing", "Simulation", "Sports"],
  },
  {
    id: 5,
    title: "Zombie Apocalypse",
    category: "Survival",
    image: "/src/assets/game5.webp",
    rating: 4.6,
    price: 44.99,
    discount: 10,
    tags: ["Horror", "Survival", "Action"],
  },
  {
    id: 6,
    title: "Tactical Warfare",
    category: "Strategy",
    image: "/src/assets/game6.webp",
    rating: 4.2,
    price: 34.99,
    discount: 0,
    tags: ["Strategy", "Military", "Tactical"],
  },
];

// Categories for filtering
const categories = ["All", "RPG", "FPS", "MMORPG", "Racing", "Survival", "Strategy"];

const GameCard = ({ game, index }) => {
  const discountedPrice = game.discount 
    ? (game.price - (game.price * game.discount / 100)).toFixed(2) 
    : null;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.75)}
      className="w-full sm:w-[300px] bg-[#1A1A1D] rounded-xl overflow-hidden shadow-lg border border-[#FFD700] group hover:transform hover:scale-105 transition-all duration-300"
    >
      <div className="relative h-[180px] overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" 
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x180?text=Game+Image";
          }}
        />
        {game.discount > 0 && (
          <div className="absolute top-2 right-2 bg-[#FF3131] text-white px-2 py-1 rounded-md font-bold text-sm">
            {game.discount}% OFF
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-[#FFD700] px-2 py-1 rounded-md text-sm">
          {game.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-[#FFD700] font-bold text-xl">{game.title}</h3>
        
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(game.rating) ? "text-[#FFD700]" : "text-gray-400"}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1 text-white text-sm">{game.rating}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {game.tags.map((tag, index) => (
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
            {game.discount > 0 ? (
              <div>
                <span className="text-gray-400 line-through text-sm">${game.price}</span>
                <span className="text-white font-bold ml-2">${discountedPrice}</span>
              </div>
            ) : (
              <span className="text-white font-bold">${game.price}</span>
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
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  
  // Filter games by category
  const filteredGames = activeCategory === "All" 
    ? gamesData 
    : gamesData.filter(game => game.category === activeCategory);
  
  // Sort games based on selected option
  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default: // featured
        return 0; // maintain original order
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

      {/* Filter and Sort Options */}
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
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <motion.div 
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-8 flex flex-wrap gap-7 justify-center"
      >
        {sortedGames.map((game, index) => (
          <GameCard key={game.id} game={game} index={index} />
        ))}
      </motion.div>

      {/* Load More Button */}
      <div className="flex justify-center mt-10">
        <button className="bg-[#FFD700] hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105">
          Load More Games
        </button>
      </div>
    </div>
  );
};

export default SectionWrapper(Games, "games");