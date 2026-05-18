import { redirect } from "react-router-dom";
import toast from "react-hot-toast";
import { queryClient } from "../../lib/queryClient";

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
  const token    = localStorage.getItem("access_token");
  const userInfo = queryClient.getQueryData<{ data: { data: { role: string } } }>(["userInfo"]);
  const role     = userInfo?.data?.data?.role;
  const pathname = new URL(request.url).pathname;

  if (!token || (pathname.includes("dashboard") && role !== "admin")) {
    toast.error("Admin access required");
    return redirect("/");
  }
  return null;
}