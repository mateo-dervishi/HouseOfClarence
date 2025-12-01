"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual authentication
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to account or home
    }, 1500);
  };

  return (
    <main className="min-h-screen flex">
      {/* Left - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=1600&fit=crop"
          alt="Luxury interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[13px] tracking-[0.2em] uppercase mb-4"
          >
            Welcome Back
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-display tracking-[0.15em] uppercase"
          >
            Build Your Dream Space
          </motion.h2>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 bg-off-white">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <Link href="/" className="block mb-12">
            <h1 className="text-xl tracking-[0.3em] font-display uppercase text-center lg:text-left">
              HOUSE OF CLARENCE
            </h1>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-display tracking-[0.15em] uppercase mb-2">
              Sign In
            </h2>
            <p className="text-warm-grey text-[14px] mb-8">
              Access your account to manage your selections and projects
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-grey hover:text-primary-black transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-[12px] tracking-[0.05em] text-warm-grey hover:text-primary-black transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-primary-black text-white text-[13px] tracking-[0.15em] uppercase hover:bg-soft-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-light-grey" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-off-white text-[12px] text-warm-grey tracking-[0.1em] uppercase">
                  New to House of Clarence?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <Link
              href="/register"
              className="block w-full py-4 border border-primary-black text-primary-black text-[13px] tracking-[0.15em] uppercase text-center hover:bg-primary-black hover:text-white transition-colors"
            >
              Create an Account
            </Link>

            {/* Benefits */}
            <div className="mt-10 pt-8 border-t border-light-grey">
              <p className="text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-4">
                Account Benefits
              </p>
              <ul className="space-y-3 text-[13px] text-charcoal">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-1.5 flex-shrink-0" />
                  Save and organise your product selections by room
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-1.5 flex-shrink-0" />
                  Request quotes for your entire project
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-1.5 flex-shrink-0" />
                  Track your enquiries and orders
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-1.5 flex-shrink-0" />
                  Access exclusive trade pricing
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

