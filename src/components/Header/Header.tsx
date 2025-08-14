import style from "./header.module.scss";
import allstyle from "../Main/allstyle.module.scss";
import logo from "./img/logo.png";
import logomain from "./img/logo.svg";
import user from "./img/user.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

interface IHeaderProps {
  isAuth: boolean;
  userName: string;
}

/*interface CompanyInfo {
  CompanyCount: number;
  companyLimit: number;
}*/

interface Response {
  eventFiltersInfo: {
    usedCompanyCount: number;
    companyLimit: number;
  };
}

const Header: React.FC<IHeaderProps> = ({ isAuth, userName }) => {
  const { setIsAuth } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoImg, setLogoImg] = useState(logomain);
  const [isGetting, setIsGetting] = useState(false);
  const [companyCount, setCompanyCount] = useState(0);
  const [companyLimit, setCompanyLimit] = useState(0);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
    if (logoImg === logomain) {
      setLogoImg(logo);
    } else {
      setLogoImg(logomain);
    }
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth");
    handleMenuOpen();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const tokenExpire = localStorage.getItem("tokenExpire");
      const now = new Date();

      if (!tokenExpire || new Date(tokenExpire) <= now) {
        setIsAuth(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpire");
      }
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    setIsAuth(false);
    handleMenuOpen();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpire");
    navigate("/");
  };

  const getCompanyInfo = async () => {
    setIsGetting(true);
    const url = "https://gateway.scan-interfax.ru/api/v1/account/info";
    try {
      const response = await fetch(url, 
        {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Response = await response.json();
      setCompanyCount(data.eventFiltersInfo.usedCompanyCount);
      setCompanyLimit(data.eventFiltersInfo.companyLimit);
    } catch (error) {
      console.error("Ошибка при получении информации о компаниях:", error);
    } finally {
      setIsGetting(false);
    }
  };

  useEffect(() => {
    getCompanyInfo();
    const intervalId = setInterval(getCompanyInfo, 50000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.items}>
          <div className={style.logo}>
            <img src={logoImg} alt="логотип" />
          </div>
          <div className={style.navigation}>
            <nav className={style.menu}>
              <div
                className={`${style.burger} ${
                  isMenuOpen ? style.burgeractive : ""
                }`}
                onClick={handleMenuOpen}
              >
                <span></span>
              </div>
              <ul
                className={`${style.menulist} ${
                  isMenuOpen ? style.menuactive : ""
                }`}
              >
                <li className={style.menuitem}>
                  <a href="/" className={style.menulink}>
                    Главная
                  </a>
                </li>
                <li className={style.menuitem}>
                  <a href="#" className={style.menulink}>
                    Тарифы
                  </a>
                </li>
                <li className={style.menuitem}>
                  <a href="#" className={style.menulink}>
                    FAQ
                  </a>
                </li>
                {!isAuth && (
                  <li className={style.menuitem}>
                    <div className={style.authblockmobile}>
                      <a href="/auth" className={style.authlinkmobile}>
                        Зарегистрироваться
                      </a>
                      <button
                        className={`${style.authbuttonmobile} ${allstyle.button}`}
                        onClick={handleLoginClick}
                      >
                        Войти
                      </button>
                    </div>
                  </li>
                )}
                {isAuth && (
                  <li className={style.menuitem}>
                    <div className={style.userinfomobile}>
                      <div className={style.usertextmobile}>
                        <div className={style.usernamemobile}>{userName}</div>
                        <button
                          className={style.logoutmobile}
                          onClick={handleLogout}
                        >
                          Выйти
                        </button>
                      </div>
                      <div className={style.imagemobile}>
                        <img src={user} alt="фото пользователя" />
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </nav>
            {isAuth && (
              <>
                <div className={style.info}>
                  <div className={style.companies}>
                    <p>Использовано компаний </p>
                    <span>{companyCount}</span>
                  </div>
                  <div className={style.limit}>
                    <p>Лимит по компаниям </p>
                    <span>{companyLimit}</span>
                  </div>
                </div>
                <div className={style.userinfo}>
                  <div className={style.usertext}>
                    <div className={style.username}>{userName} </div>
                    <button className={style.logout} onClick={handleLogout}>
                      Выйти
                    </button>
                  </div>
                  <div className={style.image}>
                    <img src={user} alt="фото пользователя" />
                  </div>
                </div>
              </>
            )}
            {!isAuth && (
              <div className={style.authblock}>
                <a href="#" className={style.authlink}>
                  Зарегистрироваться
                </a>
                <button
                  className={`${style.authbutton} ${allstyle.button}`}
                  onClick={handleLoginClick}
                >
                  Войти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
