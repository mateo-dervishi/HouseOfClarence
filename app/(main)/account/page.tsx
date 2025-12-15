"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardList, 
  Settings, 
  LogOut, 
  ChevronRight,
  Home,
  FileText,
  User as UserIcon,
  History,
  Plus,
  Check,
  Calendar,
  Package,
  FolderOpen,
  RefreshCw
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

interface Submission {
  id: string;
  total_items: number;
  total_rooms: number;
  filename: string;
  submitted_at: string;
  status: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [showNewSelectionModal, setShowNewSelectionModal] = useState(false);
  const { items, labels, clearSelection } = useSelectionStore();

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

  // Fetch submission history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/selection/history");
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data.submissions || []);
        }
      } catch (error) {
        console.error("Error fetching submission history:", error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
  }, []);

  const handleStartNewSelection = () => {
    clearSelection();
    setShowNewSelectionModal(false);
    router.push("/bathroom"); // Navigate to start browsing
  };

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

  const formatSubmissionDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { 
      day: "numeric",
      month: "short", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted": return "bg-blue-100 text-blue-700";
      case "reviewed": return "bg-yellow-100 text-yellow-700";
      case "confirmed": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
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
    { icon: History, label: "Submission History", href: "#history", badge: submissions.length > 0 ? `${submissions.length}` : undefined },
  { icon: Settings, label: "Account Settings", href: "/account/settings" },
];

  return (
    <main className="min-h-screen bg-off-white pt-32 pb-16">
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-display tracking-[0.15em] uppercase mb-2">
                      Ready to Submit?
                    </h2>
                    <p className="text-white/70 text-[14px]">
                      Once you are happy with your selection, submit it for review and we will prepare your quote.
                    </p>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <button
                      onClick={() => setShowNewSelectionModal(true)}
                      className="px-6 py-3 border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase hover:bg-white/10 transition-colors"
                    >
                      Start Fresh
                    </button>
                    <Link
                      href="/selection"
                      className="px-6 py-3 bg-white text-primary-black text-[12px] tracking-[0.1em] uppercase hover:bg-off-white transition-colors"
                    >
                      Review & Submit
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submission History */}
            <motion.div
              id="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-white p-8 border border-light-grey"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display tracking-[0.15em] uppercase flex items-center gap-3">
                  <History className="w-5 h-5 text-warm-grey" />
                  Submission History
                </h2>
                {submissions.length > 0 && totalItems === 0 && (
                  <button
                    onClick={() => router.push("/bathroom")}
                    className="text-[12px] tracking-[0.1em] uppercase text-primary-black hover:opacity-70 transition-opacity flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    New Selection
                  </button>
                )}
              </div>

              {loadingHistory ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-6 h-6 border-2 border-primary-black/20 border-t-primary-black rounded-full animate-spin" />
                </div>
              ) : submissions.length > 0 ? (
                <div className="space-y-4">
                  {submissions.map((submission, index) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-off-white/50 border border-light-grey hover:border-warm-grey transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary-black/5 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary-black" />
                        </div>
                        <div>
                          <p className="text-[14px] font-medium flex items-center gap-2">
                            Selection #{submissions.length - index}
                            <span className={`px-2 py-0.5 text-[10px] tracking-wide uppercase ${getStatusColor(submission.status)}`}>
                              {submission.status}
                            </span>
                          </p>
                          <div className="flex items-center gap-4 mt-1 text-[12px] text-warm-grey">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatSubmissionDate(submission.submitted_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {submission.total_items} items
                            </span>
                            <span className="flex items-center gap-1">
                              <FolderOpen className="w-3 h-3" />
                              {submission.total_rooms} rooms
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[11px] text-warm-grey">
                        {submission.filename}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <History className="w-12 h-12 text-light-grey mx-auto mb-4" />
                  <p className="text-warm-grey text-[14px] mb-2">
                    No submissions yet
                  </p>
                  <p className="text-warm-grey/70 text-[13px]">
                    Your submission history will appear here once you submit your first selection.
                  </p>
                </div>
              )}
            </motion.div>

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

      {/* Start New Selection Confirmation Modal */}
      <AnimatePresence>
        {showNewSelectionModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowNewSelectionModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white p-8 max-w-md w-full shadow-xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <RefreshCw className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-display tracking-[0.1em] uppercase mb-4">
                    Start New Selection?
                  </h3>
                  <p className="text-warm-grey text-[14px] mb-8">
                    This will clear your current selection of {totalItems} items. 
                    Your previous submissions are saved in your history.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowNewSelectionModal(false)}
                      className="flex-1 py-3 border border-light-grey text-[12px] tracking-[0.1em] uppercase hover:bg-off-white transition-colors"
                    >
                      Keep Current
                    </button>
                    <button
                      onClick={handleStartNewSelection}
                      className="flex-1 py-3 bg-primary-black text-white text-[12px] tracking-[0.1em] uppercase hover:bg-charcoal transition-colors"
                    >
                      Start Fresh
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
