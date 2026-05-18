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
  const token = localStorage.getItem("access_token");

  // No token at all → definitely not allowed
  if (!token) {
    toast.error("Please login first");
    return redirect("/");
  }

  // 1. Try React Query cache first (populated after first fetch)
  // 2. Fall back to localStorage (set at login time)
  // 3. If neither source has data yet, allow through — the Dashboard
  //    page will re-check once useGetUserInfo resolves
  const cached = queryClient.getQueryData<{ data: { data: { role: string } } }>(["userInfo"]);
  const role   = cached?.data?.data?.role ?? localStorage.getItem("role");

  const pathname = new URL(request.url).pathname;

  if (pathname.includes("dashboard") && role !== null && role !== "admin") {
    toast.error("Admin access required");
    return redirect("/");
  }

  return null;
}