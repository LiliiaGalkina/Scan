import style from "./header.module.scss"
import allstyle from "../allstyle.module.scss";
import logo from "./img/logo.svg";
import user from "./img/user.svg";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const userinf = true;

    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.items}>
                    <div className={style.logo}><img src={logo} alt="логотип"/></div>
                    <div className={style.navigation}>
                        <nav className={style.menu}>
                                <div className={`${style.burger} ${isMenuOpen ? style.burgeractive : ""}`} onClick={handleMenuOpen}><span></span></div>
                                <ul className={`${style.menulist} ${isMenuOpen ? style.menuactive : ""}`}>
                                    {!userinf &&
                                        <li className={style.menuitem}><div className={style.authblockmobile}>
                                        <a href="#" className={style.authlinkmobile}>Зарегистрироваться</a>
                                        <button className={`${style.authbuttonmobile} ${allstyle.button}`}>Войти</button>
                                        </div></li>
                                    }
                                    {userinf && 
                                    <li className={style.menuitem}>
                                    <div className={style.userinfomobile}>
                                    <div className={style.usertextmobile}>
                                        <div className={style.usernamemobile}>Алексей А. </div>
                                        <button className={style.logoutmobile}>Выйти</button>
                                    </div>
                                    <div className={style.imagemobile}><img src={user} alt="фото пользователя" /></div>
                                    </div>

                                    </li>
                                    }
                                    <li className={style.menuitem}>
                                        <a href="#" className={style.menulink}>Главная</a>
                                    </li>
                                    <li className={style.menuitem}>
                                        <a href="#" className={style.menulink}>Тарифы</a>
                                    </li>
                                    <li className={style.menuitem}>
                                        <a href="#" className={style.menulink}>FAQ</a>
                                    </li>
                                </ul>
                        </nav>
                        {userinf && 
                        <>
                            <div className={style.info}>
                                    <div className={style.companies}><p>Использовано компаний </p><span>34</span></div>
                                    <div className={style.limit}><p>Лимит по компаниям </p><span>100</span></div>
                            </div>
                            <div className={style.userinfo}>
                                    <div className={style.usertext}>
                                        <div className={style.username}>Алексей А. </div>
                                        <button className={style.logout}>Выйти</button>
                                    </div>
                                    <div className={style.image}><img src={user} alt="фото пользователя" /></div>
                            </div>
                                </>
                        }
                        {!userinf && 
                            <div className={style.authblock}>
                                    <a href="#" className={style.authlink}>Зарегистрироваться</a>
                                    <button className={`${style.authbutton} ${allstyle.button}`}>Войти</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}