import style from "./search.module.scss";
import allstyles from "../../allstyle.module.scss"
import mainimg from "./img/mainimg.svg";
import documentlist from "./img/Document.svg";
import folders from "./img/Folders.svg"; 
import { useState } from "react";
import check from "./img/check.svg"

export default function Search() {
  const [inn, setInn] = useState("");
  const [ton, setTon] = useState("");
  const [countDocs, setCountDocs] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishtDate, setFinishDate] = useState("");
  const [maxFull, setMaxFull] = useState(false);
  const [buisnessContext, setBuisnessContext] = useState(false);
  const [mainRole, setMainRole] = useState(false);
  const [onlyRisk, setOnlyRisk] =useState(false);
  const [technicalNews, setTechnicalNews] = useState(false);
  const [previews, setPreviews] = useState(false);
  const [newsBulletin, setNewsBulletin] = useState(false);

  const handleChangeInn = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setInn(e.target.value);
  }

   const handleChangeTon = (e: React.ChangeEvent<HTMLSelectElement>) => {
     setTon(e.target.value);
   };

   const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
     setCountDocs(e.target.value);
   };

    const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartDate(e.target.value);
    };

     const handleChangeFinishDate = (e: React.ChangeEvent<HTMLInputElement>) => {
       setFinishDate(e.target.value);
     };


    return (
      <main className={style.main}>
        <div className="container">
          <div className={style.search}>
            <div className={style.searchinfo}>
              <h2 className={`${allstyles.title} ${style.searchtitle}`}>
                Найдите необходимые данные в пару кликов.
              </h2>
              <div className={style.text}>
                Задайте параметры поиска. <br />
                Чем больше заполните, тем точнее поиск
              </div>
              <form action="#" className={style.searthform}>
                <div className={style.formdecor}>
                  <img src={documentlist} alt="зеленый лист бумаги" />
                </div>
                <div className={style.formblock}>
                  <div className={style.inputs}>
                    <label htmlFor="inn" className={style.label}>
                      ИНН компании<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="inn"
                      id="inn"
                      value={inn}
                      onChange={handleChangeInn}
                      className={`${style.input} ${style.inputinfo}`}
                      placeholder="10 цифр"
                      required
                    />
                    <label htmlFor="ton" className={style.label}>
                      Тональность
                    </label>
                    <select
                      name="ton"
                      id="ton"
                      value={ton}
                      onChange={handleChangeTon}
                      className={`${style.input} ${style.inputinfo}`}
                    >
                      <option>любая</option>
                      <option>позитивная</option>
                      <option>негативная</option>
                    </select>
                    <label htmlFor="countdoc" className={style.label}>
                      Количество документов в выдаче<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="countdoc"
                      id="countdoc"
                      value={countDocs}
                      onChange={handleChangeCount}
                      className={`${style.input} ${style.inputinfo}`}
                      placeholder="От 1 до 1000"
                      required
                    />
                  </div>
                  <div className={style.checkboxes}>
                    <div className={style.checkboxitem}>
                      <input
                        type="checkbox"
                        id="maxfull"
                        name="maxfull"
                        className={style.checkbox}
                        checked={maxFull}
                        onChange={() => setMaxFull(!maxFull)}
                        style={{
                          backgroundImage: maxFull ? `url(${check})` : "none",
                        }}
                      />
                      <p
                        className={style.checkboxtext}
                        style={{ opacity: maxFull ? 1 : 0.4 }}
                      >
                        Признак максимальной полноты
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input
                        type="checkbox"
                        id="buisnesscontext"
                        name="buisnesscontext"
                        className={style.checkbox}
                        checked={buisnessContext}
                        onChange={() => setBuisnessContext(!buisnessContext)}
                        style={{
                          backgroundImage: buisnessContext
                            ? `url(${check})`
                            : "none",
                        }}
                      />
                      <p
                        className={style.checkboxtext}
                        style={{ opacity: buisnessContext ? 1 : 0.4 }}
                      >
                        Упоминания в бизнес-контексте
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input
                        type="checkbox"
                        className={style.checkbox}
                        checked={mainRole}
                        onChange={() => setMainRole(!mainRole)}
                      />
                      <p
                        className={style.checkboxtext}
                        style={{ opacity: mainRole ? 1 : 0.4 }}
                      >
                        Главная роль в публикации
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input
                        type="checkbox"
                        className={style.checkbox}
                        checked={onlyRisk}
                        onChange={() => setOnlyRisk(!onlyRisk)}
                      />
                      <p
                        className={style.checkboxtext}
                        style={{ opacity: onlyRisk ? 1 : 0.4 }}
                      >
                        Публикации только с риск-факторами
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input
                        type="checkbox"
                        className={style.checkbox}
                        checked={technicalNews}
                        onChange={() => setTechnicalNews}
                      />
                      <p
                        className={style.checkboxtext}
                        style={{ opacity: technicalNews ? 1 : 0.4 }}
                      >
                        Включать технические новости рынков
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input
                        type="checkbox"
                        className={style.checkbox}
                        checked={previews}
                        onChange={() => setPreviews}
                      />
                      <p
                        className={style.checkboxtext}
                        style={{ opacity: previews ? 1 : 0.4 }}
                      >
                        Включать анонсы и календари
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input
                        type="checkbox"
                        className={style.checkbox}
                        checked={newsBulletin}
                        onChange={() => setNewsBulletin}
                      />
                      <p
                        className={style.checkboxtext}
                        style={{ opacity: newsBulletin ? 1 : 0.4 }}
                      >
                        Включать сводки новостей
                      </p>
                    </div>
                  </div>
                </div>
                <p className={style.label}>
                  Диапазон поиска<sup>*</sup>
                </p>
                <div className={style.formfinishblock}>
                  <div className={style.dateblock}>
                    <input
                      type="date"
                      name="start"
                      id="start"
                      value={startDate}
                      onChange={handleChangeStartDate}
                      className={`${style.input} ${style.dateinput}`}
                      placeholder="Дата начала"
                      required
                    />
                    <input
                      type="date"
                      name="finish"
                      id="finish"
                      value={finishtDate}
                      onChange={handleChangeFinishDate}
                      className={`${style.input} ${style.dateinput}`}
                      placeholder="Дата конца"
                      required
                    />
                  </div>
                  <div className={style.submitblock}>
                    <button
                      type="submit"
                      className={`${allstyles.button} ${style.submitbutton}`}
                      disabled={!inn || !countDocs || !startDate || !finishtDate}
                      style={{opacity: !inn || !countDocs || !startDate || !finishtDate ? 0.5 : 1}}
                    >
                      Поиск
                    </button>
                    <p className={style.submintext}>
                      * Обязательные к заполнению поля
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className={style.searchimage}>
              <div className={style.imagedecor}>
                <img src={folders} alt="разноцветные папки" />
              </div>
              <img
                src={mainimg}
                className={style.searchmainimg}
                alt="человек на фоне страницы поиска"
              />
            </div>
          </div>
        </div>
      </main>
    );
}