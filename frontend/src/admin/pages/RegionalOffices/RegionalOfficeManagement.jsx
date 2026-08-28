import ContentCrud from "../../components/ContentCrud";
import StatusBadge from "../../components/StatusBadge";
import { regionalOfficeService } from "../../../services/contentService";

const columns = [
  { key: "name", label: "Office", className: "max-w-xs" },
  { key: "region", label: "Region", className: "hidden md:table-cell" },
  { key: "district", label: "District", className: "hidden sm:table-cell" },
  {
    key: "phone",
    label: "Phone",
    className: "hidden lg:table-cell",
    render: (r) => <span className="text-xs text-[#66767d]">{r.phone || "—"}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (r) => <StatusBadge status={r.status} />,
  },
];

const fields = [
  { key: "name", label: "Office Name", required: true },
  { key: "region", label: "Region" },
  { key: "district", label: "District" },
  { key: "manager", label: "Manager" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "openingHours", label: "Opening Hours" },
  { key: "status", label: "Status", type: "select", options: ["active", "inactive"], default: "active" },
  { key: "address", label: "Address", type: "textarea" },
];

const RegionalOfficeManagement = () => (
  <ContentCrud
    title="Regional Offices"
    description="Manage the regional office contact information shown on the website."
    service={regionalOfficeService}
    columns={columns}
    fields={fields}
    emptyTitle="No regional offices found"
    emptyHint="Add regional offices to get started"
    searchPlaceholder="Search offices..."
  />
);

export default RegionalOfficeManagement;
