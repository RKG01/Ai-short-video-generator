'use client';

import React, { use } from "react";
import { Header} from "./_components/Header";
import { Sidenav } from "./_components/Sidenav";
import { VideoDataContext } from "../_context/VideoDataContext";
import { VideoData } from "@/configs/schema";

export default function DashboardLayout({ children }) {
  const [videoData, setVideoData] = useState([]);
  return (
    <VideoDataContext.Provider value={{videoData, setVideoData}}>
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
    </VideoDataContext.Provider>
  );
}
