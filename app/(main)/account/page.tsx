"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ClipboardList, 
  Settings, 
  LogOut, 
  ChevronRight,
  Home,
  FileText,
  User as UserIcon
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useSelectionStore } from "@/stores/selectionStore";

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

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { items, labels } = useSelectionStore();
  
  // Get unique label IDs from items
  const uniqueLabelIds = [...new Set(items.map(item => item.labelId))];
  const totalItems = items.length;
  
  // Helper to get label name from labelId
  const getLabelName = (labelId: string | undefined) => {
    if (!labelId) return "Unassigned";
    const label = labels.find(l => l.id === labelId);
    return label?.name || "Unassigned";
  };

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
        return;
      }

      // Fetch profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setUser(profile);
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
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

  const menuItems = [
    { icon: ClipboardList, label: "My Selection", href: "/selection", badge: `${totalItems} Items` },
    { icon: Settings, label: "Account Settings", href: "/account/settings" },
  ];

  return (
    <main className="min-h-screen bg-off-white pt-24 pb-16">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-[12px] tracking-[0.05em] text-warm-grey">
            <li>
              <Link href="/" className="hover:text-primary-black transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-primary-black">My Account</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 border border-light-grey"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 pb-6 border-b border-light-grey">
                <div className="w-14 h-14 rounded-full bg-primary-black flex items-center justify-center">
                  <span className="text-white text-lg font-display">
                    {user.first_name[0]}{user.last_name[0]}
                  </span>
                </div>
                <div>
                  <h2 className="font-medium text-[15px] tracking-wide uppercase">
                    {user.first_name} {user.last_name}
                  </h2>
                  <p className="text-[12px] text-warm-grey capitalize">{user.account_type}</p>
                </div>
              </div>

              {/* Account Number */}
              <div className="py-4 border-b border-light-grey">
                <p className="text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">Account Number</p>
                <p className="text-[14px] font-medium tracking-wider">{user.account_number}</p>
              </div>

              {/* Menu */}
              <nav className="pt-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between py-3 px-2 -mx-2 hover:bg-off-white transition-colors rounded"
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-warm-grey" />
                      <span className="text-[14px]">{item.label}</span>
                    </span>
                    {item.badge && (
                      <span className="text-[11px] text-warm-grey bg-off-white px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
                
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-3 py-3 px-2 -mx-2 w-full text-left hover:bg-off-white transition-colors rounded text-red-600 mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-[14px]">Sign Out</span>
                </button>
              </nav>
            </motion.div>
          </aside>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 border border-light-grey"
            >
              <h1 className="text-2xl font-display tracking-[0.15em] uppercase mb-2">
                Welcome back, {user.first_name}
              </h1>
              <p className="text-warm-grey text-[14px]">
                Member since {formatDate(user.created_at)}
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Account Number", value: user.account_number, icon: UserIcon },
                { label: "Items Selected", value: totalItems.toString(), icon: ClipboardList },
                { label: "Rooms/Categories", value: uniqueLabelIds.length.toString(), icon: Home },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 border border-light-grey"
                >
                  <stat.icon className="w-6 h-6 text-warm-grey mb-3" />
                  <p className="text-2xl font-display tracking-wide mb-1">{stat.value}</p>
                  <p className="text-[12px] tracking-[0.1em] uppercase text-warm-grey">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Current Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 border border-light-grey"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display tracking-[0.15em] uppercase">
                  Your Selection
                </h2>
                <Link
                  href="/selection"
                  className="text-[12px] tracking-[0.1em] uppercase text-warm-grey hover:text-primary-black transition-colors flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {totalItems > 0 ? (
                <div className="space-y-4">
                  {/* Selection Summary by Room/Category */}
                  {uniqueLabelIds.map((labelId) => {
                    const labelItems = items.filter(item => item.labelId === labelId);
                    const labelInfo = labels.find(l => l.id === labelId);
                    const labelName = getLabelName(labelId);
                    return (
                      <div
                        key={labelId || "unassigned"}
                        className="flex items-center justify-between py-4 border-b border-light-grey last:border-0"
                      >
                        <div className="flex items-center gap-4">
                          {labelInfo?.color && (
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: labelInfo.color }}
                            />
                          )}
                          <div>
                            <h3 className="font-medium text-[14px]">{labelName}</h3>
                            <p className="text-[12px] text-warm-grey">{labelItems.length} items</p>
                          </div>
                        </div>
                        <Link
                          href="/selection"
                          className="text-[12px] tracking-[0.05em] uppercase text-warm-grey hover:text-primary-black transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ClipboardList className="w-12 h-12 text-light-grey mx-auto mb-4" />
                  <p className="text-warm-grey text-[14px] mb-4">
                    You have not added any items to your selection yet.
                  </p>
                  <Link
                    href="/bathroom"
                    className="inline-block px-6 py-3 bg-primary-black text-white text-[12px] tracking-[0.1em] uppercase hover:bg-soft-black transition-colors"
                  >
                    Start Browsing
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Submit Selection CTA */}
            {totalItems > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary-black text-white p-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-display tracking-[0.15em] uppercase mb-2">
                      Ready to Submit?
                    </h2>
                    <p className="text-white/70 text-[14px]">
                      Once you are happy with your selection, submit it for review and we will prepare your quote.
                    </p>
                  </div>
                  <Link
                    href="/selection"
                    className="flex-shrink-0 px-8 py-4 bg-white text-primary-black text-[12px] tracking-[0.1em] uppercase hover:bg-off-white transition-colors"
                  >
                    Review & Submit
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Account Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 border border-light-grey"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display tracking-[0.15em] uppercase">
                  Account Details
                </h2>
                <Link
                  href="/account/settings"
                  className="text-[12px] tracking-[0.1em] uppercase text-warm-grey hover:text-primary-black transition-colors flex items-center gap-1"
                >
                  Edit
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">Full Name</p>
                  <p className="text-[14px]">{user.first_name} {user.last_name}</p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">Email Address</p>
                  <p className="text-[14px]">{user.email}</p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">Phone Number</p>
                  <p className="text-[14px]">{user.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-warm-grey mb-1">Account Type</p>
                  <p className="text-[14px] capitalize">{user.account_type}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
