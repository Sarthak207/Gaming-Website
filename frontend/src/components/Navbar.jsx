import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { logo, menu, close } from "../assets";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <p className="text-[#FFD700] text-[22px] font-bold uppercase tracking-wider">
            GameVerse🔥
          </p>
        </Link>

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
          <SignedOut>
            <li>
              <SignInButton>
                <button className="text-[#FFD700] hover:text-white text-[16px] font-semibold uppercase transition-all duration-200">
                  Login
                </button>
              </SignInButton>
            </li>
          </SignedOut>
          <SignedOut>
            <li>
              <Link
                to="/signup"
                className="bg-[#FFD700] text-black px-4 py-2 rounded-lg text-[16px] font-semibold uppercase transition-all duration-200 hover:bg-white"
              >
                Register
              </Link>
            </li>
          </SignedOut>
          <SignedIn>
            <li>
              <UserButton />
            </li>
          </SignedIn>
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
              <SignedOut>
                <li>
                  <SignInButton>
                    <button
                      className="text-[#FFD700] hover:text-white text-[16px] font-semibold uppercase transition-all duration-200"
                      onClick={() => setToggle(false)}
                    >
                      Login
                    </button>
                  </SignInButton>
                </li>
              </SignedOut>
              <SignedOut>
                <li>
                  <Link
                    to="/signup"
                    className="bg-[#FFD700] text-black px-4 py-2 rounded-lg text-[16px] font-semibold uppercase transition-all duration-200 hover:bg-white"
                    onClick={() => setToggle(false)}
                  >
                    Register
                  </Link>
                </li>
              </SignedOut>
              <SignedIn>
                <li>
                  <UserButton />
                </li>
              </SignedIn>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;