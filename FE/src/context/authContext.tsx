import { createContext, useEffect, useState } from "react";
import type { AuthContextType, DecodedType } from "../types";
import { useRefershToken } from "../lib/queries";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const authContext = createContext<null | AuthContextType>(null);
export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<null | string>(() => localStorage.getItem("access_token"));
  const [refershToken, setRefershToken] = useState<null | string>(() => localStorage.getItem("refersh_token"));
  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync: updateToken } = useRefershToken();
  const [query, setQuery] = useState("")
  useEffect(() => {
    handleUpdateToken();
  }, [])
  async function handleUpdateToken() {
    const access_token = localStorage.getItem("access_token");
    if (!accessToken) return;
    const isExp = jwtDecode<DecodedType>(access_token as string).exp * 1000 < Date.now();
    if (isExp) {
      try {
        const res = await updateToken();
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refersh_token", res.data.refersh_token);
        setAccessToken(res.data.access_token);
        setRefershToken(res.data.refersh_token);
      } catch (error: any) {
        toast.error(error?.response.data.message);
      }
    }
  }
  return (
    <authContext.Provider value={{
      accessToken,
      setAccessToken,
      refershToken,
      setRefershToken,
      isLoading,
      setIsLoading,
      query, 
      setQuery
    }
    }>
      {children}
    </authContext.Provider>
  )
}


