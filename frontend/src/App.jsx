import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import SyncUser from "./components/SyncUser";
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
            <Route
              path="/"
              element={
                <SignedIn>
                  <SyncUser />
                  <Home />
                </SignedIn>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={
                    <SignedIn>
                      <Dashboard />
                    </SignedIn>
                  }
                />
              }
            />
            <Route
              path="/login"
              element={
                <SignedOut>
                  <Login />
                </SignedOut>
              }
            />
            <Route
              path="/register"
              element={
                <SignedOut>
                  <Register />
                </SignedOut>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/games" element={<Games />} />
          </Routes>
          <StarsCanvas />
          <Footer />
        </div>
      </BrowserRouter>
  );
};

export default App;
