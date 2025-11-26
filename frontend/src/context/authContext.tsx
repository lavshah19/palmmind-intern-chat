import { createContext, useEffect, useState, type ReactNode } from "react";
import {
  initialSignInFormData,
  initialSignUpFormData,
} from "../config/authConfig";
import type { AuthContextType, AuthUser, CheckAuthResponse, MyFormData,  } from "../types/auth";
import {
  checkAuthService,
  loginUserService,
  registerUserService,
} from "../service/api/auth";

export const AuthContext = createContext<AuthContextType | null>(null);
import { toast } from "sonner";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [signInFormData, setSignInFormData] = useState<MyFormData>(
    initialSignInFormData
  );

  const [signUpFormData, setSignUpFormData] = useState<MyFormData>(
    initialSignUpFormData
  );

  const [authUser, setAuthUser] = useState<AuthUser>({
    authenticate: false,
    user: null,
  });
  console.log(signUpFormData)

  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("signin");

  const handelRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await registerUserService(signUpFormData);
      if (data.success) {
        setSignUpFormData(initialSignUpFormData);
        setActiveTab("signin");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  console.log(signInFormData)

  const handelLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await loginUserService(signInFormData);
      if (data.success) {
        sessionStorage.setItem("token", JSON.stringify(data.token));
        setAuthUser({ authenticate: true, user: data.user });
        setSignInFormData(initialSignInFormData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
        setAuthUser({ authenticate: false, user: null });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const checkAuth = async () => {
    try {
      const data:CheckAuthResponse = await checkAuthService();
      if (data.success) {
        setAuthUser({ authenticate: true, user: data?.user });
      } else {
        setAuthUser({ authenticate: false, user: null });
      }
    } catch (error) {
      setAuthUser({ authenticate: false, user: null });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logOut = () => {
    setAuthUser({ authenticate: false, user: null });
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        authUser,
        setAuthUser,
        handelLogin,
        handelRegister,
        isLoading,
        setActiveTab,
        activeTab,
        checkAuth,
        logOut,
      }}
    >
      {isLoading ? null : children} 
      {/* // i will add isLoading ui later reminder */}
    </AuthContext.Provider>
  );
}
