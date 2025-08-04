import style from "./header.module.scss";
import allstyle from "../allstyle.module.scss";
import logo from "./img/logo.svg";
import user from "./img/user.svg";

export default function Header() {
    <div id="burger" className={style.burger}><span></span></div>
    return (
        <header>
            <div className="container">
                <div className={style.items}>
                    <div className={style.logo}><img src={logo} alt="логотип"/></div>
                    <div className={style.navigation}>
                    <nav className={style.menu}>
                            <div id="burger" className={style.burger}><span></span></div>
                            <ul className={style.menulist}>
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
                    <div className={style.authblock}>
                            <a href="#" className={style.authlink}>Зарегистрироваться</a>
                            <button className={`${style.authbutton} ${allstyle.button}`}>Войти</button>
                    </div>
                    </div>
                </div>
            </div>
        </header>
    )
}