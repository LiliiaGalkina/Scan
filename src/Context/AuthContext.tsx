import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
	isAuth: boolean;
	setIsAuth: (value: boolean) => void;
	checkAuth: () => void;
	userName: string;
	setUserName: (value: string) => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [userName, setUserName] = useState("");

   const checkAuth = () => {
     const accessToken = localStorage.getItem("accessToken");
     const tokenExpire = localStorage.getItem("tokenExpire");
     const now = new Date();

     if (!accessToken || !tokenExpire || new Date(tokenExpire) <= now) {
       console.log("Token expired or not found.");
       setIsAuth(false);
       localStorage.removeItem("accessToken");
       localStorage.removeItem("tokenExpire");
     } else {
       setIsAuth(true);
     }
   };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, checkAuth, userName, setUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used in AuthProvider");
  }

  return context;
};