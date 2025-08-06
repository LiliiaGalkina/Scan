import TarifCard from "../TarifCard/TarifCard";
import style from "./tariflist.module.scss";
import tariflamp from "../img/tariflamp.svg";
import tarifgoal from "../img/tarifgoal.svg";
import tariflaptop from "../img/tariflaptop.svg"



 interface TarifCardProps  {
    title: string;
    text: string;
    image: string;
    price: string;
    oldprice: string;
    buttonname: string;
    tariffitems: string[];
    colortitle:string;
    colorbutton:string;
    dopinfo?: string;
    beige?:string;
}

const TarifList: React.FC<TarifCardProps> = () => {
    return (
        <div className={style.cards}>
            <TarifCard title="Beginner" text="Для небольшого исследования" image={tariflamp} price="799" oldprice="1200" buttonname="Перейти в личный кабинет" tariffitems={["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"]} colortitle={style.orangetitle} colorbutton={style.greybutton} dopinfo="или 150 ₽/мес. при рассрочке на 24 мес." beige="Текущий тариф"/>
             <TarifCard title="Pro" text="Для HR и фрилансеров" image={tarifgoal} price="1299" oldprice="2600" buttonname="Подробнее" tariffitems={["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"]} colortitle={style.bluetitle} colorbutton={style.bluebutton} dopinfo="или 279 ₽/мес. при рассрочке на 24 мес."/>
              <TarifCard title="Business" text="Для корпоративных клиентов" image={tariflaptop} price="2379" oldprice="3700" buttonname="Подробнее" tariffitems={["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"]} colortitle={style.blacktitle} colorbutton={style.bluebutton}/>
        </div>
    )
}

export default TarifList;