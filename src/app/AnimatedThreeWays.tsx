"use client";

import { useState, useEffect, useRef } from "react";

const points = [
  {
    title: "Captures everything",
    description: "Beautiful, organized notes—automatically created from every meeting.",
    diagram: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg h-96 bg-white rounded-2xl shadow-xl p-8 border overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Sprint Planning Meeting</h2>
            <div className="flex items-center gap-3 text-base text-gray-600">
              <span>📅 Today 2:00 PM</span>
              <span>Sarah, Mike +5</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-base">Key Decisions</h3>
              <div className="space-y-2 text-base text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Prioritize API performance optimization</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Increase Q2 infrastructure budget by 20%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-base">Action Items</h3>
              <div className="space-y-2 text-base text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Set up caching layer (Sarah, Sprint 24)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Load testing environment (Mike)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-base">Timeline & Budget</h3>
              <div className="space-y-2 text-base text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>API optimization due March 15th</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Infrastructure budget: $50k → $60k</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-base">Next Steps</h3>
              <div className="space-y-2 text-base text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Review infrastructure proposal</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Schedule follow-up for Sprint 25 planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Connects the dots",
    description: "Smart underlines surface context and link decisions across meetings, so nothing falls through the cracks.",
    diagram: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg h-96 bg-white rounded-2xl shadow-xl p-8 border">
          <div className="text-base text-gray-800 leading-relaxed">
            <div className="mb-8 text-center font-semibold text-xl text-gray-900">Smart Context Detection</div>
            <p className="mb-6 text-base leading-7">
              The team agreed to prioritize the{" "}
              <span className="underline decoration-[#0066FF] decoration-2 underline-offset-4 cursor-pointer relative group bg-blue-50 px-2 py-1 rounded">
                API performance issues
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-black text-white text-sm rounded px-4 py-2 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                  → JIRA: API-2847
                </span>
              </span>{" "}
              blocking the mobile release.
            </p>
            <p className="text-base leading-7">
              Sarah will lead with a{" "}
              <span className="underline decoration-[#0066FF] decoration-2 underline-offset-4 cursor-pointer relative group bg-blue-50 px-2 py-1 rounded">
                target completion by March 15th
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-black text-white text-sm rounded px-4 py-2 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                  Added to calendar
                </span>
              </span>.
            </p>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-800 font-medium">💡 Smart connections found</div>
              <div className="text-sm text-blue-700 mt-1">2 related decisions • 1 linked ticket</div>
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
        <div className="w-full max-w-lg h-96 bg-white rounded-2xl shadow-xl p-8 border">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-blue-700 text-xl">🎯</span>
            </div>
            <div>
              <div className="font-semibold text-xl text-gray-900">3 action items detected</div>
              <div className="text-base text-gray-600">Ready for your review</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <input type="checkbox" checked readOnly className="text-green-600 w-5 h-5" />
              <span className="text-base text-gray-800 font-medium">Optimize API endpoints</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <input type="checkbox" checked readOnly className="text-green-600 w-5 h-5" />
              <span className="text-base text-gray-800 font-medium">Set up staging environment</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <input type="checkbox" readOnly className="text-blue-600 w-5 h-5" />
              <span className="text-base text-gray-800 font-medium">Review infrastructure proposal</span>
            </div>
          </div>
          <button className="w-full mt-8 bg-blue-100 text-blue-700 text-base py-4 rounded-xl hover:bg-blue-200 transition font-semibold">
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
        <div className="w-full lg:w-3/5 h-[500px] bg-gray-50 rounded-2xl flex items-center justify-center transition-all duration-700 ease-in-out sticky top-20">
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