import style from "./search.module.scss";

const Checkbox = () => {
    return (
      <div className={style.checkboxitem}>
        <input
          type="checkbox"
          className={style.checkbox}
          checked={technicalNews}
          onChange={() => setTechnicalNews(!technicalNews)}
          style={{
            backgroundImage: technicalNews ? `url(${mark})` : "none",
          }}
        />
        <p
          className={style.checkboxtext}
          style={{ opacity: technicalNews ? 1 : 0.4 }}
        >
          Включать технические новости рынков
        </p>
      </div>
    );
    
}