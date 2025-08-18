import style from "./documentitem.module.scss";
import vremitem from "./img/vremitem.png";
import allstyle from "../../allstyle.module.scss";

const DocumentItem = () => {
    return (
      <div className={style.document}>
        <div className={style.info}>
          <div className={style.date}>13.09.2021</div>
          <a href="#" className={style.link}>
            Комсомольская правда KP.RU
          </a>
        </div>
        <h3 className={style.title}>
          Скиллфэктори - лучшая онлайн-школа для будущих айтишников
        </h3>
        <div className={style.category}>Технические новости</div>
        <div className={style.image}>
          <img src={vremitem} alt="обложка статьи" />
        </div>
        <div className={style.text}>
          SkillFactory — школа для всех, кто хочет изменить свою карьеру и
          жизнь. С 2016 года обучение прошли 20 000+ человек из 40 стран с 4
          континентов, самому взрослому студенту сейчас 86 лет. Выпускники
          работают в Сбере, Cisco, Bayer, Nvidia, МТС, Ростелекоме, Mail.ru,
          Яндексе, Ozon и других топовых компаниях. Принципы SkillFactory:
          акцент на практике, забота о студентах и ориентир на трудоустройство.
          80% обучения — выполнение упражнений и реальных проектов. Каждого
          студента поддерживают менторы, 2 саппорт-линии и комьюнити курса. А
          карьерный центр помогает составить резюме, подготовиться к
          собеседованиям и познакомиться с IT-рекрутерами.
        </div>
        <div className={style.documentfooter}>
          <a href="#" className={`${allstyle.button} ${style.documentbutton}`}>
            Читать в источнике
          </a>
          <div className={style.countwords}>2 543 слова</div>
        </div>
      </div>
    );
}

export default DocumentItem;