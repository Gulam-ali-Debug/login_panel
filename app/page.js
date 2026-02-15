"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [panelPosition, setPanelPosition] = useState('login');
  const [showContent, setShowContent] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const timeoutRef = useRef(null);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSwap = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setShowContent(false);
      setPanelPosition(isLogin ? 'signup' : 'login');
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsLogin(!isLogin);
        setShowContent(true);
        
        timeoutRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Mobile View (Stacked Panels)
  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
          {/* Form Panel */}
          <div className="bg-white p-6">
            <div className={`transition-opacity duration-500 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}>
              {isLogin ? (
                /* Mobile Login Form */
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
                  <p className="text-indigo-600 text-sm mb-4">Please enter your details</p>

                  {/* Social Icons */}
                  <div className="flex justify-center gap-3">
                    {/* Google Icon */}
                    <div className="group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:bg-blue-50">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </div>
                    </div>

                    {/* LinkedIn Icon */}
                    <div className="group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:bg-blue-50">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Facebook Icon */}
                    <div className="group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:bg-blue-50">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center text-gray-600">
                        <input type="checkbox" className="mr-2" /> Remember me
                      </label>
                      <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition text-sm">
                      Sign in
                    </button>

                    <div className="relative my-3">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>

                    <p className="text-center text-xs text-gray-500 pt-2">
                      Don't have an account?{" "}
                      <button onClick={handleSwap} className="text-blue-600 font-semibold hover:underline">
                        Sign up
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                /* Mobile Signup Form */
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800">Create account</h2>
                  <p className="text-indigo-600 text-sm mb-4">Join us today</p>

                  {/* Social Icons */}
                  <div className="flex justify-center gap-3">
                    {/* Google Icon */}
                    <div className="group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:bg-blue-50">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </div>
                    </div>

                    {/* LinkedIn Icon */}
                    <div className="group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:bg-blue-50">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Facebook Icon */}
                    <div className="group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:bg-blue-50">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Full name</label>
                      <input type="text" placeholder="John Doe" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" placeholder="john@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                      <input type="password" placeholder="Create a password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Confirm password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
                    </div>

                    <div className="relative my-3">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                      </div>
                    </div>

                    <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>

                    <p className="text-center text-xs text-gray-500 pt-2">
                      Already have an account?{" "}
                      <button onClick={handleSwap} className="text-blue-600 font-semibold hover:underline">
                        Sign in
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white">
            <div className="text-center space-y-3">
              <h2 className="text-xl font-bold">
                {isLogin ? "Hello, Friend!" : "Welcome Back!"}
              </h2>
              <p className="text-sm text-indigo-100">
                {isLogin
                  ? "Begin your journey by creating an account with us"
                  : "Sign in to continue your journey"}
              </p>
              <button
                onClick={handleSwap}
                disabled={isAnimating}
                className="mt-2 bg-white text-indigo-600 font-semibold rounded-full px-6 py-2 transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-indigo-50 disabled:opacity-50"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop/Tablet View (Fixed Sliding Panels)
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Fixed size container for desktop */}
      <div className="relative rounded-2xl w-[1200px] h-[700px] shadow-2xl overflow-hidden">
        {/* Container for both panels */}
        <div className="relative w-full h-full">
          {/* LEFT PANEL (Form) */}
          <div
            className={`absolute top-0 w-1/2 h-full transition-all duration-1000 ease-in-out ${
              panelPosition === 'login' ? "left-0" : "left-1/2"
            }`}
          >
            <div className="h-full w-full bg-white flex items-center justify-center overflow-y-auto">
              {/* Content with fade effect */}
              <div 
                className={`w-full max-w-md mx-auto px-8 transition-opacity duration-500 ease-in-out ${
                  showContent ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {isLogin ? (
                  /* Desktop Login Form */
                  <div className="py-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h2>
                    <p className="text-indigo-600 mb-6">Please enter your details</p>

                    <div className="space-y-4">
                      {/* Social Icons */}
                      <div className="flex justify-center gap-4 mb-4">
                        {/* Google Icon */}
                        <div className="group cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover:bg-indigo-100">
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          </div>
                        </div>

                        {/* LinkedIn Icon */}
                        <div className="group cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover:bg-indigo-100">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0A66C2">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </div>
                        </div>

                        {/* Facebook Icon */}
                        <div className="group cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover:bg-indigo-100">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-gray-600">
                          <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <a href="#" className="text-indigo-600 hover:underline">Forgot password?</a>
                      </div>

                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition">
                        Sign in
                      </button>

                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>

                      <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </button>

                      <p className="text-center text-sm text-gray-500 pt-2">
                        Don't have an account?{" "}
                        <button onClick={handleSwap} className="text-indigo-600 font-semibold hover:underline">
                          Sign up
                        </button>
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Desktop Signup Form */
                  <div className="py-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Create account</h2>
                    <p className="text-indigo-600 mb-6">Join us today</p>

                    <div className="space-y-4">
                      {/* Social Icons */}
                      <div className="flex justify-center gap-4 mb-4">
                        {/* Google Icon */}
                        <div className="group cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover:bg-indigo-100">
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          </div>
                        </div>

                        {/* LinkedIn Icon */}
                        <div className="group cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover:bg-indigo-100">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0A66C2">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </div>
                        </div>

                        {/* Facebook Icon */}
                        <div className="group cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover:bg-indigo-100">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                        <input type="text" placeholder="John Doe" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" placeholder="Create a password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>

                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                        </div>
                      </div>

                      <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </button>

                      <p className="text-center text-sm text-gray-500 pt-2">
                        Already have an account?{" "}
                        <button onClick={handleSwap} className="text-indigo-600 font-semibold hover:underline">
                          Sign in
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL (Info Panel) */}
          <div
            className={`absolute top-0 w-1/2 h-full transition-all duration-1000 ease-in-out ${
              panelPosition === 'login' ? "left-1/2" : "left-0"
            }`}
          >
            <div className="h-full w-full bg-gradient-to-br from-indigo-600 to-purple-600 flex flex-col items-center justify-center p-8 text-white">
              <div 
                className={`flex flex-col items-center justify-center w-full max-w-md mx-auto text-center space-y-6 transition-opacity duration-500 ease-in-out ${
                  showContent ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <h2 className="text-4xl font-bold">
                  {isLogin ? "Hello, Friend!" : "Welcome Back!"}
                </h2>
                
                <p className="text-lg text-indigo-100 px-4 leading-relaxed">
                  {isLogin
                    ? "Begin your journey by creating an account with us"
                    : "Sign in to continue your journey"}
                </p>
                
                <button
                  onClick={handleSwap}
                  disabled={isAnimating}
                  className="mt-4 bg-white text-indigo-600 font-semibold rounded-full px-10 py-3 transition-all duration-300 text-base shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-indigo-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white"
                  style={{ minWidth: 140 }}
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}