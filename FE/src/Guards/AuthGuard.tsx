import { useContext } from "react";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { authContext } from "../context/authContext";

/**
 * Wraps auth pages (login, signup, etc.).
 * If the user is already logged in → redirect to home.
 */
export default function AuthGuard({ children }: { children: JSX.Element }) {
  const { accessToken, refershToken } = useContext(authContext)!;
  const isAuth = !!(accessToken || refershToken);

  if (isAuth) return <Navigate replace to="/" />;
  return children;
}
