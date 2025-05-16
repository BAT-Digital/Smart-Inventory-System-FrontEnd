import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import profile from "../assets/icons/profile.png";
import { PasswordChange } from "../components/profileForms";
import Cookies from "js-cookie";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UserTable } from "../components/Table";
import { useUsers } from "../hooks/useUsers";
import plus from "../assets/icons/+.png";
import { useState } from "react";
import { AddUserModal } from "../components/AddUserModal";

export const Profile = () => {
  const navigation = useNavigate();
  const userIdCookie = Cookies.get("user_id");
  const username = Cookies.get("username");
  const userRole = Cookies.get("role");

  if (!userIdCookie) {
    message.error("Session expired. Please log in again.");
    navigation("/");
    return;
  }

  const { users, loading, refetch: ReFetchUsers } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("user_id");
    Cookies.remove("username");
    Cookies.remove("role");
    navigation("/");
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <Navbar />
        <div className="mt-10 flex items-center justify-center">
          <div className="w-full max-w-6xl px-4">
            <div className="flex">
              <div
                className="w-[25%] mr-4  flex justify-center"
                style={{
                  borderRight: "2px solid black",
                }}
              >
                <div className="pt-10 justify-items-center">
                  <img src={profile} alt="profile" />
                  <div className="" style={{ fontSize: 26 }}>
                    {username}
                  </div>
                  <Button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "#335C67",
                      color: "#FFFFFF",
                    }}
                    size="large"
                    className="w-full mt-2"
                  >
                    Logout
                  </Button>
                </div>
              </div>
              <div className="w-[75%] ml-1 h-full">
                {userRole === "ROLE_ADMIN" ? (
                  <>
                    <div style={{ fontWeight: "bold", fontSize: 26 }}>
                      ADMIN PANEL
                    </div>
                    <div className="flex">
                      <div className="w-[30%] mr-10">
                        <PasswordChange />
                      </div>
                      <div className="w-[70%]">
                        <Button
                          onClick={() => setIsModalOpen(true)}
                          style={{
                            backgroundColor: "#FFF3B0",
                            color: "#1E1E1E",
                            border: "2px solid black",
                          }}
                          size="large"
                          className="w-full"
                        >
                          <img src={plus} alt="" className="h-5 w-auto" />
                        </Button>
                        <UserTable users={users} loading={loading} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontWeight: "bold", fontSize: 26 }}>
                      USER PANEL
                    </div>
                    <div className="flex">
                      <div>
                        <PasswordChange />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddUserModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={ReFetchUsers}
      />
    </>
  );
};
