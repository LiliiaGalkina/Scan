import style from "./footer.module.scss";
import logo from "./img/logofooter.svg";

export default function Footer(){
    return (
        <footer className={style.footer}>
            <div className="container">
                <div className={style.items}>
                    <div className={style.item}>
                        <img src={logo} alt="логотип" />
                    </div>
                    <div className={style.item}>
                        <div className={style.info}>
                            <span>г. Москва, Цветной б-р, 40</span>
                            <span>+7 495 771 21 11</span>
                            <span>info@skan.ru</span>
                        </div>
                        <div className={style.copyright}>&copy; Copyright. 2022</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}