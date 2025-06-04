"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../../lib/supabase";
import AnimatedThreeWays from "./AnimatedThreeWays";

export default function Home() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showNavBackground, setShowNavBackground] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  
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
          <div className="workspace-window bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04),0_12px_24px_rgba(0,0,0,0.06)] max-w-7xl w-full relative overflow-hidden">
            {/* Header */}
            <div className="workspace-header bg-white border-b border-[#EAEAEA] px-5 py-3">
              <div className="header-content flex justify-between items-center">
                <div className="breadcrumb flex items-center text-[13px]">
                  <span className="text-[#666] cursor-pointer hover:text-[#000] hover:bg-[#F5F5F5] transition-all duration-150 px-2 py-1 rounded-md -mx-2">Meetings</span>
                  <span className="text-[#DDD] mx-1 text-[10px]">›</span>
                  <span className="text-[#666] cursor-pointer hover:text-[#000] hover:bg-[#F5F5F5] transition-all duration-150 px-2 py-1 rounded-md">Q1 Sprint Planning</span>
                  <span className="text-[#DDD] mx-1 text-[10px]">›</span>
                  <span className="text-[#000] font-medium px-2 py-1">March 8 Meeting</span>
                </div>
                
                <div className="header-actions flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:bg-[#F5F5F5] hover:text-[#000] transition-all duration-150">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:bg-[#F5F5F5] hover:text-[#000] transition-all duration-150">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#000] hover:bg-[#333] text-white rounded-lg text-[13px] font-medium transition-all duration-150 hover:-translate-y-[1px]">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 10-13.432 0m13.432 0A9.001 9.001 0 0112 21a9.001 9.001 0 01-5.716-2.026" />
                    </svg>
                    Share
                  </button>
                  <div className="avatar-stack flex items-center ml-3 pl-3 border-l border-[#EAEAEA]">
                    <div className="avatar w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-semibold -ml-2 first:ml-0 border-2 border-white cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:scale-105 relative group bg-[#00B388] z-10">
                      S
                      <span className="avatar-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-[#000] text-white px-2 py-1 rounded-md text-[11px] whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 mb-2 group-hover:opacity-100">Sarah Chen</span>
                    </div>
                    <div className="avatar w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-semibold -ml-2 border-2 border-white cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:scale-105 relative group bg-[#0084FF] z-10">
                      M
                      <span className="avatar-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-[#000] text-white px-2 py-1 rounded-md text-[11px] whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 mb-2 group-hover:opacity-100">Mike Johnson</span>
                    </div>
                    <div className="avatar w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-semibold -ml-2 border-2 border-white cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:scale-105 relative group bg-[#FF6B00] z-10">
                      J
                      <span className="avatar-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-[#000] text-white px-2 py-1 rounded-md text-[11px] whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 mb-2 group-hover:opacity-100">Jennifer Lee</span>
                    </div>
                    <div className="avatar w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-semibold -ml-2 border-2 border-white cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:scale-105 relative group bg-[#6B7280] z-10">
                      +4
                      <span className="avatar-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-[#000] text-white px-2 py-1 rounded-md text-[11px] whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 mb-2 group-hover:opacity-100">Alex, David, Lisa, Tom</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="workspace-content flex h-[720px]">
              {/* Enhanced Sidebar */}
              <div className="workspace-sidebar w-[260px] bg-[#FAFAFA] border-r border-[#EAEAEA] p-4 overflow-hidden">
                {/* Workspace Switcher Header */}
                <div className="workspace-switcher mb-4 relative">
                  <div 
                    className="workspace-header flex items-center justify-between p-2 px-3 rounded-md hover:bg-white transition-colors cursor-pointer group"
                    onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="user-avatar w-6 h-6 rounded-md bg-[#000] flex items-center justify-center text-white text-[11px] font-semibold">
                        M
                      </div>
                      <div className="workspace-info">
                        <div className="workspace-name text-[13px] font-medium text-[#000]">Method Workspace</div>
                      </div>
                    </div>
                    <svg className={`w-4 h-4 text-[#666] group-hover:text-[#000] transition-all duration-150 ${isWorkspaceDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {/* Workspace Dropdown */}
                  <div className={`workspace-dropdown absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E5E5] rounded-lg shadow-lg z-50 transition-all duration-150 ${isWorkspaceDropdownOpen ? 'opacity-100 pointer-events-auto transform scale-100' : 'opacity-0 pointer-events-none transform scale-95'}`}>
                    <div className="p-3 border-b border-[#F0F0F0]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="user-avatar w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-[14px] font-semibold">
                          M
                        </div>
                        <div>
                          <div className="text-[14px] font-medium text-[#000]">Method Workspace</div>
                          <div className="text-[12px] text-[#666]">sarah@method.com</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F5F5F5] hover:bg-[#EFEFEF] rounded-md text-[12px] text-[#666] transition-colors">
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </button>
                        <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F5F5F5] hover:bg-[#EFEFEF] rounded-md text-[12px] text-[#666] transition-colors">
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                          Invite
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#888] mb-2 px-2">Switch workspace</div>
                      <div className="space-y-[1px]">
                        <div className="workspace-option flex items-center justify-between p-2 rounded-md hover:bg-[#F5F5F5] cursor-pointer group">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-[11px] font-semibold">M</div>
                            <span className="text-[13px] text-[#000]">Method Workspace</span>
                          </div>
                          <svg className="w-4 h-4 text-[#000]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="workspace-option flex items-center gap-2.5 p-2 rounded-md hover:bg-[#F5F5F5] cursor-pointer">
                          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-[11px] font-semibold">E</div>
                          <span className="text-[13px] text-[#666]">Engineering Team</span>
                          <span className="ml-auto text-[11px] text-[#FF8C00] bg-[#FFF4E6] px-1.5 py-0.5 rounded">Guest</span>
                        </div>
                        <div className="workspace-option flex items-center gap-2.5 p-2 rounded-md hover:bg-[#F5F5F5] cursor-pointer">
                          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-[11px] font-semibold">S</div>
                          <span className="text-[13px] text-[#666]">Startup Ventures</span>
                        </div>
                        <div className="workspace-option flex items-center gap-2.5 p-2 rounded-md hover:bg-[#F5F5F5] cursor-pointer">
                          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-[11px] font-semibold">P</div>
                          <span className="text-[13px] text-[#666]">Personal Projects</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-[#F0F0F0] mt-2 pt-2">
                        <div className="workspace-option flex items-center gap-2.5 p-2 rounded-md hover:bg-[#F5F5F5] cursor-pointer text-[#666]">
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-[13px]">New workspace</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-[#F0F0F0] p-2">
                      <div className="workspace-option flex items-center gap-2.5 p-2 rounded-md hover:bg-[#F5F5F5] cursor-pointer text-[#666]">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="text-[13px]">Log out</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="search-section mb-4">
                  <div className="search-box flex items-center gap-2 px-3 py-2 bg-white border border-[#E5E5E5] rounded-md text-[13px] text-[#666] hover:border-[#DDD] transition-colors cursor-text">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                  </div>
                </div>

                {/* Quick Navigation */}
                <div className="nav-section mb-6">
                  <div className="space-y-[1px]">
                    <div className="nav-item">
                      <div className="nav-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-white hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                        </svg>
                        <span>Inbox</span>
                      </div>
                    </div>
                    <div className="nav-item">
                      <div className="nav-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-white hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>All Updates</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teamspaces */}
                <div className="sidebar-section mb-6">
                  <div className="section-title text-[11px] font-semibold uppercase tracking-[0.05em] text-[#888] mb-2 px-3">Teamspaces</div>
                  <div className="space-y-[1px]">
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-base">🏠</span>
                        <span>Engineering</span>
                      </div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-base">📝</span>
                        <span>Docs & Wiki</span>
                      </div>
                    </div>
                    <div className="sidebar-item active relative">
                      <div className="sidebar-link active flex items-center justify-between p-2 px-3 rounded-md text-[13px] font-medium bg-[#EFEFEF] text-[#000] transition-all duration-150 cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">📅</span>
                          <span>Meetings</span>
                        </div>
                        <span className="sidebar-badge bg-[#FF5A5A] text-white text-[11px] font-semibold px-1.5 py-0.5 rounded-[10px] min-w-[18px] text-center">3</span>
                      </div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-base">✅</span>
                        <span>Tasks</span>
                      </div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-base">🎯</span>
                        <span>Projects</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Private Workspaces */}
                <div className="sidebar-section mb-6">
                  <div className="section-title text-[11px] font-semibold uppercase tracking-[0.05em] text-[#888] mb-2 px-3">Private</div>
                  <div className="space-y-[1px]">
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-base">🚀</span>
                        <span>Product Roadmap</span>
                      </div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-base">💡</span>
                        <span>Research & Ideas</span>
                      </div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-base">📊</span>
                        <span>Weekly Reviews</span>
                      </div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-base">🐛</span>
                        <span>Bug Tracking</span>
                      </div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-base">🎨</span>
                        <span>Design System</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent */}
                <div className="sidebar-section">
                  <div className="section-title text-[11px] font-semibold uppercase tracking-[0.05em] text-[#888] mb-2 px-3">Recent</div>
                  <div className="space-y-[1px]">
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-sm text-[#999]">📄</span>
                        <span>API Architecture Review</span>
                      </div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-sm text-[#999]">👥</span>
                        <span>Team Retrospective</span>
                      </div>
                    </div>
                    <div className="sidebar-item">
                      <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                        <span className="text-sm text-[#999]">💬</span>
                        <span>Customer Feedback</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
                  <div className="sidebar-item">
                    <div className="sidebar-link flex items-center gap-2.5 p-2 px-3 rounded-md text-[#666] text-[13px] hover:bg-[#EFEFEF] hover:text-[#000] transition-all duration-150 cursor-pointer">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Invite members</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Main Content */}
              <div className="workspace-main flex-1 p-8 overflow-hidden bg-white">
                <div className="meeting-header mb-8 pb-6 border-b border-[#EAEAEA]">
                  <h1 className="meeting-title text-[32px] font-bold text-[#000] mb-2 tracking-[-0.03em]">Sprint Planning Meeting</h1>
                  <div className="meeting-meta flex items-center gap-3 text-[13px] text-[#666]">
                    <span>March 8, 2025</span>
                    <div className="w-[3px] h-[3px] bg-[#CCC] rounded-full"></div>
                    <span>2:00 PM - 2:45 PM</span>
                    <div className="w-[3px] h-[3px] bg-[#CCC] rounded-full"></div>
                    <span>45 minutes</span>
                    <div className="w-[3px] h-[3px] bg-[#CCC] rounded-full"></div>
                    <span>7 participants</span>
                  </div>
                </div>

                {/* Auto-Generated Notes Banner */}
                <div className="notes-banner mb-6">
                  <div className="flex items-center justify-between p-3 border border-[#EAEAEA] rounded-lg hover:border-[#DDD] hover:bg-[#FAFAFA] transition-all duration-150 cursor-pointer group">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 bg-[#F5F5F5] rounded-md flex items-center justify-center">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="text-[#666]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-[#000] text-left">Meeting Notes</div>
                        <div className="text-[12px] text-[#666] text-left">Auto-generated • 2,847 words</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#666] text-[13px] group-hover:text-[#000] transition-colors">
                      <span>Review</span>
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Enhanced Key Decisions */}
                <div className="content-section mb-12">
                  <div className="section-header flex justify-between items-center mb-5">
                    <h2 className="section-title-main text-[18px] font-semibold text-[#000] tracking-[-0.02em]">Key Decisions</h2>
                    <button className="sync-button flex items-center gap-1.5 px-3 py-1.5 bg-[#000] hover:bg-[#333] text-white rounded-lg text-[13px] font-medium transition-all duration-150 hover:-translate-y-[1px]">
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Sync to Jira
                    </button>
                  </div>
                  
                  <div className="decision-card bg-[#FAFAFA] border border-transparent rounded-xl p-5 mb-3 transition-all duration-200 cursor-pointer hover:bg-[#F5F5F5] hover:border-[#E5E5E5] hover:translate-x-[2px]">
                    <div className="decision-content flex gap-4">
                      <div className="decision-icon-wrapper w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#E6F7E6] text-[#00A854]">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="decision-details flex-1">
                        <p className="decision-text text-[14px] leading-[1.6] text-[#333] mb-2.5">
                          Prioritize <span className="smart-link text-[#000] font-medium border-b-[1.5px] border-[#C7D2FE] hover:border-[#A5B4FC] transition-all duration-150 relative cursor-pointer group">API performance optimization
                            <span className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-[#000] text-white px-2.5 py-1.5 rounded-md text-[12px] whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 mb-1.5 font-normal group-hover:opacity-100 z-20">→ JIRA: API-2847</span>
                          </span> for mobile app release blocker
                        </p>
                        <div className="decision-meta flex items-center gap-2">
                          <span className="meta-tag inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E5E5E5] rounded-md text-[12px] text-[#666]">Sarah Chen</span>
                          <span className="meta-tag inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E5E5E5] rounded-md text-[12px] text-[#666]">Due March 15</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="decision-card bg-[#FAFAFA] border border-transparent rounded-xl p-5 mb-3 transition-all duration-200 cursor-pointer hover:bg-[#F5F5F5] hover:border-[#E5E5E5] hover:translate-x-[2px]">
                    <div className="decision-content flex gap-4">
                      <div className="decision-icon-wrapper w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#FFF4E6] text-[#FF8C00]">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="decision-details flex-1">
                        <p className="decision-text text-[14px] leading-[1.6] text-[#333] mb-2.5">
                          Increase <span className="smart-link text-[#000] font-medium border-b-[1.5px] border-[#C7D2FE] hover:border-[#A5B4FC] transition-all duration-150 relative cursor-pointer group">Q2 infrastructure budget
                            <span className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 bg-[#000] text-white px-2.5 py-1.5 rounded-md text-[12px] whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 mb-1.5 font-normal group-hover:opacity-100 z-20">Previous: $50k → New: $60k</span>
                          </span> by 20% to support expected growth
                        </p>
                        <div className="decision-meta flex items-center gap-2">
                          <span className="meta-tag inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E5E5E5] rounded-md text-[12px] text-[#666]">Pending CFO approval</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Items */}
                <div className="content-section">
                  <div className="section-header mb-5">
                    <h2 className="section-title-main text-[18px] font-semibold text-[#000] tracking-[-0.02em]">Action Items</h2>
                  </div>
                  
                  <div className="task-item completed bg-white border border-[#EAEAEA] rounded-[10px] p-3.5 mb-1.5 flex items-center gap-3 transition-all duration-150 cursor-pointer opacity-60">
                    <div className="task-checkbox w-4 h-4 border-[1.5px] border-[#000] rounded-[4px] flex items-center justify-center flex-shrink-0 bg-[#000]">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="task-content flex-1">
                      <div className="task-title text-[14px] text-[#999] font-[450] line-through">Implement caching layer for user endpoints</div>
                      <div className="task-meta-row flex items-center gap-3 text-[12px] text-[#666] mt-1">
                        <div className="task-assignee flex items-center gap-1.5">
                          <div className="task-assignee-avatar w-[18px] h-[18px] rounded-full bg-[#EAEAEA] flex items-center justify-center text-[10px] font-semibold text-[#666]">M</div>
                          <span>mike</span>
                        </div>
                        <div className="w-[3px] h-[3px] bg-[#CCC] rounded-full"></div>
                        <span>Sprint 24</span>
                      </div>
                    </div>
                  </div>

                  <div className="task-item bg-white border border-[#EAEAEA] rounded-[10px] p-3.5 mb-1.5 flex items-center gap-3 transition-all duration-150 cursor-pointer hover:border-[#DDD] hover:bg-[#FAFAFA] hover:translate-x-[2px] group">
                    <div className="task-checkbox w-4 h-4 border-[1.5px] border-[#DDD] rounded-[4px] flex items-center justify-center flex-shrink-0 transition-all duration-150 hover:border-[#000] group-hover:bg-gray-50">
                      <div className="w-1.5 h-1.5 bg-[#000] rounded-[1px] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>
                    <div className="task-content flex-1">
                      <div className="task-title text-[14px] text-[#000] font-[450]">Review and approve infrastructure proposal</div>
                      <div className="task-meta-row flex items-center gap-3 text-[12px] text-[#666] mt-1">
                        <div className="task-assignee flex items-center gap-1.5">
                          <div className="task-assignee-avatar w-[18px] h-[18px] rounded-full bg-[#EAEAEA] flex items-center justify-center text-[10px] font-semibold text-[#666]">J</div>
                          <span>jennifer</span>
                        </div>
                        <div className="w-[3px] h-[3px] bg-[#CCC] rounded-full"></div>
                        <span className="text-[#FF6B00]">By Mar 12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute bottom-5 right-5 bg-[#000] text-white px-4 py-2.5 rounded-lg flex items-center gap-2.5 text-[13px] font-medium shadow-lg z-10 cursor-pointer hover:bg-[#333] transition-colors">
              <div className="w-1.5 h-1.5 bg-[#00FF88] rounded-full" style={{boxShadow: '0 0 0 2px rgba(0, 255, 136, 0.3)', animation: 'pulse 2s infinite'}}></div>
              <span>AI Assistant</span>
            </div>
            
            {/* Bottom fade overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F8FF] to-transparent pointer-events-none rounded-b-2xl z-20"></div>
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

      {/* Add custom styles for the workspace preview */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.3);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(0, 255, 136, 0);
          }
          100% {
            box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.3);
          }
        }
        
        /* Custom scrollbar styling */
        .workspace-sidebar::-webkit-scrollbar,
        .workspace-main::-webkit-scrollbar {
          width: 6px;
        }
        
        .workspace-sidebar::-webkit-scrollbar-track,
        .workspace-main::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .workspace-sidebar::-webkit-scrollbar-thumb,
        .workspace-main::-webkit-scrollbar-thumb {
          background: #DDD;
          border-radius: 3px;
        }
        
        .workspace-sidebar::-webkit-scrollbar-thumb:hover,
        .workspace-main::-webkit-scrollbar-thumb:hover {
          background: #BBB;
        }
      `}</style>
    </div>
  );
}
