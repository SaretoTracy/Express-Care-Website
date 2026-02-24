import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  FileCheck,
  Briefcase,
  CreditCard,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "../../UI/Card";

/* ----------------------------- mock stats ----------------------------- */
const stats = [
  {
    label: "Total Caregivers",
    value: "1,247",
    change: "+12% this month",
    icon: Users,
    color: "bg-[#557A95]",
    lightBg: "bg-[#557A95]/10",
    textColor: "text-[#557A95]",
  },
  {
    label: "Total Providers",
    value: "89",
    change: "+5% this month",
    icon: Building2,
    color: "bg-[#557A95]",
    lightBg: "bg-[#557A95]/10",
    textColor: "text-[#557A95]",
  },
  {
    label: "Pending Verifications",
    value: "23",
    change: "Require attention",
    icon: FileCheck,
    color: "bg-[#FF9923]",
    lightBg: "bg-[#FF9923]/10",
    textColor: "text-[#FF9923]",
  },
  {
    label: "Active Job Postings",
    value: "156",
    change: "+8% this week",
    icon: Briefcase,
    color: "bg-[#557A95]",
    lightBg: "bg-[#557A95]/10",
    textColor: "text-[#557A95]",
  },
];

/* ----------------------------- mock recent activity -------------------- */
const recentActivity = [
  { id: 1, type: "caregiver", message: "Jane D. completed profile verification", time: "2 hours ago", status: "success" },
  { id: 2, type: "provider", message: "Serenity Gardens posted a new job", time: "4 hours ago", status: "success" },
  { id: 3, type: "verification", message: "3 documents pending review", time: "5 hours ago", status: "pending" },
  { id: 4, type: "subscription", message: "Evergreen Care Center renewed subscription", time: "Yesterday", status: "success" },
  { id: 5, type: "caregiver", message: "Mike R. applied to Memory Care Specialist", time: "Yesterday", status: "success" },
];

/* ----------------------------- animation ------------------------------ */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function AdminLanding() {
  return (
    <div className="min-h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Overview of your platform and pending actions
        </p>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <Card className="overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${stat.lightBg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-3">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick actions
              </h2>
              <nav className="space-y-1">
                {[
                  { to: "/admin/verifications", label: "Review verifications", icon: FileCheck },
                  { to: "/admin/caregivers", label: "Manage caregivers", icon: Users },
                  { to: "/admin/providers", label: "Manage providers", icon: Building2 },
                  { to: "/admin/jobposting", label: "Job postings", icon: Briefcase },
                  { to: "/admin/subscription", label: "Subscriptions", icon: CreditCard },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-[#557A95]/10 hover:text-[#557A95] transition-colors group"
                  >
                    <link.icon className="w-5 h-5 text-gray-400 group-hover:text-[#557A95]" />
                    <span className="flex-1 font-medium">{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent activity
                </h2>
                <Link
                  to="/admin/reports"
                  className="text-sm font-medium text-[#557A95] hover:underline"
                >
                  View all
                </Link>
              </div>
              <ul className="space-y-0 divide-y divide-gray-100">
                {recentActivity.map((activity) => (
                  <li
                    key={activity.id}
                    className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="mt-0.5">
                      {activity.status === "pending" ? (
                        <AlertCircle className="w-5 h-5 text-[#FF9923]" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-medium">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        {activity.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminLanding;
