import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { useGetUserInfo } from "../../lib/queries";
import Loader from "./Loader";
import type { UserInfoType } from "../../types";

export default function AdminNav() {
  const { data, isLoading } = useGetUserInfo();
  if (isLoading) {
    return <Loader />;
  }
  const user: UserInfoType = data?.data.user;
  return (
    <nav className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      <Link to="/">
        <img className="h-9" src={Logo} alt="dashboard" />
      </Link>
      <div className="flex items-center gap-5 text-gray-500">
        <p>Hi! {user?.name}</p>
      </div>
    </nav>
  )
}
