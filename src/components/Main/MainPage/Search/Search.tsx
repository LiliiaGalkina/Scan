import style from "./search.module.scss";
import allstyles from "../../allstyle.module.scss";
import mainimg from "./img/mainimg.svg";
import documentlist from "./img/Document.svg";
import folders from "./img/Folders.svg";
import { useState } from "react";
import Checkbox from "./Checkbox";

export default function Search() {
  const [inn, setInn] = useState("");
  const [ton, setTon] = useState("");
  const [countDocs, setCountDocs] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [maxFull, setMaxFull] = useState(false);
  const [buisnessContext, setBuisnessContext] = useState(false);
  const [mainRole, setMainRole] = useState(false);
  const [onlyRisk, setOnlyRisk] = useState(false);
  const [technicalNews, setTechnicalNews] = useState(false);
  const [previews, setPreviews] = useState(false);
  const [newsBulletin, setNewsBulletin] = useState(false);
  const [dateStartError, setDateStartError] = useState("");
  const [dateFinishError, setDateFinishError] = useState("");

  const handleChangeInn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInn(e.target.value);
  };

  const handleChangeTon = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTon(e.target.value);
  };

  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountDocs(e.target.value);
  };

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const now = new Date();
    const start = new Date(e.target.value);

    if (start > now) {
      setStartDate(e.target.value);
      setDateStartError("Дата не может быть позже текущей");
      console.log(dateStartError)
    } else if (start > new Date(finishDate)) {
        setStartDate(e.target.value);
        setDateStartError(
          "Дата начала периода не может быть больше даты конца"
        );
      } else {
      setStartDate(e.target.value);
      setDateStartError("");
    }
  };

  const handleChangeFinishDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const now = new Date();
    const finish = new Date(e.target.value);

    if (finish > now) {
      setFinishDate(e.target.value);
      setDateFinishError("Дата не может быть позже текущей");
    } else if (finish < new Date(startDate)) {
       setFinishDate(e.target.value);
      setDateFinishError("Дата конца периода не может быть меньше даты начала");
     
    } else {
      setFinishDate(e.target.value);
      setDateFinishError("");
    }
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
                    className={`${style.selectinput} ${style.inputinfo}`}
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
                  <Checkbox
                    checkboxValue={maxFull}
                    setCheckboxValue={setMaxFull}
                    checkboxText="Признак максимальной полноты"
                  />
                  <Checkbox
                    checkboxValue={buisnessContext}
                    setCheckboxValue={setBuisnessContext}
                    checkboxText="Упоминания в бизнес-контексте"
                  />
                  <Checkbox
                    checkboxValue={mainRole}
                    setCheckboxValue={setMainRole}
                    checkboxText="Главная роль в публикации"
                  />
                  <Checkbox
                    checkboxValue={onlyRisk}
                    setCheckboxValue={setOnlyRisk}
                    checkboxText="Публикации только с риск-факторами"
                  />
                  <Checkbox
                    checkboxValue={technicalNews}
                    setCheckboxValue={setTechnicalNews}
                    checkboxText="Включать технические новости рынков"
                  />
                  <Checkbox
                    checkboxValue={previews}
                    setCheckboxValue={setPreviews}
                    checkboxText="Включать анонсы и календари"
                  />
                  <Checkbox
                    checkboxValue={newsBulletin}
                    setCheckboxValue={setNewsBulletin}
                    checkboxText="Включать сводки новостей"
                  />
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
                    style={{
                      border:
                        dateStartError !== ""
                          ? "0.1rem solid #ff0000"
                          : "0.1rem solid #c7c7c7",
                    }}
                  />
                  <p className={style.error}>{dateStartError}</p>
                  <input
                    type="date"
                    name="finish"
                    id="finish"
                    value={finishDate}
                    onChange={handleChangeFinishDate}
                    className={`${style.input} ${style.dateinput}`}
                    placeholder="Дата конца"
                    required
                    style={{
                      border:
                        dateFinishError !== ""
                          ? "0.1rem solid #ff0000"
                          : "0.1rem solid #c7c7c7",
                    }}
                  />
                  <p className={style.error}>{dateFinishError}</p>
                </div>
                <div className={style.submitblock}>
                  <button
                    type="submit"
                    className={`${allstyles.button} ${style.submitbutton}`}
                    disabled={
                      !inn ||
                      !countDocs ||
                      !startDate ||
                      !finishDate ||
                      dateFinishError !== "" ||
                      dateStartError !== ""
                    }
                    style={{
                      opacity:
                        !inn ||
                        !countDocs ||
                        !startDate ||
                        !finishDate ||
                        dateFinishError !== "" ||
                        dateStartError !== ""
                          ? 0.5
                          : 1,
                    }}
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
