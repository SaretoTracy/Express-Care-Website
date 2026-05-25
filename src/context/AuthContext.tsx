import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import { getCurrentUser, logoutUser } from "../services/authService";
import { AuthEvents } from "../utils/authEventBus";
import { clearCsrfToken } from "../services/csrf";

interface AuthContextType {
  user: any;
  loading: boolean;

  setAuthData: (
    user: any,
    accessToken: string,
    refreshToken: string
  ) => void;

  updateUserProfile: (profileData: any) => void;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [loading, setLoading] = useState(true);

  /*
  -------------------------------------------------
  Save Auth Data
  -------------------------------------------------
  */

  const setAuthData = (
    userData: any,
    accessToken: string,
    refreshToken: string
  ) => {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  /*
  -------------------------------------------------
  Update User Profile (NEW)
  -------------------------------------------------
  */

  const updateUserProfile = (profileData: any) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        ...profileData,
      },
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  /*
  -------------------------------------------------
  Logout Logic
  -------------------------------------------------
  */

  const AUTH_STORAGE_KEYS = ["user", "accessToken", "refreshToken"] as const;

  const clearAuthStorage = () => {
    AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      clearAuthStorage();
      clearCsrfToken();
      setUser(null);
      toast.success("Logged out");
      window.location.href = "/login";
    }
  };

  /*
  -------------------------------------------------
  Session Restore
  -------------------------------------------------
  */

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  /*
  -------------------------------------------------
  Global Auth Expiry Listener
  -------------------------------------------------
  */

  useEffect(() => {
    const handleExpire = async () => {
      await logout();
    };

    window.addEventListener(AuthEvents.EXPIRED, handleExpire);

    return () =>
      window.removeEventListener(AuthEvents.EXPIRED, handleExpire);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setAuthData,
        updateUserProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/*
-------------------------------------------------
Custom Hook
-------------------------------------------------
*/

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return ctx;
};