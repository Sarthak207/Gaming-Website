import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClerkProvider, SignedOut } from "@clerk/clerk-react";
import {
  About,
  Contact,
  Home,
  Navbar,
  Footer,
  StarsCanvas,
} from "./components";
import Login from "./components/Login";
import Register from "./components/Register";
import Signup from "./components/SignUp";
import Games from "./components/Games";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const App = () => {
  return (
      <BrowserRouter>
        <div className="relative z-0 bg-primary">
          <Navbar />
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={
                    <Dashboard />
                  }
                />
              }
            />

            {/* Login Route */}
            <Route
              path="/login"
              element={
                <SignedOut>
                  <Login />
                </SignedOut>
              }
            />

            {/* Signup Route */}
            <Route
              path="/signup"
              element={
                <SignedOut>
                  <Signup />
                </SignedOut>
              }
            />

            {/* Register Route */}
            <Route
              path="/register"
              element={
                <SignedOut>
                  <Register />
                </SignedOut>
              }
            />

            {/* Public Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/games" element={<Games />} />
          </Routes>

          {/* Background Effects and Footer */}
          <StarsCanvas />
          <Footer />
        </div>
      </BrowserRouter>
  );
};

export default App;
