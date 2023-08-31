
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TenantSidebar from "./components/sidebar";
import { useRouter } from "next/navigation";

const TenantLayout =  ({ children }: { children: React.ReactNode }) => {
  // const session =  await getServerSession(authOptions);
  // if(!session) return router.push('/signin');
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-blue-900">
        <TenantSidebar />
      </div>
      <main className="md:pl-72 pb-10">
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default TenantLayout;
