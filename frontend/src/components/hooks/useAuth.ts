import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import type { AuthContextType } from "@/types/auth";

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("AuthContext used outside AuthProvider");
  }
  return ctx;
}
