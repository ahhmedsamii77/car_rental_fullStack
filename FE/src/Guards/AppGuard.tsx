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

  // Not logged in → send to home
  if (!isAuth) return <Navigate replace to="/" />;

  // Fetch role from API only — no localStorage fallback
  const { data: userInfo, isLoading } = useGetUserInfo();
  const role = userInfo?.data?.data?.role;

  // While the API call is in-flight, don't redirect (avoids false block on refresh)
  if (pathname.startsWith("/dashboard") && !isLoading && role !== "admin") {
    return <Navigate replace to="/" />;
  }

  return children;
}
