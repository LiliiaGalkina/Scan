import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
	isAuth: boolean;
	setIsAuth: (value: boolean) => void;
	checkAuth: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

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
      value={{ isAuth, setIsAuth, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};