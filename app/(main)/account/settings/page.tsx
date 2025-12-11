"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Check,
  AlertCircle
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  account_type: string;
  account_number: string;
  created_at: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setUser(profile);
        setFormData({
          firstName: profile.first_name,
          lastName: profile.last_name,
          phone: profile.phone || "",
        });
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const supabase = createClient();

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user?.id);

    if (updateError) {
      setError("Failed to update profile. Please try again.");
    } else {
      setSuccess("Profile updated successfully!");
      // Update local state
      setUser(prev => prev ? {
        ...prev,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone || null,
      } : null);
    }

    setSaving(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setSaving(true);

    const supabase = createClient();

    const { error: passwordError } = await supabase.auth.updateUser({
      password: passwordData.newPassword,
    });

    if (passwordError) {
      setError(passwordError.message);
    } else {
      setSuccess("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-off-white pt-24 pb-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-black/20 border-t-primary-black rounded-full animate-spin" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-off-white pt-32 pb-16">
      <div className="max-w-[800px] mx-auto px-6">
        {/* Back Link */}
        <Link 
          href="/account" 
          className="inline-flex items-center gap-2 text-[13px] text-warm-grey hover:text-primary-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-display tracking-[0.15em] uppercase mb-2">
            Account Settings
          </h1>
          <p className="text-warm-grey text-[14px] mb-8">
            Manage your account information and preferences
          </p>

          {/* Success/Error Messages */}
          {success && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 text-[14px] mb-6">
              <Check className="w-5 h-5" />
              {success}
            </div>
          )}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-[14px] mb-6">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {/* Account Number (Read Only) */}
          <div className="bg-white p-6 border border-light-grey mb-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-warm-grey" />
              <h2 className="text-[14px] font-medium tracking-[0.1em] uppercase">Account Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                  Account Number
                </label>
                <div className="px-4 py-3 bg-off-white border border-light-grey text-[14px] text-warm-grey">
                  {user.account_number}
                </div>
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                  Account Type
                </label>
                <div className="px-4 py-3 bg-off-white border border-light-grey text-[14px] text-warm-grey capitalize">
                  {user.account_type}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <form onSubmit={handleProfileUpdate} className="bg-white p-6 border border-light-grey mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-5 h-5 text-warm-grey" />
              <h2 className="text-[14px] font-medium tracking-[0.1em] uppercase">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-3 bg-off-white border border-light-grey text-[14px] text-warm-grey cursor-not-allowed"
                />
                <p className="text-[11px] text-warm-grey mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-grey" />
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+44 20 1234 5678"
                    className="w-full pl-12 pr-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-6 px-6 py-3 bg-primary-black text-white text-[12px] tracking-[0.1em] uppercase hover:bg-soft-black transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>

          {/* Change Password */}
          <form onSubmit={handlePasswordChange} className="bg-white p-6 border border-light-grey">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-5 h-5 text-warm-grey" />
              <h2 className="text-[14px] font-medium tracking-[0.1em] uppercase">Change Password</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-4 py-3 border border-light-grey bg-white text-[14px] focus:outline-none focus:border-primary-black transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || !passwordData.newPassword || !passwordData.confirmPassword}
              className="mt-6 px-6 py-3 bg-primary-black text-white text-[12px] tracking-[0.1em] uppercase hover:bg-soft-black transition-colors disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Password"}
            </button>
          </form>

          {/* Danger Zone */}
          <div className="mt-8 p-6 border border-red-200 bg-red-50">
            <h2 className="text-[14px] font-medium tracking-[0.1em] uppercase text-red-700 mb-2">
              Danger Zone
            </h2>
            <p className="text-[13px] text-red-600 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              type="button"
              className="px-6 py-3 border border-red-600 text-red-600 text-[12px] tracking-[0.1em] uppercase hover:bg-red-600 hover:text-white transition-colors"
              onClick={() => {
                if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                  // Handle account deletion
                  alert("Please contact support to delete your account.");
                }
              }}
            >
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

