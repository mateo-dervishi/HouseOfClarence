"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  User, 
  ClipboardList, 
  Settings, 
  LogOut, 
  ChevronRight,
  Home,
  Package,
  FileText,
  Heart
} from "lucide-react";

// Mock user data - replace with actual auth
const mockUser = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@email.com",
  accountType: "Homeowner",
  memberSince: "December 2024",
};

// Mock projects/selections
const mockProjects = [
  {
    id: "1",
    name: "Master Bathroom Renovation",
    items: 12,
    lastUpdated: "2 days ago",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Kitchen Upgrade",
    items: 8,
    lastUpdated: "1 week ago",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
  },
];

const menuItems = [
  { icon: ClipboardList, label: "My Selections", href: "/selection", badge: "2 Projects" },
  { icon: Heart, label: "Saved Items", href: "/account/saved", badge: "15" },
  { icon: FileText, label: "Quote Requests", href: "/account/quotes", badge: "3" },
  { icon: Package, label: "Order History", href: "/account/orders" },
  { icon: Settings, label: "Account Settings", href: "/account/settings" },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("overview");

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
                    {mockUser.firstName[0]}{mockUser.lastName[0]}
                  </span>
                </div>
                <div>
                  <h2 className="font-medium text-[15px]">
                    {mockUser.firstName} {mockUser.lastName}
                  </h2>
                  <p className="text-[12px] text-warm-grey">{mockUser.accountType}</p>
                </div>
              </div>

              {/* Menu */}
              <nav className="pt-6 space-y-1">
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
                
                <button className="flex items-center gap-3 py-3 px-2 -mx-2 w-full text-left hover:bg-off-white transition-colors rounded text-red-600 mt-4">
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
                Welcome back, {mockUser.firstName}
              </h1>
              <p className="text-warm-grey text-[14px]">
                Member since {mockUser.memberSince}
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Active Projects", value: "2", icon: Home },
                { label: "Items Selected", value: "20", icon: ClipboardList },
                { label: "Quote Requests", value: "3", icon: FileText },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 border border-light-grey"
                >
                  <stat.icon className="w-6 h-6 text-warm-grey mb-3" />
                  <p className="text-3xl font-display tracking-wide mb-1">{stat.value}</p>
                  <p className="text-[12px] tracking-[0.1em] uppercase text-warm-grey">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 border border-light-grey"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display tracking-[0.15em] uppercase">
                  Your Projects
                </h2>
                <Link
                  href="/selection"
                  className="text-[12px] tracking-[0.1em] uppercase text-warm-grey hover:text-primary-black transition-colors flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {mockProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/selection?project=${project.id}`}
                    className="group border border-light-grey hover:border-primary-black transition-colors"
                  >
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-[15px] mb-1">{project.name}</h3>
                      <div className="flex items-center justify-between text-[12px] text-warm-grey">
                        <span>{project.items} items</span>
                        <span>Updated {project.lastUpdated}</span>
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Add New Project */}
                <Link
                  href="/selection"
                  className="border border-dashed border-light-grey hover:border-primary-black transition-colors flex flex-col items-center justify-center py-12"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-light-grey flex items-center justify-center mb-3">
                    <span className="text-2xl text-warm-grey">+</span>
                  </div>
                  <span className="text-[13px] tracking-[0.1em] uppercase text-warm-grey">
                    Start New Project
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 border border-light-grey"
            >
              <h2 className="text-lg font-display tracking-[0.15em] uppercase mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[
                  { action: "Added Nero Marble Basin to Master Bathroom", time: "2 hours ago" },
                  { action: "Requested quote for Kitchen Upgrade project", time: "3 days ago" },
                  { action: "Created new project: Master Bathroom Renovation", time: "1 week ago" },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-light-grey last:border-0"
                  >
                    <p className="text-[14px]">{activity.action}</p>
                    <span className="text-[12px] text-warm-grey flex-shrink-0 ml-4">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

