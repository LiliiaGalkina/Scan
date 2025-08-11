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
  const tarifs = {
    first: "beginner",
    second: "pro",
    third: "business",
  };

  return (
    <div className={style.cards}>
      <TarifCard
        title="Beginner"
        text="Для небольшого исследования"
        image={tariflamp}
        price="799"
        oldprice="1200"
        buttonname={
          isAuth && tarif === tarifs.first
            ? "Перейти в личный кабинет"
            : "Подробнее"
        }
        tariffitems={[
          "Безлимитная история запросов",
          "Безопасная сделка",
          "Поддержка 24/7",
        ]}
        colorheader={isAuth && tarif === tarifs.first ? "#FFB64F" : "#7CE3E1"}
        colorbutton={isAuth && tarif === tarifs.first ? "#D2D2D2" : "#5970FF"}
        colortitle="#000000"
        dopinfo="или 150 ₽/мес. при рассрочке на 24 мес."
        beige={isAuth && tarif === tarifs.first ? "Текущий тариф" : ""}
        colorborder={isAuth && tarif === tarifs.first ? "#FFB64F" : "#FFFFFF"}
        colorbuttonname={
          isAuth && tarif === tarifs.first ? "#000000" : "#FFFFFF"
        }
      />
      <TarifCard
        title="Pro"
        text="Для HR и фрилансеров"
        image={tarifgoal}
        price="1299"
        oldprice="2600"
        buttonname={
          isAuth && tarif === tarifs.second
            ? "Перейти в личный кабинет"
            : "Подробнее"
        }
        tariffitems={[
          "Все пункты тарифа Beginner",
          "Экспорт истории",
          "Рекомендации по приоритетам",
        ]}
        colorheader={isAuth && tarif === tarifs.second ? "#FFB64F" : "#7CE3E1"}
        colorbutton={isAuth && tarif === tarifs.second ? "#D2D2D2" : "#5970FF"}
        colortitle="#000000"
        dopinfo="или 279 ₽/мес. при рассрочке на 24 мес."
        beige={isAuth && tarif === tarifs.second ? "Текущий тариф" : ""}
        colorborder={isAuth && tarif === tarifs.second ? "#FFB64F" : "#FFFFFF"}
        colorbuttonname={
          isAuth && tarif === tarifs.second ? "#000000" : "#FFFFFF"
        }
      />
      <TarifCard
        title="Business"
        text="Для корпоративных клиентов"
        image={tariflaptop}
        price="2379"
        oldprice="3700"
        buttonname={
          isAuth && tarif === tarifs.third
            ? "Перейти в личный кабинет"
            : "Подробнее"
        }
        tariffitems={[
          "Все пункты тарифа Pro",
          "Безлимитное количество запросов",
          "Приоритетная поддержка",
        ]}
        colorheader={isAuth && tarif === tarifs.third ? "#FFB64F" : "#000000"}
        colorbutton={isAuth && tarif === tarifs.third ? "#D2D2D2" : "#5970FF"}
        colortitle={isAuth && tarif === tarifs.third ? "000000" : "#FFFFFF"}
        beige={isAuth && tarif === tarifs.third ? "Текущий тариф" : ""}
        colorborder={isAuth && tarif === tarifs.third ? "#FFB64F" : "#FFFFFF"}
        colorbuttonname={
          isAuth && tarif === tarifs.third ? "#000000" : "#FFFFFF"
        }
      />
    </div>
  );
};

export default TarifList;
