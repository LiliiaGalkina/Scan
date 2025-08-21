import style from "./documentitem.module.scss";
import allstyle from "../allstyle.module.scss";

const DocumentItem = (props: any) => {
  const label = props.isTechNews ? "Технические новости": props.isAnnouncement ? "Анонсы и события" : "Сводки новостей";
    return (
      <div className={style.document}>
        <div className={style.info}>
          <div className={style.date}>{props.date}</div>
          <a href={props.url} className={style.link} target="_blank">
            {props.sourceName}
          </a>
        </div>
        <h3 className={style.title}>{props.title} </h3>
        <div className={style.category}>{label}</div>
        <div className={style.image}>
          <img
            src={props.picture}
            alt="обложка статьи"
          />
        </div>
        <div className={style.text}>{props.content}</div>
        <div className={style.documentfooter}>
          <a
            href={props.url}
            className={`${allstyle.button} ${style.documentbutton}`}
            target="_blank"
          >
            Читать в источнике
          </a>
          <div className={style.countwords}>{props.wordCount} слов(а)</div>
        </div>
      </div>
    );
}

export default DocumentItem;