import { redirect } from "react-router-dom";
import toast from "react-hot-toast";

export function ProtectedRoute({ request }: { request: Request }) {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  const pathname = new URL(request.url).pathname;

  if (!token || (pathname.includes("dashboard") && role !== "admin")) {
    toast.error("You are not authorized please login first");
    return redirect("/");
  }

  return null;
}