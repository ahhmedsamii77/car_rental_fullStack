import { createContext, useEffect, useState } from "react";
import type { AuthContextType, DecodedType } from "../types";
import { useRefershToken } from "../lib/queries";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import Loader from "../components/shared/Loader";

export const authContext = createContext<null | AuthContextType>(null);

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken]   = useState<null | string>(() => localStorage.getItem("access_token"));
  const [refershToken, setRefershToken] = useState<null | string>(() => localStorage.getItem("refersh_token"));
  const [isLoading, setIsLoading]       = useState(true);
  const [query, setQuery]               = useState("");
  const { mutateAsync: updateToken }    = useRefershToken();

  useEffect(() => {
    handleUpdateToken();
  }, []);

  async function handleUpdateToken() {
    const access_token = localStorage.getItem("access_token");

    // No token at all → not logged in, proceed immediately
    if (!access_token) {
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedType>(access_token);
      const isExp = decoded.exp * 1000 < Date.now();

      if (isExp) {
        const res = await updateToken();
        const newAccess  = res.data.access_token;
        const newRefresh = res.data.refersh_token;
        localStorage.setItem("access_token", newAccess);
        localStorage.setItem("refersh_token", newRefresh);
        setAccessToken(newAccess);
        setRefershToken(newRefresh);
      } else {
        // Token still valid — keep it in state
        setAccessToken(access_token);
      }
    } catch (error: unknown) {
      // Token invalid / refresh failed → clear everything
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message ?? "Session expired, please login again");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refersh_token");
      localStorage.removeItem("role");
      setAccessToken(null);
      setRefershToken(null);
    } finally {
      setIsLoading(false);
    }
  }

  // Block render until we know the auth state
  if (isLoading) return <Loader />;

  return (
    <authContext.Provider value={{
      accessToken,
      setAccessToken,
      refershToken,
      setRefershToken,
      isLoading,
      setIsLoading,
      query,
      setQuery,
    }}>
      {children}
    </authContext.Provider>
  );
}
