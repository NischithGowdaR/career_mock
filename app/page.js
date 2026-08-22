"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, Mic, ShieldCheck, 
  BarChart3, Target, Sparkles, Gift, Zap, TrendingUp, Lock, CreditCard, User
} from "lucide-react"; 
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// --- HAPTIC FEEDBACK UTILITY ---
const triggerHaptic = (pattern = 40) => {
  if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(pattern);
  }
};

// --- PREMIUM GOLD & SILVER PAPER BLAST ---
const PremiumGoldConfetti = () => {
  const pieces = Array.from({ length: 90 });
  const colors = ["#D4AF37", "#F1E5AC", "#C0C0C0", "#FFFFFF", "#B8860B"];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
      {pieces.map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 45 + 15; 
        const targetX = Math.cos(angle) * velocity;
        const targetY = Math.sin(angle) * velocity - 25; 

        return (
          <motion.div
            key={i}
            initial={{ y: "45vh", x: "50vw", scale: 0, rotate: 0 }}
            animate={{ 
              x: ["50vw", `${50 + targetX}vw`, `${50 + targetX * 1.3}vw`],
              y: ["45vh", `${45 + targetY}vh`, "110vh"],
              rotateX: [0, 360, 720],
              rotateY: [0, 180, 540],
              scale: [0, 1, 1, 0.6],
              opacity: [0, 0.8, 0.8, 0] 
            }}
            transition={{ 
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="absolute w-1.5 h-3.5 rounded-sm shadow-sm"
            style={{ 
              backgroundColor: colors[i % colors.length],
              border: '0.5px solid rgba(0,0,0,0.05)'
            }}
          />
        );
      })}
    </div>
  );
};

