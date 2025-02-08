"use client";
import SearchBox from "@/components/SearchBox";
import SearchPreview from "@/components/SearchPreview";
import TitleSection from "@/components/TitleSection";
import Image from "next/image";
import React, { useState } from "react";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);

  return (
    <main className="flex flex-col md:flex-row items-center md:items-start md:h-screen h-screen w-full bg-[#FAF5F0] justify-between pt-20 pl-8 pr-8 p-2 rounded-sm">
    <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-4">
      <TitleSection />
      <SearchBox setProperties={(newProperties: Property[]) => setProperties(newProperties)} />
      <SearchPreview properties={properties} />
    </div>

    <div className="relative md:flex-1 overflow-hidden rounded-md bg-yellow-300 hidden md:block">
      <Image
        src="https://images.pexels.com/photos/8815932/pexels-photo-8815932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Real Estate Ninjas"
        className="w-full h-full object-cover"
        width={800}
        height={600}
      />
    </div>
  </main>  
  );
}
