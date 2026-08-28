import api from "./api";

const createResourceService = (basePath) => ({
  getAll: async (params = {}) => {
    const response = await api.get(basePath, { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`${basePath}/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post(basePath, data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`${basePath}/${id}`, data);
    return response.data;
  },
  remove: async (id) => {
    const response = await api.delete(`${basePath}/${id}`);
    return response.data;
  },
});

const newsService = createResourceService("/admin/news");
const noticeService = createResourceService("/admin/notices");
const tenderService = createResourceService("/admin/tenders");
const projectService = createResourceService("/admin/projects");
const careerService = createResourceService("/admin/careers");
const supplierResourceService = createResourceService("/admin/supplier-resources");
const annualReportService = createResourceService("/admin/annual-reports");
const teamMemberService = createResourceService("/admin/team-members");
const managementContactService = createResourceService("/admin/management-contacts");
const contactService = createResourceService("/admin/contact-messages");
const fuelPriceService = createResourceService("/admin/fuel-prices");
const fuelStationService = createResourceService("/admin/fuel-stations");
const regionalOfficeService = createResourceService("/admin/regional-offices");
const userService = createResourceService("/admin/users");

const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard/stats");
  return response.data;
};

const getActiveFuelPrices = async () => {
  const response = await api.get("/admin/fuel-prices/active");
  return response.data;
};

const supplierSectionService = {
  getAll: async () => {
    const response = await api.get("/admin/supplier-section");
    return response.data;
  },
  create: async (data) => {
    const response = await api.post("/admin/supplier-section", data);
    return response.data;
  },
  update: async (data) => {
    const response = await api.put("/admin/supplier-section", data);
    return response.data;
  },
};

export {
  newsService,
  noticeService,
  tenderService,
  projectService,
  careerService,
  supplierResourceService,
  supplierSectionService,
  annualReportService,
  teamMemberService,
  managementContactService,
  contactService,
  fuelPriceService,
  fuelStationService,
  regionalOfficeService,
  userService,
  getDashboardStats,
  getActiveFuelPrices,
};
