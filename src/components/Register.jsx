import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); // email or otp

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Password validation
    if (loginMethod === "email") {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success (this would be replaced with actual API integration)
      console.log("Login successful with:", formData);
      
      // In production, you would:
      // 1. Store tokens in localStorage/cookies
      // 2. Update auth context
      // 3. Redirect user
      
    } catch (error) {
      setErrors({
        form: "Invalid email or password. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === "email" ? "otp" : "email");
    setErrors({});
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-24 pb-12 px-4 bg-gradient-to-b from-black to-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-700"
      >
        {/* Login Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl text-white font-bold">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Log in to continue your gaming journey</p>
        </div>
        
        {/* Login Tabs */}
        <div className="flex bg-gray-900 rounded-lg mb-6 p-1">
          <button
            className={`flex-1 py-2 text-center rounded-lg transition-all duration-200 ${loginMethod === "email" ? "bg-[#FFD700] text-black font-bold" : "text-gray-400 hover:text-white"}`}
            onClick={() => setLoginMethod("email")}
          >
            Email & Password
          </button>
          <button
            className={`flex-1 py-2 text-center rounded-lg transition-all duration-200 ${loginMethod === "otp" ? "bg-[#FFD700] text-black font-bold" : "text-gray-400 hover:text-white"}`}
            onClick={() => setLoginMethod("otp")}
          >
            Register with OTP
          </button>
        </div>
        
        {/* Error Message */}
        {errors.form && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-4">
            {errors.form}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-[#FFD700] transition-colors`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          
          {/* Password Field (only shown for email login method) */}
          {loginMethod === "email" && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-gray-300 font-medium">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[#FFD700] text-sm hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${errors.password ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-[#FFD700] transition-colors`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>
          )}
          
          {/* OTP Field (only shown for OTP login method) */}
          {loginMethod === "otp" && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label htmlFor="otp" className="text-gray-300 font-medium">
                  One-Time Password
                </label>
                <button type="button" className="text-[#FFD700] text-sm hover:underline">
                  Send OTP
                </button>
              </div>
              <input
                type="text"
                id="otp"
                name="otp"
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-[#FFD700] transition-colors"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
              />
            </div>
          )}
          
          
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FFD700] text-black py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-yellow-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
          
          {/* Social Login Options */}
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <div className="flex-grow h-px bg-gray-600"></div>
              <span className="px-3 text-gray-400 text-sm">OR CONTINUE WITH</span>
              <div className="flex-grow h-px bg-gray-600"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="flex justify-center items-center py-2 px-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
              </button>
              <button
                type="button"
                className="flex justify-center items-center py-2 px-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button
                type="button"
                className="flex justify-center items-center py-2 px-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current text-white" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </button>
            </div>
          </div>

         
        </form>
      </motion.div>
    </div>
  );
};

export default Login;