import React from "react";
import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import Notifications from "../components/Notifications";

export const NotificationsPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="w-full max-w-6xl px-4 mt-8">
          <Notifications />
        </div>
      </div>
    </div>
  );
};
