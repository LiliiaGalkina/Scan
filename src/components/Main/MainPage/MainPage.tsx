import { Link } from "react-router-dom";
import allstyle from "../../allstyle.module.scss";
import style from "./mainpage.module.scss";
import hero from "./img/hero.png";
import watch from "./img/watch.svg";
import loupe from "./img/loupe.svg";
import lock from "./img/lock.svg";
import { useRef } from "react";
import arrowleft from "./img/arrowleft.svg";
import arrowright from "./img/arrowright.svg";
import whyusimage from "./img/whywe.svg"

interface SliderItem {
    icon: string;
    text: string;
}

export default function MainPage() {
const sliderRef = useRef<HTMLDivElement | null>(null);

const leftMove = () : void => {
    if(sliderRef.current) {
        sliderRef.current.scrollLeft -= window.innerWidth / 3
    }
}

const rightMove = () : void => {
    if(sliderRef.current) {
        sliderRef.current.scrollLeft += window.innerWidth / 3;
    }
}

const slides:SliderItem[] = [
    {
        icon: watch,
        text: "Высокая и оперативная скорость обработки заявки"
    },
     {
        icon: loupe,
        text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
    },
     {
        icon: lock,
        text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
    },
     {
        icon: watch,
        text: "Высокая и оперативная скорость обработки заявки"
    },
     {
        icon: loupe,
        text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
    },
     {
        icon: lock,
        text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
    },
]

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
                <section className={style.whywe}>
                    <h2 className={`${allstyle.title} ${style.subtitle}`}>Почему именно мы</h2>
                    <div className={style.slider}>
                        <div className={style.arrowleft} onClick={leftMove}>
                            <img src={arrowleft} alt="стрелка влево" role="button" />
                        </div>
                        <div className={style.slideritems} ref={sliderRef}>
                            {slides.map((item, index) => 
                                <div key={index} className={style.slideritem}>
                                    <img src={item.icon} className={style.slidericon} alt="иконка"/>
                                    <div className={style.slidertext}>{item.text}</div>
                                </div>
                            )}
                        </div>
                        <div className={style.arrowright} onClick={rightMove}>
                            <img src={arrowright} alt="стрелка вправо" role="button" />
                        </div>
                    </div>
                    <div className={style.whyweimage}>
                        <img src={whyusimage} alt="почему мы картиника" />
                    </div>
                </section>
            </div>
        </main>
    )
}