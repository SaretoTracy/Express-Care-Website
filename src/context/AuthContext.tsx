import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: any;
  setUser: (val: any) => void;
  accessToken: string | null;
  refreshToken: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // SAFE GETTER: Avoid JSON.parse errors
  const safeGet = (key: string) => {
    try {
      const value = localStorage.getItem(key);
      if (!value || value === "undefined" || value === "null") return null;
      return JSON.parse(value);
    } catch {
      return null; // fallback if JSON fails
    }
  };

  const [user, setUser] = useState<any>(safeGet("user"));
  const [accessToken] = useState<string | null>(localStorage.getItem("accessToken"));
  const [refreshToken] = useState<string | null>(localStorage.getItem("refreshToken"));

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        refreshToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
