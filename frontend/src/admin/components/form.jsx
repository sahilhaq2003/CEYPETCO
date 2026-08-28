const inputClass =
  "w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-sm text-[#092f3b] placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all";

const textareaClass =
  "w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-[#092f3b] placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-y min-h-[120px]";

const labelClass =
  "block text-sm font-semibold text-[#092f3b] mb-1.5 font-['Manrope']";

const selectClass =
  "w-full h-11 px-3 rounded-lg border border-slate-300 bg-white text-sm text-[#092f3b] outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all cursor-pointer";

const Field = ({ label, required, children, hint }) => (
  <div>
    <label className={labelClass}>
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
    {hint && <p className="mt-1 text-xs text-[#66767d]">{hint}</p>}
  </div>
);

export { inputClass, textareaClass, labelClass, selectClass, Field };
