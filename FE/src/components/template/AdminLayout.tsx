import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import AdminNav from "../shared/AdminNav";

export default function AdminLayout() {
  return (
    <div>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <main className="py-10 px-5 md:px-10 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
