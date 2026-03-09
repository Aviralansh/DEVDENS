import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Calendar, Users, ArrowDown, ChevronRight, Code, Cpu, Shield, Zap, User, Sparkles, X, Send, Loader } from 'lucide-react';

const DevDensWeb = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Data State
  const [eventsData, setEventsData] = useState([]);
  const [teamData, setTeamData] = useState({ mentors: [], executive: [] });

  // AI Feature State
  const [showAI, setShowAI] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch Data Effect
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch Events
        const eventsRes = await fetch('./events.json');
        if (!eventsRes.ok) throw new Error('Failed to load events');
        const events = await eventsRes.json();
        setEventsData(events);
      } catch (err) {
        console.warn("Could not fetch events.json (likely due to preview environment). Using fallback data.");
        setEventsData(FALLBACK_EVENTS);
      }

      try {
        // Fetch People
        const peopleRes = await fetch('./people.json');
        if (!peopleRes.ok) throw new Error('Failed to load people');
        const people = await peopleRes.json();
        setTeamData(people);
      } catch (err) {
        console.warn("Could not fetch people.json (likely due to preview environment). Using fallback data.");
        setTeamData(FALLBACK_PEOPLE);
      }
    };

    loadData();
  }, []);

  
  // Custom hook to track intersection for animations
  const useIntersectionObserver = (options = {}) => {
    const [elements, setElements] = useState([]);
    const [entries, setEntries] = useState([]);

    const observer = useRef(null);

    useEffect(() => {
      if (elements.length) {
        observer.current = new IntersectionObserver((observedEntries) => {
          setEntries(observedEntries);
        }, options);

        elements.forEach((element) => observer.current.observe(element));
      }
      return () => {
        if (observer.current) observer.current.disconnect();
      };
    }, [elements, options]);

    return [setElements, entries];
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white">
        <Terminal size={48} className="animate-pulse mb-4" />
        <div className="w-48 h-1 bg-neutral-900 rounded overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 bg-white w-full origin-left" style={{ animation: 'shimmer 2s infinite linear' }}></div>
        </div>
        <p className="mt-4 font-mono text-xs tracking-[0.3em] animate-pulse">INITIALIZING SYSTEM</p>
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans min-h-screen selection:bg-white selection:text-black overflow-hidden">
      {/* Injected Styles for Main App Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.2s;
        }
      `}</style>

      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="font-bold text-2xl tracking-tighter flex items-center gap-2">
            <Terminal size={24} />
            <span>DEVDENS</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
            <a href="#motive" className="hover:underline underline-offset-4">Motive</a>
            <a href="#events" className="hover:underline underline-offset-4">Events</a>
            <a href="#people" className="hover:underline underline-offset-4">Team</a>
          </div>
        </div>
      </nav>


      {/* Main Scroll Container */}
      <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen w-full snap-start flex flex-col justify-center items-center relative border-b border-neutral-900 pt-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          
          <div className="z-10 text-center px-4">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 animate-fade-in-up opacity-0">
              CODE.<br />
              CREATE.<br />
              CONQUER.
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl max-w-lg mx-auto mb-8 font-light animate-fade-in-up delay-100 opacity-0">
              The official technical club where logic meets creativity.
            </p>

            <div className="animate-bounce absolute bottom-12 left-1/2 -translate-x-1/2">
              <ArrowDown className="text-white opacity-50" />
            </div>
          </div>
        </section>

        {/* MOTIVE SECTION */}
        <section id="motive" className="min-h-screen w-full snap-start flex items-center justify-center bg-black relative border-b border-neutral-900 py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">OUR <span className="text-neutral-500">MOTIVE</span></h2>
              <div className="h-1 w-24 bg-white"></div>
              <p className="text-lg md:text-2xl leading-relaxed text-neutral-300 font-light">
                DevDens exists to bridge the gap between academic theory and industry reality. We cultivate an ecosystem of builders, thinkers, and innovators who aren't afraid to break things to make them better.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  { icon: Code, text: "Open Source Contribution" },
                  { icon: Cpu, text: "Hardware & Software Integration" },
                  { icon: Users, text: "Peer-to-Peer Learning" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-base md:text-lg group">
                    <div className="p-2 border border-neutral-800 rounded group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <item.icon size={18} />
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <div className="relative w-80 h-80 border border-neutral-800 rotate-45 flex items-center justify-center">
                 <div className="w-60 h-60 border border-neutral-700 flex items-center justify-center">
                    <div className="w-40 h-40 bg-white"></div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section id="events" className="min-h-screen w-full snap-start flex flex-col justify-center bg-black relative border-b border-neutral-900 py-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex items-baseline justify-between mb-12 md:mb-16">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">UPCOMINNG</h2>
              <span className="text-neutral-500 font-mono hidden md:block">/// SCHEDULE_2025</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-neutral-800">
              {eventsData.map((event, idx) => (
                <div key={idx} className="group border-r border-b border-neutral-800 p-8 hover:bg-white hover:text-black transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[16rem] md:h-80">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-sm tracking-wider opacity-60">{event.date}</span>
                    <ArrowDown className="opacity-0 group-hover:opacity-100 -rotate-45 transition-transform duration-300" />
                  </div>
                  <div className="mt-8 md:mt-0">
                    <span className="inline-block px-2 py-1 border border-current text-xs font-bold mb-4 rounded-full">{event.type}</span>
                    <h3 className="text-3xl font-bold mb-2 leading-none">{event.title}</h3>
                    <p className="text-sm opacity-70 group-hover:opacity-100">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PEOPLE SECTION */}
        <section id="people" className="min-h-screen w-full snap-start flex flex-col justify-between bg-black relative pt-20">
          <div className="max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col justify-center pb-20">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 md:mb-12 text-center md:text-left">
              CORE <span className="text-neutral-500">UNIT</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {/* Mentors */}
              <div className="col-span-2 md:col-span-4 mb-2 md:mb-4">
                <h3 className="text-xs font-mono uppercase text-neutral-500 mb-4 tracking-widest border-b border-neutral-800 pb-2">Mentors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teamData.mentors.map((member, idx) => (
                    <MemberCard key={idx} role={member.role} name={member.name} icon={<Shield />} />
                  ))}
                </div>
              </div>

              {/* Core Team */}
              <div className="col-span-2 md:col-span-4">
                <h3 className="text-xs font-mono uppercase text-neutral-500 mb-4 tracking-widest border-b border-neutral-800 pb-2">Executive Board</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {teamData.executive.map((member, idx) => (
                    <MemberCard key={idx} role={member.role} name={member.name} icon={member.role === 'Tech Head' ? <Zap /> : <User />} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="w-full p-8 pb-12 border-t border-neutral-900 bg-black">
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-500 text-xs font-mono gap-4">
                <p>&copy;DEVDENS CGC-University.</p>
                <div className="flex items-center gap-1">
                   <span>DESIGN BY </span>
                   <a href="https://github.com/Aviralansh" target="_blank" rel="noopener noreferrer" className="text-white hover:underline underline-offset-4">@AVIRALANSH</a>
                </div>
             </div>
          </footer>
        </section>

      </main>
    </div>
  );
};

const MemberCard = ({ role, name, icon }) => (
  <div className="group relative p-6 border border-neutral-800 hover:border-white transition-colors duration-300 bg-neutral-900/20 backdrop-blur-sm">
    <div className="absolute top-4 right-4 text-neutral-700 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <div className="mt-8">
      <p className="text-xs font-mono text-neutral-500 mb-1 uppercase tracking-wider group-hover:text-neutral-300">{role}</p>
      <h4 className="text-lg md:text-xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">{name}</h4>
    </div>
    <div className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-500 ease-out"></div>
  </div>
);

// Fallback Data for Preview Environment (When JSON fetch fails)
const FALLBACK_EVENTS = [
  { 
    "date": "JAN 27", 
    "title": "HackerRank Competition", 
    "type": "DSA Competition", 
    "desc": "Test your problem solving skills here."
  },
  { 
    "date": "FEB 02", 
    "title": "Fronend Fista", 
    "type": "WORKSHOP", 
    "desc": "Get hands-on experirence on Frontend."
  },
  { 
    "date": "FEB 09", 
    "title": "Industrial Visit", 
    "type": "Exposure Program", 
    "desc": "Real-world exposure to industrial process."
  }
];

const FALLBACK_PEOPLE = {
  "mentors": [
    { "role": "Faculty Mentor", "name": "Dr. Preete Mam" },
    { "role": "Alumni Mentor", "name": "Ms. Vipasha Mam" }
  ],
  "executive": [
    { "role": "President", "name": "Abuzar" },
    { "role": "Vice President", "name": "Nikhil" },
    { "role": "Secretery", "name": "Ananya" },
    { "role": "Tech Head", "name": "Aviral" }
  ]
};

export default DevDensWeb;