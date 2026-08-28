import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Fuel, LayoutDashboard, FileText, FolderOpen, GraduationCap, BookOpen,
  Wrench, Package, Droplets, MapPin, Building2, Mail, Image, Users,
  Settings, ChevronDown, ChevronRight, X, Newspaper, ClipboardList, BadgeAlert,
} from "lucide-react";

const sidebarSections = [
  { label: "Overview", items: [{ to: "/admin", icon: LayoutDashboard, text: "Dashboard", end: true }] },
  { label: "Website", items: [
    { to: "/admin/home", icon: FileText, text: "Home" },
    { to: "/admin/about", icon: FileText, text: "About" },
    { to: "/admin/services-page", icon: Wrench, text: "Services" },
    { to: "/admin/products-page", icon: Package, text: "Products" },
  ] },
  { label: "Content", items: [
    { to: "/admin/news", icon: Newspaper, text: "News" },
    { to: "/admin/notices", icon: BadgeAlert, text: "Notices" },
    { to: "/admin/projects", icon: FolderOpen, text: "Projects" },
    { to: "/admin/tenders", icon: ClipboardList, text: "Tenders" },
    { to: "/admin/supplier-resources", icon: FileText, text: "Supplier Access" },
    { to: "/admin/careers", icon: GraduationCap, text: "Careers" },
    { to: "/admin/publications", icon: BookOpen, text: "Publications" },
    { to: "/admin/team-members", icon: Users, text: "Management Team" },
  ] },
  { label: "Operations", items: [
    { to: "/admin/fuel-prices", icon: Droplets, text: "Fuel Prices" },
    { to: "/admin/fuel-stations", icon: MapPin, text: "Fuel Stations" },
    { to: "/admin/regional-offices", icon: Building2, text: "Regional Offices" },
  ] },
  { label: "Communication", items: [{ to: "/admin/messages", icon: Mail, text: "Contact Messages" }] },
  { label: "System", items: [
    { to: "/admin/media", icon: Image, text: "Media Library" },
    { to: "/admin/users", icon: Users, text: "Users" },
    { to: "/admin/settings", icon: Settings, text: "Site Settings" },
  ] },
];

const SidebarSection = ({ section }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="mb-1">
      <button onClick={() => setIsOpen((open) => !open)} className="admin-sidebar-section-toggle w-full flex items-center justify-between px-5 py-2.5 text-[11px] font-extrabold tracking-[0.1em] uppercase transition-colors">
        {section.label}
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>
      {isOpen && (
        <div className="space-y-0.5">
          {section.items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `admin-sidebar-link flex items-center gap-3 px-4 py-3 mx-2 rounded-lg border text-sm font-semibold transition-all duration-150 ${isActive ? "admin-sidebar-link-active shadow-md shadow-black/20" : ""}`}>
              <item.icon className="w-[19px] h-[19px] shrink-0" strokeWidth={2.25} />
              <span>{item.text}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminSidebar = ({ isOpen, onClose }) => (
  <>
    {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
    <aside className={`admin-sidebar fixed top-0 left-0 h-full w-[260px] bg-[#062e3b] z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="h-[72px] flex items-center justify-between px-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center"><Fuel className="w-[18px] h-[18px] text-red-600" /></div>
          <div><h1 className="text-white font-extrabold text-sm tracking-wider font-['Manrope'] leading-tight">CEYPETCO</h1><p className="admin-sidebar-brand-subtitle text-[9px] tracking-[0.12em] uppercase font-bold font-['Manrope']">Administration</p></div>
        </div>
        <button onClick={onClose} className="admin-sidebar-close lg:hidden p-1"><X className="w-5 h-5" /></button>
      </div>
      <nav className="flex-1 overflow-y-auto py-3">{sidebarSections.map((section) => <SidebarSection key={section.label} section={section} />)}</nav>
      <div className="admin-sidebar-footer p-4 border-t border-white/10"><p className="text-[10px] text-center">CEYPETCO CMS v1.0</p></div>
    </aside>
  </>
);

export default AdminSidebar;
