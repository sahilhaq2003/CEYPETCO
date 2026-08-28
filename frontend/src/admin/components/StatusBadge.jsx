const variantMap = {
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  new: "bg-blue-50 text-blue-700 border-blue-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
  archived: "bg-slate-100 text-slate-600 border-slate-200",
  awarded: "bg-purple-50 text-purple-700 border-purple-200",
  replied: "bg-cyan-50 text-cyan-700 border-cyan-200",
  read: "bg-indigo-50 text-indigo-700 border-indigo-200",
  inactive: "bg-slate-100 text-slate-500 border-slate-200",
  super_admin: "bg-red-50 text-red-700 border-red-200",
  admin: "bg-blue-50 text-blue-700 border-blue-200",
  editor: "bg-amber-50 text-amber-700 border-amber-200",
};

const StatusBadge = ({ status }) => {
  const cls =
    variantMap[status] || "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${cls}`}
    >
      {String(status || "unknown").replace(/_/g, " ")}
    </span>
  );
};

export default StatusBadge;
