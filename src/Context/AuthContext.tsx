import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
	isAuth: boolean;
	setIsAuth: (value: boolean) => void;
	checkAuth: () => void;
	userName: string;
	setUserName: (value: string) => void;
	tarif: string;
	setTarif: (value: string) => void;
  companyCount: number;
  setCompanyCount: (value: number) => void;
  companyLimit: number;
  setCompanyLimit: (value:number) => void;
  isGetting: boolean;
  setIsGetting: (value:boolean) => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [userName, setUserName] = useState("");
	const [tarif, setTarif] = useState("")
  const [companyCount, setCompanyCount] = useState(0);
  const [companyLimit, setCompanyLimit] = useState(0);
	const [isGetting, setIsGetting] = useState(false);



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
      value={{ isAuth, setIsAuth, checkAuth, userName, setUserName, tarif, setTarif, companyCount, setCompanyCount, companyLimit, setCompanyLimit, isGetting, setIsGetting }}
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