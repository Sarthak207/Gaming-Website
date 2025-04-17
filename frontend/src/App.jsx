import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Home,
  Navbar,
  Footer,
  StarsCanvas,
} from "./components";
import Login from "./components/Login";
import Register from "./components/Register";
import Games from "./components/Games"; 
//import Signup from "./components/SignUp"; // Ensure the path and case are correct

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* Persistent Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="login" element={<Login/>}/>
          {/*<Route path="signup" element={<Signup/>}/>*}
          <Route path="register" element=""></Route>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/feedbacks" element={<Feedbacks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games" element={<Games />} /> {/* ✅ Added Games route */}
        </Routes>

        {/* Background Effect */}
        <StarsCanvas />

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
