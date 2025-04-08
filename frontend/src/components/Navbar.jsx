import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles"; 
import { logo, menu, close } from "../assets"; 

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-300 ${
        scrolled ? "bg-[#A60000] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo & Title */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <p className="text-[#FFD700] text-[22px] font-bold uppercase tracking-wider">
            GameVerse🔥 
            {/* <span className="sm:block hidden">🔥</span> */}
          </p>
        </Link>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-grow justify-center">
          <input
            type="text"
            placeholder="Search games..."
            className="px-4 py-2 w-[250px] rounded-lg border border-gray-300 focus:outline-none focus:border-[#FFD700]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="list-none hidden sm:flex flex-row gap-6">
          <li>
            <Link
              to="/about"
              className="text-[#FFD700] hover:text-white text-[16px] font-semibold uppercase transition-all duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-[#FFD700] hover:text-white text-[16px] font-semibold uppercase transition-all duration-200"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-[#FFD700] hover:text-white text-[16px] font-semibold uppercase transition-all duration-200"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="bg-[#FFD700] text-black px-4 py-2 rounded-lg text-[16px] font-semibold uppercase transition-all duration-200 hover:bg-white"
            >
              Register
            </Link>
          </li>
        </ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[30px] h-[30px] cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-5 bg-[#A60000] absolute top-16 right-4 min-w-[180px] z-10 rounded-lg shadow-md`}
          >
            <ul className="list-none flex flex-col gap-4">
              <li>
                <Link
                  to="/about"
                  className="text-[#FFD700] hover:text-white text-[16px] font-semibold uppercase transition-all duration-200"
                  onClick={() => setToggle(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#FFD700] hover:text-white text-[16px] font-semibold uppercase transition-all duration-200"
                  onClick={() => setToggle(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-[#FFD700] hover:text-white text-[14px] font-semibold uppercase transition-all duration-200"
                  onClick={() => setToggle(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-[#FFD700] text-black px-4 py-2 rounded-lg text-[14px] font-semibold uppercase transition-all duration-200 hover:bg-white"
                  onClick={() => setToggle(false)}
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
