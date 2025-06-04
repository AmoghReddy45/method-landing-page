"use client";

import { useState, useEffect, useRef } from "react";

const points = [
  {
    title: "Captures everything",
    description: "Beautiful, organized notes—automatically created from every meeting.",
    diagram: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg h-96 bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04),0_12px_24px_rgba(0,0,0,0.06)] p-8 border-0 overflow-hidden relative">
          <div className="mb-6">
            <h2 className="text-[20px] font-bold text-[#000] mb-2 tracking-[-0.02em]">Sprint Planning Meeting</h2>
            <div className="flex items-center gap-3 text-[13px] text-[#666]">
              <span>📅 Today 2:00 PM</span>
              <div className="w-[3px] h-[3px] bg-[#CCC] rounded-full"></div>
              <span>Sarah, Mike +5</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#000] mb-3 text-[16px] tracking-[-0.01em]">Key Decisions</h3>
              <div className="space-y-2 text-[14px] text-[#333]">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#DDD] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Prioritize <span className="font-medium border-b-[1.5px] border-[#C7D2FE] hover:border-[#A5B4FC] transition-all duration-150 cursor-pointer">API performance optimization</span></span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#DDD] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Increase <span className="font-medium border-b-[1.5px] border-[#C7D2FE] hover:border-[#A5B4FC] transition-all duration-150 cursor-pointer">Q2 infrastructure budget</span> by 20%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#000] mb-3 text-[16px] tracking-[-0.01em]">Action Items</h3>
              <div className="space-y-2 text-[14px] text-[#333]">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#DDD] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Set up caching layer (Sarah, Sprint 24)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#DDD] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Load testing environment (Mike)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#000] mb-3 text-[16px] tracking-[-0.01em]">Timeline & Budget</h3>
              <div className="space-y-2 text-[14px] text-[#333]">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#DDD] rounded-full mt-2 flex-shrink-0"></div>
                  <span>API optimization due March 15th</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#DDD] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Infrastructure budget: $50k → $60k</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#000] mb-3 text-[16px] tracking-[-0.01em]">Next Steps</h3>
              <div className="space-y-2 text-[14px] text-[#333]">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#DDD] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Review infrastructure proposal</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#DDD] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Schedule follow-up for Sprint 25 planning</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom fade overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-2xl"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Connects the dots",
    description: "Smart underlines surface context and link decisions across meetings, so nothing falls through the cracks.",
    diagram: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg h-96 bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04),0_12px_24px_rgba(0,0,0,0.06)] p-8 border-0 overflow-hidden">
          <div className="text-[14px] text-[#333] leading-relaxed">
            <div className="mb-8 text-center font-semibold text-[20px] text-[#000] tracking-[-0.02em]">Smart Context Detection</div>
            <p className="mb-6 text-[14px] leading-[1.6]">
              The team agreed to prioritize the{" "}
              <span className="font-medium border-b-[1.5px] border-[#C7D2FE] hover:border-[#A5B4FC] transition-all duration-150 cursor-pointer relative group bg-[#FAFAFA] px-2 py-1 rounded">
                API performance issues
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-[#000] text-white text-[12px] rounded px-3 py-1.5 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                  → JIRA: API-2847
                </span>
              </span>{" "}
              blocking the mobile release.
            </p>
            <p className="text-[14px] leading-[1.6] mb-8">
              Sarah will lead with a{" "}
              <span className="font-medium border-b-[1.5px] border-[#C7D2FE] hover:border-[#A5B4FC] transition-all duration-150 cursor-pointer relative group bg-[#FAFAFA] px-2 py-1 rounded">
                target completion by March 15th
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-[#000] text-white text-[12px] rounded px-3 py-1.5 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                  Added to calendar
                </span>
              </span>.
            </p>
            <div className="p-4 bg-[#FAFAFA] rounded-lg border border-[#EAEAEA]">
              <div className="text-[13px] text-[#000] font-medium">💡 Smart connections found</div>
              <div className="text-[12px] text-[#666] mt-1">2 related decisions • 1 linked ticket</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Drives action",
    description: "AI detects action items and helps your team follow through—every time.",
    diagram: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg h-96 bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.04),0_12px_24px_rgba(0,0,0,0.06)] p-8 border-0 overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-[#F5F5F5] rounded-lg flex items-center justify-center">
              <span className="text-[#666] text-lg">🎯</span>
            </div>
            <div>
              <div className="font-semibold text-[20px] text-[#000] tracking-[-0.02em]">3 action items detected</div>
              <div className="text-[14px] text-[#666]">Ready for your review</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-[#F5F5F5] rounded-lg border border-[#E5E5E5]">
              <div className="w-4 h-4 border-[1.5px] border-[#000] rounded-[4px] flex items-center justify-center flex-shrink-0 bg-[#000]">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[14px] text-[#000] font-medium">Optimize API endpoints</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-[#F5F5F5] rounded-lg border border-[#E5E5E5]">
              <div className="w-4 h-4 border-[1.5px] border-[#000] rounded-[4px] flex items-center justify-center flex-shrink-0 bg-[#000]">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[14px] text-[#000] font-medium">Set up staging environment</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-[#EAEAEA]">
              <div className="w-4 h-4 border-[1.5px] border-[#DDD] rounded-[4px] flex items-center justify-center flex-shrink-0 hover:border-[#000] transition-all">
                <div className="w-1.5 h-1.5 bg-[#000] rounded-[1px] opacity-0 hover:opacity-20 transition-opacity"></div>
              </div>
              <span className="text-[14px] text-[#000] font-medium">Review infrastructure proposal</span>
            </div>
          </div>
          <button className="w-full mt-8 bg-[#000] hover:bg-[#333] text-white text-[13px] py-3 rounded-lg transition font-medium">
            Sync to Jira
          </button>
        </div>
      </div>
    ),
  },
];

export default function AnimatedThreeWays() {
  const [selected, setSelected] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pointRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = pointRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1 && index !== selected) {
              setIsTransitioning(true);
              setTimeout(() => {
                setSelected(index);
                setTimeout(() => setIsTransitioning(false), 50);
              }, 250);
            }
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: "-20% 0px -20% 0px"
      }
    );

    pointRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [selected]);

  return (
    <section className="flex flex-col items-center justify-center py-24 px-4 bg-white relative" id="features">
      {/* Vertical lines on both sides */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 hidden lg:block"></div>
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gray-200 hidden lg:block"></div>
      
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-medium mb-4 text-black leading-tight">
          Method transforms how teams work.
        </h2>
      </div>
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-20 items-start justify-center">
        {/* Left: Large Diagram */}
        <div className="w-full lg:w-3/5 h-[500px] bg-gray-50 rounded-2xl flex items-center justify-center transition-all duration-700 ease-in-out sticky top-40">
          <div className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-25' : 'opacity-100'}`}>
            {points[selected].diagram}
          </div>
        </div>
        
        {/* Right: Scroll-triggered Points */}
        <div className="w-full lg:w-2/5 flex flex-col gap-32">
          {points.map((point, idx) => (
            <div
              key={point.title}
              ref={(el) => {pointRefs.current[idx] = el;}}
              className="min-h-[400px] flex flex-col justify-center"
            >
              <h3 className="text-4xl md:text-5xl font-semibold mb-6 text-black leading-tight">
                {point.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 