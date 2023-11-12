import { Navbar } from "@/components/Navbar/Navbar";


import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
    
      <div className="mt-12 md:m-12 md:ml-64">
        <div className="ml-2 p-5">{children}</div>
         </div>
    </div>
  );
}
