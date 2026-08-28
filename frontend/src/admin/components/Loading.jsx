const Loading = ({ label = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
    <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-red-600 animate-spin" />
    <p className="text-sm text-[#66767d]" style={{ color: "#66767d" }}>
      {label}
    </p>
  </div>
);

export default Loading;
