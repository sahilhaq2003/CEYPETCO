const StatCard = ({ icon: Icon, title, value, change, changeType, color = "red" }) => {
  const colorMap = {
    red: {
      bg: "bg-red-50",
      icon: "text-red-600",
      border: "border-red-100",
    },
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      border: "border-blue-100",
    },
    green: {
      bg: "bg-emerald-50",
      icon: "text-emerald-600",
      border: "border-emerald-100",
    },
    amber: {
      bg: "bg-amber-50",
      icon: "text-amber-600",
      border: "border-amber-100",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      border: "border-purple-100",
    },
    cyan: {
      bg: "bg-cyan-50",
      icon: "text-cyan-600",
      border: "border-cyan-100",
    },
  };

  const colors = colorMap[color] || colorMap.red;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:shadow-slate-200/50 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors.bg} border ${colors.border} group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        {change !== undefined && (
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${
              changeType === "up"
                ? "text-emerald-700 bg-emerald-50"
                : changeType === "down"
                  ? "text-red-700 bg-red-50"
                  : "text-slate-500 bg-slate-50"
            }`}
          >
            {changeType === "up" ? "+" : ""}
            {change}
          </span>
        )}
      </div>
      <p className="text-[11px] font-bold tracking-[0.06em] uppercase text-[#66767d] mb-1 font-['Manrope']">
        {title}
      </p>
      <p className="text-2xl font-extrabold text-[#092f3b] font-['Manrope']">
        {value}
      </p>
    </div>
  );
};

export default StatCard;
