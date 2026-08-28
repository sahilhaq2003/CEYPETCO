import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../auth/pages/Login";
import AdminLayout from "../admin/layouts/AdminLayout";
import Overview from "../admin/pages/Dashboard/Overview";
import Placeholder from "../admin/pages/Placeholder/Placeholder";
import PublicSite from "../App.jsx";
import NewsManagement from "../admin/pages/News/NewsManagement";
import NoticeManagement from "../admin/pages/Notices/NoticeManagement";
import TenderManagement from "../admin/pages/Tenders/TenderManagement";
import ProjectManagement from "../admin/pages/Projects/ProjectManagement";
import SupplierResources from "../admin/pages/SupplierResources/SupplierResources";
import CareerManagement from "../admin/pages/Careers/CareerManagement";
import AnnualReportsManagement from "../admin/pages/AnnualReports/AnnualReportsManagement";
import TeamMembersManagement from "../admin/pages/TeamMembers/TeamMembersManagement";
import ManagementContactsManagement from "../admin/pages/ManagementContacts/ManagementContactsManagement";
import FuelPriceManagement from "../admin/pages/FuelPrices/FuelPriceManagement";
import FuelStationManagement from "../admin/pages/FuelStations/FuelStationManagement";
import RegionalOfficeManagement from "../admin/pages/RegionalOffices/RegionalOfficeManagement";
import ContactMessages from "../admin/pages/Messages/ContactMessages";
import UserManagement from "../admin/pages/Users/UserManagement";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="news" element={<NewsManagement />} />
        <Route path="notices" element={<NoticeManagement />} />
        <Route path="projects" element={<ProjectManagement />} />
        <Route path="tenders" element={<TenderManagement />} />
        <Route path="supplier-resources" element={<SupplierResources />} />
        <Route path="careers" element={<CareerManagement />} />
        <Route path="publications" element={<AnnualReportsManagement />} />
        <Route path="team-members" element={<TeamMembersManagement />} />
        <Route path="about" element={<ManagementContactsManagement />} />
        <Route path="services-page" element={<Placeholder />} />
        <Route path="products-page" element={<Placeholder />} />
        <Route path="fuel-prices" element={<FuelPriceManagement />} />
        <Route path="fuel-stations" element={<FuelStationManagement />} />
        <Route path="regional-offices" element={<RegionalOfficeManagement />} />
        <Route path="messages" element={<ContactMessages />} />
        <Route path="media" element={<Placeholder />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="settings" element={<Placeholder />} />
        <Route path="home" element={<Placeholder />} />
      </Route>

      <Route path="*" element={<PublicSite />} />
    </Routes>
  );
};

export default AppRoutes;
