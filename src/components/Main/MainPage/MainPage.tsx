import {useNavigate } from "react-router-dom";
import style from "./mainpage.module.scss";
import hero from "./img/hero.png";
import whyusimage from "./img/whywe.svg";
import SliderCustom from "./Slider/Slider";
import TarifList from "./TarifList/TarifList";
import allstyle from "../allstyle.module.scss";

interface IMainProps {
  isAuth: boolean;
}

const MainPage: React.FC<IMainProps> = (isAuth) => {
  const navigate = useNavigate();

  const handGoSerchClick = (): void => {
    if (isAuth) {
      navigate("/search");
    } else {
      navigate("/auth");
	  }
	  console.log(isAuth);
  };

  return (
    <main className={style.main}>
      <div className="container">
        <section className={style.hero}>
          <div className={style.items}>
            <div className={style.item}>
              <h1 className={`${allstyle.title} ${style.maintitle}`}>
                сервис по поиску <br />
                публикаций <br /> о компании <br /> по его ИНН
              </h1>
              <p className={style.herotext}>
                Комплексный анализ публикаций, получение данных в формате PDF на
                электронную почту.
              </p>
              {isAuth && (
                <button
                  onClick={handGoSerchClick}
                  className={`${allstyle.button} ${style.herobutton}`}
                >
                  Запросить данные
                </button>
              )}
            </div>
            <div className={style.item}>
              <img
                src={hero}
                alt="схемотичный рисунок женщины с прозрачными окошками"
              />
            </div>
          </div>
        </section>
        <section className={style.whywe}>
          <h2 className={`${allstyle.title} ${style.subtitle}`}>
            Почему именно мы
          </h2>
          <SliderCustom />
          <div className={style.whyweimage}>
            <img src={whyusimage} alt="почему мы картиника" />
          </div>
        </section>
        <section className={style.tarif}>
          <div className="container">
            <h2 className={`${allstyle.title} ${style.subtitle}`}>
              наши тарифы
            </h2>
            <TarifList />
          </div>
        </section>
      </div>
    </main>
  );
};

export default MainPage;
