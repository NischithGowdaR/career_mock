"use client";
import Ai3DBackground from "@/components/Ai3DBackground";
import { RegisterForm } from "../../components/register-form";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#080b12] selection:bg-yellow-500/30">
      {/* 3D Animated AI Voice & Mesh Background Canvas */}
      <Ai3DBackground />

      {/* Subtle Backdrop Blur & Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-none z-[1]" />

      {/* Centered Glassmorphism Register Card */}
      <div className="relative z-10 w-full max-w-md px-6 py-10 my-8">
        <RegisterForm />
      </div>
    </div>
  );
}
