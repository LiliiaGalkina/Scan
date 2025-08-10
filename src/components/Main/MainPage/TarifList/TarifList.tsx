import TarifCard from "../TarifCard/TarifCard";
import style from "./tariflist.module.scss";
import tariflamp from "../img/tariflamp.svg";
import tarifgoal from "../img/tarifgoal.svg";
import tariflaptop from "../img/tariflaptop.svg";

interface ITarifsProps {
  isAuth: boolean;
  tarif: string;
}

const TarifList: React.FC<ITarifsProps> = ({ isAuth, tarif }) => {
  return (
    <div className={style.cards}>
      <TarifCard
        title="Beginner"
        text="Для небольшого исследования"
        image={tariflamp}
        price="799"
        oldprice="1200"
        buttonname={
          isAuth && tarif === "beginner"
            ? "Перейти в личный кабинет"
            : "Подробнее"
        }
        tariffitems={[
          "Безлимитная история запросов",
          "Безопасная сделка",
          "Поддержка 24/7",
        ]}
        colorheader={isAuth && tarif === "beginner" ? "#FFB64F" : "#7CE3E1"}
        colorbutton={isAuth && tarif === "beginner" ? "#D2D2D2" : "#5970FF"}
        colortitle="#000000"
        dopinfo="или 150 ₽/мес. при рассрочке на 24 мес."
        beige={isAuth && tarif === "beginner" ? "Текущий тариф" : ""}
        colorborder={isAuth && tarif === "beginner" ? "#FFB64F" : "#FFFFFF"}
        colorbuttonname={isAuth && tarif === "beginner" ? "#000000" : "#FFFFFF"}
      />
      <TarifCard
        title="Pro"
        text="Для HR и фрилансеров"
        image={tarifgoal}
        price="1299"
        oldprice="2600"
        buttonname={
          isAuth && tarif === "pro" ? "Перейти в личный кабинет" : "Подробнее"
        }
        tariffitems={[
          "Все пункты тарифа Beginner",
          "Экспорт истории",
          "Рекомендации по приоритетам",
        ]}
        colorheader={isAuth && tarif === "pro" ? "#FFB64F" : "#7CE3E1"}
        colorbutton={isAuth && tarif === "pro" ? "#D2D2D2" : "#5970FF"}
        colortitle="#000000"
        dopinfo="или 279 ₽/мес. при рассрочке на 24 мес."
        beige={isAuth && tarif === "pro" ? "Текущий тариф" : ""}
        colorborder={isAuth && tarif === "pro" ? "#FFB64F" : "#FFFFFF"}
        colorbuttonname={isAuth && tarif === "pro" ? "#000000" : "#FFFFFF"}
      />
      <TarifCard
        title="Business"
        text="Для корпоративных клиентов"
        image={tariflaptop}
        price="2379"
        oldprice="3700"
        buttonname={
          isAuth && tarif === "business"
            ? "Перейти в личный кабинет"
            : "Подробнее"
        }
        tariffitems={[
          "Все пункты тарифа Pro",
          "Безлимитное количество запросов",
          "Приоритетная поддержка",
        ]}
        colorheader={isAuth && tarif === "business" ? "#FFB64F" : "#000000"}
        colorbutton={isAuth && tarif === "business" ? "#D2D2D2" : "#5970FF"}
        colortitle={isAuth && tarif === "business" ? "000000" : "#FFFFFF"}
        beige={isAuth && tarif === "business" ? "Текущий тариф" : ""}
        colorborder={isAuth && tarif === "business" ? "#FFB64F" : "#FFFFFF"}
        colorbuttonname={isAuth && tarif === "business" ? "#000000" : "#FFFFFF"}
      />
    </div>
  );
};

export default TarifList;
