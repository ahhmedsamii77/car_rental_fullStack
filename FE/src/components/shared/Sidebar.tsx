import { NavLink, useLocation } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDashboard } from "react-icons/md";
import { FaCarSide } from "react-icons/fa6";
import { CiViewList } from "react-icons/ci";
import type { SidebarLinksType, UserInfoType } from "../../types";
import { useGetUserInfo, useUpdateProfileImage } from "../../lib/queries";
import Loader from "./Loader";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";
const sidebarLinks: SidebarLinksType[] = [
  { name: "Dashboard", path: "/dashboard", icon: MdOutlineDashboard },
  { name: "Add Car", path: "addCar", icon: MdOutlineAddBox },
  { name: "Manage Cars", path: "manageCars", icon: FaCarSide },
  { name: "Manage Bookings", path: "manageBookings", icon: CiViewList },
];
export default function Sidebar() {
  const { data, isLoading } = useGetUserInfo();
  const user: UserInfoType = data?.data.user;
  const { mutateAsync: updateProfileImage } = useUpdateProfileImage();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  if (isLoading) {
    return <Loader />;
  }
  async function handleUpdateProfileImage(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setProfileImage(e.target.files?.[0]!);
      await updateProfileImage(e.target.files?.[0]!);
      toast.success("Profile image updated successfully");
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  }
  return (
    <aside className="md:w-64 w-16 border-r  text-base min-h-screen  border-gray-300 pt-4 flex flex-col transition-all duration-300">
      <div className="flex items-center justify-center mb-6 flex-col">
        <label htmlFor="profile" className="relative group ">
          <img className="md:h-15 md:w-15 rounded-full w-10 h-10 cursor-pointer" src={profileImage ? URL.createObjectURL(profileImage) : user?.profileImage?.secure_url? user?.profileImage?.secure_url : "p"} alt={user.name} />
          <div className="absolute  top-0 right-0 bottom-0 hidden group-hover:flex transition duration-400  left-0 bg-black/35 cursor-pointer rounded-full  items-center justify-center">
            <FiEdit className="w-4 h-4 text-white" />
          </div>
        </label>
        <input onChange={handleUpdateProfileImage} id="profile" className="hidden" type="file" accept="image/*" />
      </div>
      {sidebarLinks.map((item, index) => (
        <NavLink to={item.path} key={index}
          className={`flex items-center py-3 px-4 gap-3 side-link  
            ${path === item.path || path === undefined && index === 0 ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary" : "hover:bg-gray-100/90 border-white text-gray-700"}
            `}
        >
          <item.icon className={`w-5 h-5 opacity-50 ${path === item.path || path === undefined && index === 0 ? "opacity-100" : "opacity-50"}`} />
          <p className="md:block hidden text-center">{item?.name}</p>
        </NavLink>
      ))}
    </aside>
  )
}
