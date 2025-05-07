// src/components/Navbar.tsx
import { Menu } from "antd";
import { Link } from "react-router-dom";
import miniLogo from "../assets/miniLogo.png";
import bell from "../assets/icons/bell.png";
import settings from "../assets/icons/settings.png";
import profile from "../assets/icons/profile.png";

export const Navbar = () => {
  return (
    <div className="bg-[#335C67] text-white shadow-md">
      <div className="max-w-full px-15 mx-auto py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div>
            <Link to="/dashboard">
              <img src={miniLogo} alt="" className="h-7 w-auto px-2" />
            </Link>
          </div>
          <Link to="/dashboard">
            <div className="text-2xl font-bold mr-10">Stocku</div>
          </Link>
          <Menu
            mode="horizontal"
            className="bg-[#335C67] border-none"
            selectable={false}
          >
            <Menu.Item
              key="1"
              className="bg-[#335C67] hover:bg-[#335C67] active:bg-[#335C67]"
              style={{ backgroundColor: "#335C67" }}
            >
              <Link to="/dashboard" style={{ color: "white" }} className="mx-3">
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              className="bg-[#335C67] hover:bg-[#335C67] active:bg-[#335C67]"
              style={{ backgroundColor: "#335C67" }}
            >
              <Link
                to="/accounting"
                style={{ color: "white" }}
                className="mx-3"
              >
                Accounting
              </Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              className="bg-[#335C67] hover:bg-[#335C67] active:bg-[#335C67]"
              style={{ backgroundColor: "#335C67" }}
            >
              <Link to="/arrival" style={{ color: "white" }} className="mx-3">
                Arrival
              </Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              className="bg-[#335C67] hover:bg-[#335C67] active:bg-[#335C67]"
              style={{ backgroundColor: "#335C67" }}
            >
              <Link to="/sales" style={{ color: "white" }} className="mx-3">
                Sales
              </Link>
            </Menu.Item>
            <Menu.Item
              key="5"
              className="bg-[#335C67] hover:bg-[#335C67] active:bg-[#335C67]"
              style={{ backgroundColor: "#335C67" }}
            >
              <Link to="/reports" style={{ color: "white" }} className="mx-3">
                Reports
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className="flex items-center">
          <Link to="/settings">
            <img src={settings} alt="" className="h-7 w-auto px-2" />
          </Link>
          <Link to="/notifications">
            <img src={bell} alt="" className="h-6 w-auto px-2" />
          </Link>
          <Link to="/profile">
            <img src={profile} alt="" className="h-7 w-auto px-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};
