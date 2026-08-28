import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getDashboardStats } from "../../../services/contentService";
import StatCard from "../../components/StatCard";
import {
  Newspaper,
  ClipboardList,
  GraduationCap,
  FolderOpen,
  Mail,
  Droplets,
  MapPin,
  Building2,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Overview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const contentData = [
    { name: "News", count: stats?.news || 0 },
    { name: "Tenders", count: stats?.tenders || 0 },
    { name: "Careers", count: stats?.careers || 0 },
    { name: "Notices", count: stats?.notices || 0 },
  ];

  const distributionData = [
    { name: "News", value: stats?.news || 0, color: "#dc2626" },
    { name: "Notices", value: stats?.notices || 0, color: "#062e3b" },
    { name: "Careers", value: stats?.careers || 0, color: "#0891b2" },
    { name: "Tenders", value: stats?.tenders || 0, color: "#d97706" },
    { name: "Messages", value: stats?.messages || 0, color: "#7c3aed" },
    { name: "Publications", value: stats?.publications || 0, color: "#059669" },
  ].filter((d) => d.value > 0);
  if (distributionData.length === 0) {
    distributionData.push({ name: "Empty", value: 1, color: "#e2e8f0" });
  }

  const operationModules = [
    { title: "Fuel Prices", value: stats?.fuelPrices || 0, description: "Manage prices and effective dates", to: "/admin/fuel-prices", icon: Droplets },
    { title: "Fuel Stations", value: stats?.fuelStations || 0, description: "Manage dealers, addresses and districts", to: "/admin/fuel-stations", icon: MapPin },
    { title: "Regional Offices", value: stats?.regionalOffices || 0, description: "Manage regional contact information", to: "/admin/regional-offices", icon: Building2 },
  ];

  return (
    <div>
      {/* Welcome banner */}
      <div className="bg-[#062e3b] rounded-2xl p-6 sm:p-8 mb-6">
        <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/60 mb-2 font-['Manrope']">
          WELCOME BACK
        </p>
        <h1 className="text-white font-extrabold text-2xl sm:text-3xl font-['Manrope'] mb-2">
          {user?.name || "Administrator"}
        </h1>
        <p className="text-white/60 text-sm max-w-lg">
          Here is your website management summary. Monitor content, track
          submissions and manage the CEYPETCO public website from one
          dashboard.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={Newspaper}
          title="News Articles"
          value={loading ? "—" : stats?.news || 0}
          color="red"
        />
        <StatCard
          icon={ClipboardList}
          title="Tenders"
          value={loading ? "—" : stats?.tenders || 0}
          color="blue"
        />
        <StatCard
          icon={GraduationCap}
          title="Vacancies"
          value={loading ? "—" : stats?.careers || 0}
          color="green"
        />
        <StatCard
          icon={FolderOpen}
          title="Notices"
          value={loading ? "—" : stats?.notices || 0}
          color="purple"
        />
        <StatCard
          icon={Mail}
          title="Unread Messages"
          value={loading ? "—" : stats?.unreadMessages || 0}
          color="amber"
        />
        <StatCard
          icon={Droplets}
          title="Fuel Products"
          value={loading ? "—" : stats?.fuelPrices || 0}
          color="cyan"
        />
      </div>

      <section className="mb-8">
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#66767d] mb-1 font-['Manrope']">Operations CRUD</p>
            <h2 className="text-lg font-extrabold text-[#092f3b] font-['Manrope']">Manage operational data</h2>
          </div>
          <span className="hidden sm:block text-xs text-[#66767d]">Create · Read · Update · Delete</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {operationModules.map((operation) => (
            <Link key={operation.to} to={operation.to} className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#062e3b] text-white flex items-center justify-center">
                  <operation.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-extrabold text-[#092f3b] font-['Manrope']">{loading ? "—" : operation.value}</span>
              </div>
              <h3 className="mt-4 text-sm font-bold text-[#092f3b]">{operation.title}</h3>
              <p className="mt-1 text-xs text-[#66767d]">{operation.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-red-600 group-hover:gap-2.5 transition-all">
                Open manager <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Content Analytics */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="mb-6">
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#66767d] mb-1 font-['Manrope']">
              CONTENT ANALYTICS
            </p>
            <h3 className="text-[#092f3b] font-bold text-base font-['Manrope']">
              Content by Category
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={contentData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#66767d" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#66767d" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="count" fill="#dc2626" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Content Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="mb-6">
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#66767d] mb-1 font-['Manrope']">
              CONTENT DISTRIBUTION
            </p>
            <h3 className="text-[#092f3b] font-bold text-base font-['Manrope']">
              Website Content Overview
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  fontSize: "13px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#66767d] mb-2 font-['Manrope']">
            SYSTEM STATUS
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-[#092f3b]">
              All Systems Operational
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#66767d] mb-2 font-['Manrope']">
            DATABASE
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-[#092f3b]">
              MongoDB Connected
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#66767d] mb-2 font-['Manrope']">
            LAST LOGIN
          </p>
          <p className="text-sm font-semibold text-[#092f3b]">
            {user?.lastLogin
              ? new Date(user.lastLogin).toLocaleString()
              : "First login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
