import ContentCrud from "../../components/ContentCrud";
import StatusBadge from "../../components/StatusBadge";
import { fuelStationService } from "../../../services/contentService";

const columns = [
  { key: "dealerNo", label: "Dealer No." },
  { key: "dealerName", label: "Dealer", className: "max-w-sm" },
  { key: "district", label: "District", className: "hidden sm:table-cell" },
  { key: "address", label: "Address", className: "hidden lg:table-cell max-w-sm" },
  { key: "status", label: "Status", render: (item) => <StatusBadge status={item.status} /> },
];

const fields = [
  { key: "dealerNo", label: "Dealer Number", required: true },
  { key: "dealerName", label: "Dealer Name", required: true },
  { key: "district", label: "District", required: true },
  { key: "status", label: "Status", type: "select", options: ["active", "inactive"], default: "active" },
  { key: "address", label: "Address", type: "textarea", required: true, fullWidth: true },
];

const FuelStationManagement = () => (
  <ContentCrud
    title="Fuel Stations"
    description="Create, update and remove fuel stations stored in the database."
    service={fuelStationService}
    columns={columns}
    fields={fields}
    emptyTitle="No fuel stations found"
    emptyHint="Seed the bundled stations or add a station to get started"
    searchPlaceholder="Search dealer, address or district..."
  />
);

export default FuelStationManagement;
