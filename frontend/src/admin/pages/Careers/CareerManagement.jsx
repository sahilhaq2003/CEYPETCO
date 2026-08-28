import ContentCrud from "../../components/ContentCrud";
import StatusBadge from "../../components/StatusBadge";
import { careerService } from "../../../services/contentService";

const columns = [
  { key: "title", label: "Position", className: "max-w-xs" },
  { key: "department", label: "Department", className: "hidden lg:table-cell" },
  { key: "location", label: "Location", className: "hidden md:table-cell" },
  {
    key: "applicationDeadline",
    label: "Deadline",
    className: "hidden sm:table-cell",
    render: (r) =>
      r.applicationDeadline ? (
        <span className="text-xs text-[#66767d]">
          {new Date(r.applicationDeadline).toLocaleDateString()}
        </span>
      ) : (
        "—"
      ),
  },
  {
    key: "status",
    label: "Status",
    render: (r) => <StatusBadge status={r.status} />,
  },
];

const fields = [
  { key: "title", label: "Position Title", required: true },
  { key: "department", label: "Department" },
  { key: "location", label: "Location" },
  { key: "type", label: "Employment Type", type: "select", options: ["Full-time", "Part-time", "Contract", "Internship"] },
  { key: "salary", label: "Salary", placeholder: "e.g. LKR 75,000" },
  { key: "status", label: "Status", type: "select", options: ["draft", "open", "closed"], default: "draft" },
  { key: "publishedDate", label: "Published Date", type: "date" },
  { key: "applicationDeadline", label: "Application Deadline", type: "date" },
  { key: "description", label: "Job Description", type: "textarea", fullWidth: true },
  { key: "requirements", label: "Requirements", type: "textarea", fullWidth: true },
  { key: "responsibilities", label: "Responsibilities", type: "textarea", fullWidth: true },
];

const CareerManagement = () => (
  <ContentCrud
    title="Careers Management"
    description="Create and manage job vacancies advertised by CEYPETCO."
    service={careerService}
    columns={columns}
    fields={fields}
    emptyTitle="No vacancies found"
    emptyHint="Create your first vacancy to get started"
    searchPlaceholder="Search vacancies..."
  />
);

export default CareerManagement;
