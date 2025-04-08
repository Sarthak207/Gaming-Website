import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
// import { FaDiscord, FaTwitter, FaTwitch, FaYoutube, FaSteam } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1D] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="GameVerse" className="w-10 h-10 object-contain" />
              <span className="text-[#FFD700] text-xl font-bold">GameVerse</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              The ultimate gaming platform where legends are born. Join thousands of players 
              in the most immersive gaming experiences across all platforms.
            </p>
            <div className="flex space-x-4">
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                {/* <FaDiscord size={24} /> */}Discord
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                {/* <FaTwitter size={24} /> */} Twitter
              </a>
              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                {/* <FaTwitch size={24} /> */} Twitch
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                {/* <FaYoutube size={24} /> */} YouTube
              </a>
              <a href="https://store.steampowered.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                {/* <FaSteam size={24} /> */} Steam
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#FFD700] font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-400 hover:text-white transition-colors">Games</Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-400 hover:text-white transition-colors">Feedback</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Game Categories */}
          <div>
            <h3 className="text-[#FFD700] font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/action" className="text-gray-400 hover:text-white transition-colors">Action</Link>
              </li>
              <li>
                <Link to="/category/adventure" className="text-gray-400 hover:text-white transition-colors">Adventure</Link>
              </li>
              <li>
                <Link to="/category/rpg" className="text-gray-400 hover:text-white transition-colors">RPG</Link>
              </li>
              <li>
                <Link to="/category/strategy" className="text-gray-400 hover:text-white transition-colors">Strategy</Link>
              </li>
              <li>
                <Link to="/category/sports" className="text-gray-400 hover:text-white transition-colors">Sports</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#FFD700] font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter to get the latest updates and offers.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
              />
              <button 
                type="submit" 
                className="bg-[#FF3131] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} GameVerse. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/faq" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;