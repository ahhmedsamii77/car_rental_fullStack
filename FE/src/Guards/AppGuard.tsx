import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { JSX } from "react";
import { authContext } from "../context/authContext";
import { useGetUserInfo } from "../lib/queries";

/**
 * Requires the user to be logged in.
 * If the user is on /dashboard and is NOT admin → redirect to home.
 */
export default function AppGuard({ children }: { children: JSX.Element }) {
  const { accessToken, refershToken } = useContext(authContext)!;
  const { pathname } = useLocation();

  const isAuth = !!(accessToken || refershToken);

  // Not logged in → send to home (login modal lives there)
  if (!isAuth) return <Navigate replace to="/" />;

  // Check admin access for dashboard routes
  const { data: userInfo } = useGetUserInfo();
  const role = userInfo?.data?.data?.role ?? localStorage.getItem("role");

  if (pathname.startsWith("/dashboard") && role !== null && role !== "admin") {
    return <Navigate replace to="/" />;
  }

  return children;
}
