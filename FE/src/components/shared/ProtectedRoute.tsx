import { redirect } from "react-router-dom";
import toast from "react-hot-toast";

/** Requires ANY logged-in user */
export function ProtectedRoute() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    toast.error("Please login first");
    return redirect("/");
  }
  return null;
}

/** Requires admin role */
export function AdminRoute({ request }: { request: Request }) {
  const token = localStorage.getItem("access_token");
  const role  = localStorage.getItem("role");
  const pathname = new URL(request.url).pathname;

  if (!token || (pathname.includes("dashboard") && role !== "admin")) {
    toast.error("Admin access required");
    return redirect("/");
  }
  return null;
}