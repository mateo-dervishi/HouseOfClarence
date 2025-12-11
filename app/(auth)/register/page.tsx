"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "homeowner",
    agreeTerms: false,
    newsletter: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password requirements
    if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[A-Z]/.test(formData.password)) {
      setError("Password does not meet requirements");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          accountType: formData.accountType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        setIsLoading(false);
        return;
      }

      // Show brief success message then redirect
      setSuccess("Account created! Please check your email to verify your account.");
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "Contains a number", met: /\d/.test(formData.password) },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
  ];

  return (
    <main className="min-h-screen flex">
      {/* Left - Image (Fixed) */}
      <div className="hidden lg:block lg:w-2/5 fixed top-0 left-0 h-screen">
        <Image
          src="/signin-hero.png"
          alt="Luxury interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[13px] tracking-[0.2em] uppercase mb-4"
          >
            Join House of Clarence
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-display tracking-[0.15em] uppercase mb-4"
          >
            Curate Your Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-[14px] leading-relaxed"
          >
            Create an account to save your selections, organise by room, 
            and receive personalised quotes for your project.
          </motion.p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col px-6 py-12 lg:px-12 xl:px-20 bg-off-white overflow-y-auto relative lg:ml-[40%]">
        {/* Back to Home */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[13px] text-warm-grey hover:text-primary-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="w-full max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-display tracking-[0.15em] uppercase mb-2">
              Create Account
            </h2>
            <p className="text-warm-grey text-[14px] mb-8">
              Start building your dream space with House of Clarence
            </p>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-[14px] mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-[14px] mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-2"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors"
                  />
                </div>
              </div>

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
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors"
                  placeholder="+44 20 1234 5678"
                />
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-3">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center justify-center p-4 border cursor-pointer transition-colors ${
                      formData.accountType === "homeowner"
                        ? "border-primary-black bg-white"
                        : "border-light-grey bg-white hover:border-warm-grey"
                    }`}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value="homeowner"
                      checked={formData.accountType === "homeowner"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-[13px] tracking-[0.1em] uppercase">Homeowner</span>
                  </label>
                  <label
                    className={`flex items-center justify-center p-4 border cursor-pointer transition-colors ${
                      formData.accountType === "professional"
                        ? "border-primary-black bg-white"
                        : "border-light-grey bg-white hover:border-warm-grey"
                    }`}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value="professional"
                      checked={formData.accountType === "professional"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-[13px] tracking-[0.1em] uppercase">Designer / Professional</span>
                  </label>
                </div>
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors pr-12"
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
                {/* Password Requirements - always rendered to prevent layout shift */}
                <div className={`mt-3 space-y-1 transition-opacity duration-200 ${formData.password ? "opacity-100" : "opacity-0"}`}>
                  {passwordRequirements.map((req, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-[12px] ${
                        req.met ? "text-green-600" : "text-warm-grey"
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${req.met ? "opacity-100" : "opacity-30"}`} />
                      {req.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-[12px] tracking-[0.1em] uppercase text-warm-grey mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors"
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-[12px] mt-1">Passwords do not match</p>
                )}
              </div>

              {/* Terms & Newsletter */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 border-light-grey"
                  />
                  <span className="text-[13px] text-charcoal">
                    I agree to the{" "}
                    <Link href="/terms-conditions" className="underline hover:opacity-60">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="underline hover:opacity-60">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 border-light-grey"
                  />
                  <span className="text-[13px] text-charcoal">
                    Keep me updated with new collections and exclusive offers
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.agreeTerms}
                className="w-full py-4 bg-primary-black text-white text-[13px] tracking-[0.15em] uppercase hover:bg-soft-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-8 text-[14px] text-warm-grey">
              Already have an account?{" "}
              <Link href="/login" className="text-primary-black underline hover:opacity-60">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

