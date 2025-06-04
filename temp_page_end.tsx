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
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed font-normal">
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
              <h3 className="text-3xl md:text-4xl font-medium mb-6 text-white leading-tight">
                Enterprise-grade security
              </h3>
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
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
          <h2 className="text-3xl md:text-4xl font-medium mb-6 text-black leading-tight">
            The Future of Team Intelligence.
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Where every meeting becomes organized knowledge and every decision stays connected.
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
