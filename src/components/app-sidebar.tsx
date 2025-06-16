import * as React from "react";
// import { Settings2 } from "lucide-react";
// import logo from "../../public/logo.svg";
import logo from "../../public/logo.svg";
import { NavMain } from "@/components/nav-main";

import { BiCategory } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineSubscriptions } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiColorFill } from "react-icons/bi";

// import { NavProjects } from "@/components/nav-projects";

import { LuFileSliders } from "react-icons/lu";
import { PiNoteDuotone } from "react-icons/pi";
import { TbEdit, TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { RiExchange2Fill } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: BiCategory,
      isActive: true,
    },
    {
      title: "Subscriber",
      url: "/subscriber",
      icon: IoIosPeople,
    },

    {
      icon: BiColorFill,
      title: "Projects",
      url: "/projects",
    },

    {
      title: "Subscriptions",
      url: "/subscriptions",
      icon: MdOutlineSubscriptions,
    },

    {
      title: "FAQ",
      url: "/faq",
      icon: AiOutlineQuestionCircle,
    },

    {
      title: "Settings",
      url: "#",
      icon: CiSettings,
      items: [
        { title: "Profile", url: "/profile", icon: CgProfile },
        { title: "Edit Profile", url: "/edit-profile", icon: TbEdit },
        {
          title: "Change Password",
          url: "/change-password",
          icon: RiExchange2Fill,
        },
        { title: "About Us", url: "/about", icon: LuFileSliders },
        {
          title: "Privacy & Policy",
          url: "/privacy-policy",
          icon: PiNoteDuotone,
        },
        // { title: "Terms & Conditions", url: "terms-condition", icon: TbNotes },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("resetToken");
    navigate("/login");
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-center justify-center">
        <img className="w-24" src={logo} alt="pic" />
      </SidebarHeader>
      <SidebarContent>
        <div className="mt-6">
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </div>
      </SidebarContent>

      <SidebarRail />
      <SidebarFooter className="mb-10 cursor-pointer">
        <div
          onClick={handleLogOut}
          className="flex items-center ml-3 text-red-400"
        >
          <button className=" cursor-pointer flex justify-center items-center gap-3">
            <span>
              <TbLogout2 size={22} />
            </span>
            <span> Logout</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
