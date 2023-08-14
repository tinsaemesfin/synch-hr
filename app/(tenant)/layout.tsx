import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { LayoutDashboardIcon } from "lucide-react";
import Sidebar from "./components/sidebar";



const TenantLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions); 
  return ( 
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-blue-900">
        <Sidebar />
      </div>
      <main className="md:pl-72 pb-10">
             
        {children}
        
      </main>
    </div>
   );
};

export default TenantLayout;
