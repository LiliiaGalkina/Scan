import style from "./search.module.scss";
import allstyles from "../../allstyle.module.scss"
import mainimg from "./img/mainimg.svg";
import documentlist from "./img/Document.svg";
import folders from "./img/Folders.svg"; 

export default function Search() {
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
                      className={`${style.input} ${style.inputinfo}`}
                      placeholder="10 цифр"
                    />
                    <label htmlFor="ton" className={style.label}>
                      Тональность
                    </label>
                    <select
                      name="ton"
                      id="ton"
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
                      className={`${style.input} ${style.inputinfo}`}
                      placeholder="От 1 до 1000"
                    />
                  </div>
                  <div className={style.checkboxes}>
                    <div className={style.checkboxitem}>
                      <input type="checkbox" className={style.checkbox} />
                      <p className={style.checkboxtext}>
                        Признак максимальной полноты
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input type="checkbox" className={style.checkbox} />
                      <p className={style.checkboxtext}>
                        Упоминания в бизнес-контексте
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input type="checkbox" className={style.checkbox} />
                      <p className={style.checkboxtext}>
                        Главная роль в публикации
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input type="checkbox" className={style.checkbox} />
                      <p className={style.checkboxtext}>
                        Публикации только с риск-факторами
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input type="checkbox" className={style.checkbox} />
                      <p className={style.checkboxtext}>
                        Включать технические новости рынков
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input type="checkbox" className={style.checkbox} />
                      <p className={style.checkboxtext}>
                        Включать анонсы и календари
                      </p>
                    </div>
                    <div className={style.checkboxitem}>
                      <input type="checkbox" className={style.checkbox} />
                      <p className={style.checkboxtext}>
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
                      className={`${style.input} ${style.dateinput}`}
                      placeholder="Дата начала"
                    />
                    <input
                      type="date"
                      name="finish"
                      id="finish"
                      className={`${style.input} ${style.dateinput}`}
                      placeholder="Дата конца"
                    />
                  </div>
                  <div className={style.submitblock}>
                    <button
                      type="submit"
                      className={`${allstyles.button} ${style.submitbutton}`}
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