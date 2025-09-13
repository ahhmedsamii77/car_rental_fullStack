import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

export default function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname.split("/").includes("dashboard");
  return (
    <div className="w-full overflow-hidden">
      {!isDashboard && <Navbar />}
      <main>
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  )
}
