import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
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

const AUTH_STORAGE_KEYS = [
  "user",
  "accessToken",
  "refreshToken",
] as const;

const clearAuthStorage = () => {
  AUTH_STORAGE_KEYS.forEach((key) =>
    localStorage.removeItem(key)
  );
};

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [loading, setLoading] = useState(true);

  /*
  -------------------------------------------------
  Save Auth Data
  -------------------------------------------------
  */

  const setAuthData = useCallback(
    (
      userData: any,
      accessToken: string,
      refreshToken: string
    ) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    []
  );

  /*
  -------------------------------------------------
  Update User Profile
  -------------------------------------------------
  */

  const updateUserProfile = useCallback(
    (profileData: any) => {
      setUser((prev: any) => {
        if (!prev) return prev;
        const updatedUser = {
          ...prev,
          profile: {
            ...prev.profile,
            ...profileData,
          },
        };
        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );
        return updatedUser;
      });
    },
    []
  );

  /*
  -------------------------------------------------
  Logout Logic
  CSRF token is attached automatically by api.ts
  interceptor — no manual handling needed here.
  clearCsrfToken() wipes the cached token + cookie
  so the next login gets a fresh pair.
  -------------------------------------------------
  */

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (err) {
      // Always complete logout locally even if API fails
      // (e.g. token already expired, server unreachable)
      console.error("Logout API failed:", err);
    } finally {
      clearAuthStorage();
      clearCsrfToken();
      setUser(null);
      toast.success("Logged out");
      window.location.href = "/login";
    }
  }, []);

  /*
  -------------------------------------------------
  Session Restore
  getCurrentUser reads from localStorage — no
  network call since /auth/me doesn't exist
  -------------------------------------------------
  */

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = await getCurrentUser();
        setUser(storedUser);
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
  useCallback on logout ensures this effect has
  a stable reference and doesn't re-register
  the event listener on every render
  -------------------------------------------------
  */

  useEffect(() => {
    const handleExpire = async () => {
      await logout();
    };

    window.addEventListener(AuthEvents.EXPIRED, handleExpire);

    return () =>
      window.removeEventListener(
        AuthEvents.EXPIRED,
        handleExpire
      );
  }, [logout]);

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