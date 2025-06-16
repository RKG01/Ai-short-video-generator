"use client"
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function Sidenav() {
  const menuoption = [
    {
      id: 1,
      name: "Dashboard",
      icon: PanelsTopLeft,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Create New",
      icon: FileVideo,
      path: "/dashboard/create-new",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: ShieldPlus,
      path: "/upgrade",
    },
    {
      id: 4,
      name: "Account",
      icon: CircleUser,
      path: "/account",
    },
  ];

  const userpath = usePathname();

  console.log(userpath);
  return (
    <div className="w-64 shadow-md h-screen p-5 bg-white text-black">
      <div className="grid gap-2 ">
        {menuoption.map((item, index) => (
        <Link href={item.path} key = {item.id}>
          <div className={`flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-700 rounded-md hover:text-white  ${userpath === item.path ? "bg-gray-700 text-white" : "text-black"}`}>
            <item.icon />
            <h2>{item.name}</h2>
          </div>
        </Link>
        ))}
        
      </div>
    </div>
  );
}
