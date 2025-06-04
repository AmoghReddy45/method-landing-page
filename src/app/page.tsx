"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../../lib/supabase";
import AnimatedThreeWays from "./AnimatedThreeWays";

export default function Home() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showNavBackground, setShowNavBackground] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Waitlist form states
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleWaitlistSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!email) {
      setMessage("Please enter your email address");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email: email.toLowerCase().trim() }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          setMessage("You're already on the waitlist!");
          setMessageType("error");
        } else {
          setMessage("Something went wrong. Please try again.");
          setMessageType("error");
        }
      } else {
        setMessage("🎉 You're on the waitlist! We'll be in touch soon.");
        setMessageType("success");
        setEmail("");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    }

    setLoading(false);
  };

  const scrollToWaitlist = () => {
    const heroSection = document.getElementById('waitlist');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY <= 100) {
        // At top: show nav without background
        setIsNavVisible(true);
        setShowNavBackground(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down: hide nav completely
        setIsNavVisible(false);
        setShowNavBackground(false);
      } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
        // Scrolling up: show nav with background
        setIsNavVisible(true);
        setShowNavBackground(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Set initial state
    if (window.scrollY <= 100) {
      setIsNavVisible(true);
      setShowNavBackground(false);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#E8EFFF] to-[#F5F8FF] font-sans">
      {/* Add Inter font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Navigation */}
      <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-[calc(100%-40px)] max-w-[1200px] z-[1000] transition-all duration-300 ease-in-out ${isNavVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Navigation Background Container */}
        <div className={`absolute inset-0 bg-white/80 backdrop-blur-[20px] rounded-[20px] shadow-[0_2px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out ${showNavBackground ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Navigation Content */}
        <nav className="relative flex justify-between items-center px-8 py-4">
          <div className="flex items-center">
            <Image src="/Transparent Logo.png" alt="Method" width={64} height={64} className="w-auto" />
            <span className="text-xl font-bold tracking-tight text-black -ml-3 mt-1">Method</span>
          </div>
          <div className="hidden md:flex gap-8 text-base font-medium text-black">
            <a href="#how-it-works" className="hover:opacity-70 transition">How it works</a>
            <a href="#features" className="hover:opacity-70 transition">Features</a>
            <a href="#integrations" className="hover:opacity-70 transition">Integrations</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#waitlist" className="bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:-translate-y-0.5 transition-transform inline-flex items-center gap-2">Join Waitlist</a>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-64 pb-24 px-4 min-h-screen" id="waitlist">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight max-w-4xl text-black">
          Every Decision Tracked.<br />
          <span className="block mt-2">Every Action Connected.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl font-medium">Method is an AI workspace that transforms your meetings into organized notes, actionable tasks, and connected intelligence — ensuring nothing falls through the cracks.</p>
        <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-black bg-white" 
            required 
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Joining..." : "Join Waitlist"}
          </button>
        </form>
        
        {/* Message display */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
            messageType === "success" 
              ? "bg-green-100 text-green-800 border border-green-200" 
              : "bg-red-100 text-red-800 border border-red-200"
          }`}>
            {message}
          </div>
        )}
        
        {/* Enhanced Workspace Preview Window */}
        <div className="ai-preview mt-16 w-full flex justify-center">
          <div className="workspace-window bg-white rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] max-w-7xl w-full relative overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="workspace-header bg-white border-b border-gray-200 px-6 py-4">
              <div className="header-content flex justify-between items-center">
                <div className="breadcrumb flex items-center text-sm">
                  <span className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200">Engineering</span>
                  <svg className="w-4 h-4 mx-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200">Q1 Sprint Planning</span>
                  <svg className="w-4 h-4 mx-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-900 font-medium">March 8 Meeting</span>
                </div>
                
                <div className="header-actions flex items-center gap-3">
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg border-0 bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 cursor-pointer">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg border-0 bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 cursor-pointer">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border-0 rounded-lg text-sm font-medium text-gray-900 cursor-pointer transition-all duration-200">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 10-13.432 0m13.432 0A9.001 9.001 0 0112 21a9.001 9.001 0 01-5.716-2.026" />
                    </svg>
                    Share
                  </button>
                  <div className="avatar-stack flex items-center ml-4 pl-4 border-l border-gray-200">
                    <div className="avatar w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold -ml-2 first:ml-0 border-2 border-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md relative group bg-green-500 z-10">
                      S
                      <span className="avatar-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 mb-2 group-hover:opacity-100">Sarah Chen</span>
                    </div>
                    <div className="avatar w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold -ml-2 border-2 border-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md relative group bg-blue-500 z-10">
                      M
                      <span className="avatar-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 mb-2 group-hover:opacity-100">Mike Johnson</span>
                    </div>
                    <div className="avatar w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold -ml-2 border-2 border-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md relative group bg-amber-500 z-10">
                      J
                      <span className="avatar-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 mb-2 group-hover:opacity-100">Jennifer Lee</span>
                    </div>
                    <div className="avatar w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold -ml-2 border-2 border-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md relative group bg-gray-500 z-10">
                      +4
                      <span className="avatar-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 mb-2 group-hover:opacity-100">Alex, David, Lisa, Tom</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="workspace-content flex h-[600px]">
              {/* Enhanced Sidebar */}
              <div className="workspace-sidebar w-80 bg-gray-50 border-r border-gray-200 p-8 overflow-hidden">
                <div className="sidebar-section mb-12">
                  <div className="section-title text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">Workspaces</div>
                  <div className="space-y-3">
                    <div className="sidebar-item active relative">
                      <div className="sidebar-link active flex items-center justify-between p-4 rounded-xl text-gray-900 text-sm font-medium bg-white shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md border border-gray-100">
                        <div className="flex items-center">
                          <span className="sidebar-icon text-xl mr-4">📅</span>
                          <span>Q1 Sprint Planning</span>
                        </div>
                        <span className="sidebar-badge bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">3</span>
                      </div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-blue-600 rounded-r"></div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center p-4 rounded-xl text-gray-600 text-sm hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200 cursor-pointer">
                        <span className="sidebar-icon text-xl mr-4">🚀</span>
                        <span>Product Roadmap</span>
                      </div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center p-4 rounded-xl text-gray-600 text-sm hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200 cursor-pointer">
                        <span className="sidebar-icon text-xl mr-4">🐛</span>
                        <span>Bug Triage</span>
                      </div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center p-4 rounded-xl text-gray-600 text-sm hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200 cursor-pointer">
                        <span className="sidebar-icon text-xl mr-4">📊</span>
                        <span>Weekly Standup</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-section">
                  <div className="section-title text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">Recent Meetings</div>
                  <div className="space-y-2">
                    <div className="sidebar-item">
                      <div className="sidebar-link block p-3 rounded-lg text-gray-600 text-sm hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200 cursor-pointer">API Architecture Review</div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link block p-3 rounded-lg text-gray-600 text-sm hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200 cursor-pointer">Customer Feedback Session</div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link block p-3 rounded-lg text-gray-600 text-sm hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200 cursor-pointer">Infrastructure Planning</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Main Content */}
              <div className="workspace-main flex-1 p-8 overflow-hidden bg-white">
                <div className="meeting-header mb-8">
                  <h1 className="meeting-title text-3xl font-bold text-gray-900 mb-2">Sprint Planning Meeting</h1>
                  <div className="meeting-meta flex items-center gap-4 text-sm text-gray-600">
                    <span>March 8, 2025</span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <span>2:00 PM - 2:45 PM</span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <span>45 minutes</span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <span>7 participants</span>
                  </div>
                </div>

                {/* Enhanced Key Decisions */}
                <div className="content-section mb-10">
                  <div className="section-header flex justify-between items-center mb-6">
                    <h2 className="section-title-main text-xl font-semibold text-gray-900">📌 Key Decisions</h2>
                    <button className="sync-button flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Sync to Jira
                    </button>
                  </div>
                  
                  <div className="decision-card bg-white border border-gray-200 rounded-xl p-5 mb-3 transition-all duration-200 cursor-pointer hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5">
                    <div className="decision-content flex gap-4">
                      <div className="decision-icon-wrapper w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-100 text-green-600">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="decision-details flex-1">
                        <p className="decision-text text-base leading-relaxed text-gray-900 mb-3">
                          Prioritize <span className="smart-link text-blue-600 font-medium border-b-2 border-blue-100 hover:border-blue-600 transition-all duration-200 relative cursor-pointer group">API performance optimization
                            <span className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 mb-2 font-normal group-hover:opacity-100 z-20">→ JIRA: API-2847</span>
                          </span> for mobile app release blocker
                        </p>
                        <div className="decision-meta flex items-center gap-2">
                          <span className="meta-tag inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-2xl text-xs text-gray-600">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Sarah Chen
                          </span>
                          <span className="meta-tag inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-2xl text-xs text-gray-600">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Due March 15
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="decision-card bg-white border border-gray-200 rounded-xl p-5 mb-3 transition-all duration-200 cursor-pointer hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5">
                    <div className="decision-content flex gap-4">
                      <div className="decision-icon-wrapper w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-600">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="decision-details flex-1">
                        <p className="decision-text text-base leading-relaxed text-gray-900 mb-3">
                          Increase <span className="smart-link text-blue-600 font-medium border-b-2 border-blue-100 hover:border-blue-600 transition-all duration-200 relative cursor-pointer group">Q2 infrastructure budget
                            <span className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 mb-2 font-normal group-hover:opacity-100 z-20">Previous: $50k → New: $60k</span>
                          </span> by 20% to support expected growth
                        </p>
                        <div className="decision-meta flex items-center gap-2">
                          <span className="meta-tag inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-2xl text-xs text-gray-600">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Pending CFO approval
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Items */}
                <div className="content-section">
                  <div className="section-header mb-6">
                    <h2 className="section-title-main text-xl font-semibold text-gray-900">🎯 Action Items</h2>
                  </div>
                  
                  <div className="task-item bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2 flex items-center gap-4 transition-all duration-200 cursor-pointer hover:border-gray-300 hover:shadow-sm relative overflow-hidden group opacity-70">
                    <div className="task-checkbox w-5 h-5 border-2 border-blue-600 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer bg-blue-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="task-content flex-1">
                      <div className="task-title text-base text-gray-600 mb-1 font-medium line-through">Implement caching layer for user endpoints</div>
                      <div className="task-meta-row flex items-center gap-3 text-xs text-gray-500">
                        <div className="task-assignee flex items-center gap-1.5">
                          <div className="task-assignee-avatar w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">M</div>
                          <span>mike</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="task-due flex items-center gap-1">
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Sprint 24
                        </div>
                      </div>
                    </div>
                    <div className="task-actions opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="task-item bg-white border border-gray-200 rounded-lg p-4 mb-2 flex items-center gap-4 transition-all duration-200 cursor-pointer hover:border-gray-300 hover:shadow-sm relative overflow-hidden group">
                    <div className="task-checkbox w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer hover:border-blue-600 group-hover:bg-gray-50">
                      <div className="w-2 h-2 bg-blue-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="task-content flex-1">
                      <div className="task-title text-base text-gray-900 mb-1 font-medium">Review and approve infrastructure proposal</div>
                      <div className="task-meta-row flex items-center gap-3 text-xs text-gray-600">
                        <div className="task-assignee flex items-center gap-1.5">
                          <div className="task-assignee-avatar w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">J</div>
                          <span>jennifer</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="task-due flex items-center gap-1 text-orange-600">
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          By Mar 12
                        </div>
                      </div>
                    </div>
                    <div className="task-actions opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Three Ways Section (Cluely style) */}
      <AnimatedThreeWays />

      {/* Integrations Section */}
      <section className="relative w-full py-32 px-4 bg-gradient-to-b from-[#161617] to-[#0a0a0a] text-white overflow-hidden" id="integrations">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-600/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-600/30 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-medium mb-6 text-white leading-tight">
              Works everywhere you do.
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-normal">
              No bot invasions. No permission hassles. Method integrates 
              seamlessly with your existing tools and workflows.
            </p>
          </div>
          
          {/* Enhanced Integration Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24">
            <div>
              <div className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 opacity-80">
                    <Image src="/toppng.com-slack-new-logo-icon-1600x1600.png" alt="Slack" width={64} height={64} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Slack</h3>
                  <p className="text-sm text-white/60">Real-time notifications and smart summaries</p>
                </div>
              </div>
            </div>

            <div>
              <div className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 opacity-80">
                    <Image src="/Jira.png" alt="Jira" width={64} height={64} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Jira</h3>
                  <p className="text-sm text-white/60">Automated task creation and tracking</p>
                </div>
              </div>
            </div>

            <div>
              <div className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 opacity-80">
                    <Image src="/5e8ce318664eae0004085461.png" alt="Zoom" width={64} height={64} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Zoom</h3>
                  <p className="text-sm text-white/60">Meeting intelligence and live transcription</p>
                </div>
              </div>
            </div>

            <div>
              <div className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 opacity-80">
                    <Image src="/logo-light.png" alt="Linear" width={64} height={64} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Linear</h3>
                  <p className="text-sm text-white/60">Issue tracking and sprint planning sync</p>
                </div>
              </div>
            </div>

            <div>
              <div className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 opacity-80">
                    <Image src="/5e8cdf0a664eae000408545b.png" alt="Microsoft Teams" width={64} height={64} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Teams</h3>
                  <p className="text-sm text-white/60">Calendar integration and meeting insights</p>
                </div>
              </div>
            </div>

            <div>
              <div className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 opacity-80">
                    <Image src="/google-meet-logo-15014.png" alt="Google Meet" width={64} height={64} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Google Meet</h3>
                  <p className="text-sm text-white/60">Live transcription and action items</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Security Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-6 text-white">
                Enterprise-grade security
              </h3>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
                Your conversations stay private. Method is SOC 2 Type II certified, 
                GDPR compliant, and never shares your data.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white/90 mb-2">SOC 2 Type II</h4>
                <p className="text-sm text-white/60">Audited security controls and compliance monitoring</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white/90 mb-2">GDPR Compliant</h4>
                <p className="text-sm text-white/60">Full data privacy protection and user rights</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white/90 mb-2">End-to-End Encryption</h4>
                <p className="text-sm text-white/60">Military-grade encryption for all data transmission</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Impact Section - Inspired by Cluely */}
      <section className="flex flex-col items-center justify-center py-32 px-4 bg-gradient-to-r from-blue-100 via-white to-blue-100 relative" id="why-method">
        {/* Spotlight effect */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(circle at center, white 0%, rgba(255,255,255,0.5) 40%, transparent 70%)'
          }}
        ></div>
        
        <div className="text-center max-w-4xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-black leading-tight">
            The Future of Team Intelligence.
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
            Where every meeting becomes organized knowledge, every decision stays connected, and nothing falls through the cracks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToWaitlist}
              disabled={loading}
              className="bg-black text-white px-8 py-4 rounded-lg font-semibold shadow hover:scale-105 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Joining..." : "Join the Waitlist"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
