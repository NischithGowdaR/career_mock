"use client";
import Ai3DBackground from "@/components/Ai3DBackground";
import { LoginForm } from "../../components/login-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#080b12] selection:bg-yellow-500/30">
      {/* 3D Animated AI Voice & Mesh Background Canvas */}
      <Ai3DBackground />

      {/* Subtle Backdrop Blur & Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-none z-[1]" />

      {/* Centered Glassmorphism Login Card */}
      <div className="relative z-10 w-full max-w-md px-6 py-10 my-8">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] p-8 border border-white/40 dark:border-gray-700/50">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
