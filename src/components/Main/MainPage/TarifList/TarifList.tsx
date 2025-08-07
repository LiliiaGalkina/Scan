import TarifCard from "../TarifCard/TarifCard";
import style from "./tariflist.module.scss";
import tariflamp from "../img/tariflamp.svg";
import tarifgoal from "../img/tarifgoal.svg";
import tariflaptop from "../img/tariflaptop.svg"


const TarifList = () => {
    return (
        <div className={style.cards}>
            <TarifCard title="Beginner" text="Для небольшого исследования" image={tariflamp} price="799" oldprice="1200" buttonname="Перейти в личный кабинет" tariffitems={["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"]} colorheader="#FFB64F" colorbutton="#D2D2D2" colortitle="#000000" dopinfo="или 150 ₽/мес. при рассрочке на 24 мес." beige="Текущий тариф" colorborder="#FFB64F" colorbuttonname="#000000"/>
             <TarifCard title="Pro" text="Для HR и фрилансеров" image={tarifgoal} price="1299" oldprice="2600" buttonname="Подробнее" tariffitems={["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"]} colorheader="#7CE3E1" colorbutton="#5970FF" colortitle="#000000" dopinfo="или 279 ₽/мес. при рассрочке на 24 мес." colorbuttonname="#FFFFFF"/>
              <TarifCard title="Business" text="Для корпоративных клиентов" image={tariflaptop} price="2379" oldprice="3700" buttonname="Подробнее" tariffitems={["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"]} colorheader="#000000" colorbutton="#5970FF" colortitle="#FFFFFF" colorbuttonname="#FFFFFF"/>
        </div>
    )
}

export default TarifList;