const ScrollFadeIn = ({ children, delay = 0, duration = 0.8, yOffset = 30 }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }} 
    transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function CareerMockLanding() {
  const router = useRouter();
  const [adminMenu, setAdminMenu] = useState({ visible: false, x: 0, y: 0 });
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setAdminMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleClick = () => setAdminMenu({ ...adminMenu, visible: false });
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [adminMenu]);

  const teamMembers = [
    { name: "Nischith Gowda R", role: "ENGINEER" },
    { name: "Manohar VM", role: "ENGINEER" },
    { name: "Chandrashekara VR", role: "ENGINEER" },
    { name: "Punith GG", role: "ENGINEER" },
  ];

  return (
    <div className="bg-white text-[#1d1d1f] font-sans antialiased relative selection:bg-yellow-100 overflow-x-hidden">
      
      <PremiumGoldConfetti />

      {/* Navigation Header */}
      <nav className="fixed top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-[1100px] mx-auto h-16 flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="group-hover:scale-105 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-[#1D1D1F]">Career Mock <span className="text-yellow-600 font-extrabold text-xs ml-1 px-2 py-0.5 bg-yellow-50 border border-yellow-200 rounded-full uppercase">AI</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#424245]">
            <a href="#features" className="hover:text-yellow-600 transition-colors">Features</a>
            <a href="#offer" className="hover:text-yellow-600 transition-colors">Pro Offer</a>
            <a href="#team" className="hover:text-yellow-600 transition-colors">Our Team</a>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => { triggerHaptic(); router.push("/login"); }} 
              className="text-[13px] font-semibold text-[#1D1D1F] hover:text-yellow-600 hover:bg-gray-50 rounded-full px-4"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => { triggerHaptic(); router.push("/login"); }} 
              className="bg-black hover:bg-yellow-600 text-white text-[13px] px-5 py-2 h-9 rounded-full font-semibold shadow-md active:scale-95 transition-all"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 flex flex-col items-center justify-center text-center px-6 min-h-[90vh]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.04 }} transition={{ duration: 2 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-black select-none z-0 tracking-tighter italic">
          2026
        </motion.div>

        <div className="relative z-20">
          <motion.div style={{ scale: logoScale, y: logoY }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="mb-8">
            <div className="relative inline-block">
                <Image src="/logo.png" alt="Logo" width={220} height={220} className="drop-shadow-2xl" />
                <div className="absolute -top-2 -right-6 bg-white text-yellow-600 px-3 py-1 rounded-full font-bold text-[10px] shadow-sm border border-yellow-100 uppercase tracking-widest">
                    2026 Edition
                </div>
            </div>
          </motion.div>

          <ScrollFadeIn delay={0.3}>
            <div className="flex items-center justify-center gap-2 mb-4 opacity-40 uppercase tracking-[0.5em] text-[10px] font-bold">
                <Sparkles size={12} className="text-yellow-600" /> Next-Gen AI Mock Interviews
            </div>
            <h1 className="text-6xl md:text-[90px] font-bold tracking-tighter leading-[0.95] mb-8">
                Master Your <br /> <span className="text-yellow-600">Dream Interview.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed italic">
              Elevate your interview skills with real-time AI feedback and realistic role-based scenarios.
            </p>
            <Button onClick={() => { triggerHaptic(50); router.push("/login"); }} size="lg" className="h-16 px-10 rounded-full bg-black hover:bg-yellow-600 text-white font-bold text-lg tracking-tight shadow-xl transition-colors">
                Start Mock Interview <ChevronRight className="ml-2" />
            </Button>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Offer Section */}
      <section id="offer" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeIn>
            <div className="bg-[#F5F5F7] rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-10 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest text-yellow-600 border border-yellow-100">
                  <Gift size={12} /> Exclusive Pro Access
                </div>
                <h2 className="text-5xl font-bold tracking-tight text-[#1D1D1F]">Career Booster <br /><span className="text-yellow-600">PRO PASS</span></h2>
                <p className="text-gray-500 font-medium max-w-xs leading-snug">Upgrade your interview readiness with 10% off all premium features & unlimited practice sessions.</p>
                <Button 
                  onClick={() => router.push('/recruiter/billing')}
                  className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl px-6 h-12 font-bold flex items-center gap-2 shadow-lg shadow-yellow-600/20 active:scale-95 transition-all"
                >
                  Explore Pro Plan <CreditCard size={18} />
                </Button>
              </div>
              <div className="bg-white p-8 rounded-[32px] text-center shadow-sm min-w-[200px] border border-gray-100">
                 <span className="text-7xl font-bold tracking-tighter text-[#1D1D1F]">10%</span>
                 <p className="text-[10px] font-black uppercase tracking-widest mt-2 text-yellow-600">Special Discount</p>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-white relative z-10">
        <div className="max-w-[1100px] mx-auto text-center">
          <ScrollFadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-20 text-[#1D1D1F]">
              Next-Gen AI Tools, <br /> Built for Tech Professionals.
            </h2>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mic, title: "Real-Time Voice AI", desc: "Practice natural spoken responses with dynamic AI-powered speech evaluation.", color: "text-yellow-600" },
              { icon: Target, title: "Targeted Technical Drills", desc: "Tailored interview questions designed for modern software, data, and engineering roles.", color: "text-yellow-600" },
              { icon: BarChart3, title: "Comprehensive Analytics", desc: "Track confidence, speech metrics, and detailed scoring insights over time.", color: "text-yellow-600" },
            ].map((feat, i) => (
              <ScrollFadeIn key={i} delay={i * 0.1}>
                <div className="bg-[#fcfcfc] rounded-[32px] p-10 h-full border border-gray-100 flex flex-col group hover:shadow-xl transition-all">
                  <feat.icon className={`${feat.color} w-10 h-10 mb-6 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{feat.title}</h3>
                  <p className="text-[#636366] leading-relaxed text-sm font-medium">{feat.desc}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 bg-white border-t border-gray-50 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <ScrollFadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-center tracking-tight mb-20">
              The engineers behind <br /> your success.
            </h2>
          </ScrollFadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <ScrollFadeIn key={i} delay={i * 0.1}>
                <div className="group flex flex-col items-center text-center p-8 bg-[#fcfcfc] rounded-[32px] border border-gray-100 transition-all hover:bg-white hover:shadow-xl shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-yellow-50 border border-yellow-200 flex items-center justify-center mb-6 text-yellow-600 group-hover:scale-110 transition-transform">
                    <User size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-[#1d1d1f] mb-1 tracking-tight">{member.name}</h4>
                  <p className="text-[#636366] text-xs font-semibold uppercase tracking-widest">{member.role}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer onContextMenu={handleContextMenu} className="bg-[#FAF9F6] border-t border-gray-100 pt-20 pb-12 px-6 relative z-10 text-[#1D1D1F]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            {/* Column 1: Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Logo" width={32} height={32} />
                <span className="font-bold text-lg tracking-tight">Career Mock AI</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Elevating job interview readiness with real-time speech evaluation and intelligent AI-driven feedback.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-200 text-[10px] font-bold text-green-700">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Systems Operational
              </div>
            </div>

            {/* Column 2: Platform Features */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400">Platform</h5>
              <ul className="space-y-2 text-xs font-semibold text-gray-600">
                <li><a href="#features" className="hover:text-yellow-600 transition-colors">Real-Time Voice AI</a></li>
                <li><a href="#features" className="hover:text-yellow-600 transition-colors">Technical Question Drills</a></li>
                <li><a href="#features" className="hover:text-yellow-600 transition-colors">Performance Analytics</a></li>
                <li><a href="#offer" className="hover:text-yellow-600 transition-colors">Pro Discount Pass</a></li>
              </ul>
            </div>

            {/* Column 3: Navigation & Portals */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400">Portals</h5>
              <ul className="space-y-2 text-xs font-semibold text-gray-600">
                <li><Link href="/login" className="hover:text-yellow-600 transition-colors">Candidate Sign In</Link></li>
                <li><Link href="/recruiter/dashboard" className="hover:text-yellow-600 transition-colors">Recruiter Portal</Link></li>
                <li><Link href="/admin/login" className="hover:text-yellow-600 transition-colors">Admin Login</Link></li>
                <li><a href="#team" className="hover:text-yellow-600 transition-colors">Engineering Team</a></li>
              </ul>
            </div>

            {/* Column 4: Engineering Team */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400">Engineering Team</h5>
              <ul className="space-y-1.5 text-xs font-medium text-gray-500">
                <li>Nischith Gowda R</li>
                <li>Manohar VM</li>
                <li>Chandrashekara VR</li>
                <li>Punith GG</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-400">
            <p>© 2026 Career Mock AI. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/login" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
              <Link href="/login" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
              <button onClick={() => router.push('/admin/login')} className="hover:text-yellow-600 transition-colors">Admin Portal</button>
            </div>
          </div>
        </div>

        {adminMenu.visible && (
          <div className="fixed z-[300] bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow-2xl p-1 animate-in fade-in zoom-in duration-200" style={{ top: adminMenu.y, left: adminMenu.x }}>
            <button onClick={() => router.push('/admin')} className="flex items-center gap-3 px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 rounded-lg w-full transition-colors">
              <Lock size={14} className="text-yellow-600" /> Open Admin Portal
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}