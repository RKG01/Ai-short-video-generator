import React from "react";
import { Header} from "./_components/Header";
import { Sidenav } from "./_components/Sidenav";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className="hidden md:block h-screen bg-white fixed mt-16 w-64 shadow-lg">
        <Sidenav />
      </div>
      <div>
      <Header />
      <div className="md:ml-64 p-10 ">

        {children}
      </div>
        </div>
    </div>
  );
}
