import { Construction } from "lucide-react";
import { useLocation } from "react-router-dom";

const Placeholder = () => {
  const location = useLocation();
  const moduleName = location.pathname
    .split("/")
    .pop()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Construction className="w-8 h-8 text-amber-500" />
        </div>
        <h3 className="text-lg font-bold text-[#092f3b] font-['Manrope'] mb-2">
          {moduleName}
        </h3>
        <p className="text-sm text-[#66767d] max-w-md">
          This module will be implemented in the next development phase.
        </p>
      </div>
    </div>
  );
};

export default Placeholder;
