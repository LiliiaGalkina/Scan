import style from "./header.module.scss";
import allstyle from "../allstyle.module.scss";
import logo from "./img/logo.svg";

export default function Header() {
    <div id="burger" className={style.burger}><span></span></div>
    return (
        <header>
            <div className="container">
                <div className={style.items}>
                    <div className={style.logo}><img src={logo} alt="логотип"/></div>
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
                    <div className={style.authblock}>
                            <a href="#" className={style.authlink}>Зарегистрироваться</a>
                            <button className={`${style.authbutton} ${allstyle.button}`}>Войти</button>
                    </div>
                </div>
            </div>
        </header>
    )
}