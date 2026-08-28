const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const newsRoutes = require("./routes/newsRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const tenderRoutes = require("./routes/tenderRoutes");
const projectRoutes = require("./routes/projectRoutes");
const careerRoutes = require("./routes/careerRoutes");
const contactRoutes = require("./routes/contactRoutes");
const fuelPriceRoutes = require("./routes/fuelPriceRoutes");
const fuelStationRoutes = require("./routes/fuelStationRoutes");
const regionalOfficeRoutes = require("./routes/regionalOfficeRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const supplierResourceRoutes = require("./routes/supplierResourceRoutes");
const supplierSectionRoutes = require("./routes/supplierSectionRoutes");
const annualReportRoutes = require("./routes/annualReportRoutes");
const managementTeamMemberRoutes = require("./routes/managementTeamMemberRoutes");
const managementContactRoutes = require("./routes/managementContactRoutes");
const userRoutes = require("./routes/userRoutes");const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

const corsOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((o) => o.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || corsOrigins.length === 0 || corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "../uploads"), {
    setHeaders: (res) => {
      res.setHeader(
        "Access-Control-Allow-Origin",
        corsOrigins[0] || "*"
      );
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
app.use(morgan("dev"));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CEYPETCO backend is running successfully",
  });
});

app.use("/api/auth/login", loginLimiter);
app.use("/api", apiLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin/news", newsRoutes);
app.use("/api/admin/notices", noticeRoutes);
app.use("/api/admin/tenders", tenderRoutes);
app.use("/api/admin/projects", projectRoutes);
app.use("/api/admin/supplier-resources", supplierResourceRoutes);
app.use("/api/admin/supplier-section", supplierSectionRoutes);
app.use("/api/admin/annual-reports", annualReportRoutes);
app.use("/api/admin/team-members", managementTeamMemberRoutes);
app.use("/api/admin/management-contacts", managementContactRoutes);
app.use("/api/admin/careers", careerRoutes);
app.use("/api/admin/contact-messages", contactRoutes);
app.use("/api/admin/fuel-prices", fuelPriceRoutes);
app.use("/api/admin/fuel-stations", fuelStationRoutes);
app.use("/api/admin/regional-offices", regionalOfficeRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;
