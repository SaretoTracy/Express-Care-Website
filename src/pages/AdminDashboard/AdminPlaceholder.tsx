import React from "react";
import { Construction } from "lucide-react";

interface AdminPlaceholderProps {
  title: string;
  description?: string;
}

export default function AdminPlaceholder({ title, description }: AdminPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="p-4 rounded-2xl bg-[#557A95]/10 mb-4">
        <Construction className="w-12 h-12 text-[#557A95]" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="text-gray-600 mt-2 max-w-md">
        {description ?? "This section is under construction. Check back later."}
      </p>
    </div>
  );
}
