import { Link } from "react-router-dom";
import allstyle from "../../allstyle.module.scss";
import style from "./mainpage.module.scss";
import hero from "./img/hero.png"

export default function MainPage() {
    return (
        <main className={style.main}>
            <div className="container">
                <section className={style.hero}>
                <div className={style.items}>
                    <div className={style.item}>
                        <h1 className={`${allstyle.title} ${style.maintitle}`}>сервис по поиску <br />публикаций <br /> о компании <br /> по его ИНН</h1>
                        <p className={style.herotext}>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                        <Link to={"/serch"} className={`${allstyle.button} ${style.herobutton}`}>Запросить данные</Link>
                    </div>
                    <div className={style.item}>
                        <img src={hero} alt="схемотичный рисунок женщины с прозрачными окошками" />
                    </div>
                </div>
                </section>
            </div>
        </main>
    )
}