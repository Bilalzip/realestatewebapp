import React from "react";
import { useRouter } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";

interface SearchPreviewProps {
  properties: any[];
}

const SearchPreview: React.FC<SearchPreviewProps> = ({ properties }) => {
  const router = useRouter();

  if (properties.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Quick Preview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {properties.map((property) => (
          <PropertyCard key={property._id} {...property} />
        ))}
      </div>
      <button onClick={() => router.push(`/search?q=${properties[0].name}`)} className="mt-4 text-blue-600 hover:underline">
        View all results →
      </button>
    </div>
  );
};

export default SearchPreview;
