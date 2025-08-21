import style from "./search.module.scss";
import allstyles from "../allstyle.module.scss";
import mainimg from "./img/mainimg.svg";
import documentlist from "./img/Document.svg";
import folders from "./img/Folders.svg";
import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { useNavigate } from "react-router-dom";

interface Error {
  code: number;
  message: string;
}

export default function Search() {
  const [inn, setInn] = useState("");
  const [ton, setTon] = useState("");
  const [countDocs, setCountDocs] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxFull, setMaxFull] = useState(false);
  const [buisnessContext, setBuisnessContext] = useState(false);
  const [mainRole, setMainRole] = useState(false);
  const [onlyRisk, setOnlyRisk] = useState(false);
  const [technicalNews, setTechnicalNews] = useState(false);
  const [previews, setPreviews] = useState(false);
  const [newsBulletin, setNewsBulletin] = useState(false);
  const [dateStartError, setDateStartError] = useState("");
  const [dateEndError, setDateEndError] = useState("");
  const [innError, setInnError] = useState("");
  const [countError, setCountError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const validateInn = (inn: string): boolean => {
    const errorObj: Error = { code: 0, message: "" };
    let result = false;
    inn = String(inn);

    if (!inn.length) {
      errorObj.code = 1;
      errorObj.message = "Обязательное поле";
    } else if (!/^\d+$/.test(inn)) {
      errorObj.code = 2;
      errorObj.message = "ИНН может состоять только из цифр";
    } else if ([10].indexOf(inn.length) === -1) {
      errorObj.code = 3;
      errorObj.message = "ИНН должен состоять из 10 цифр";
    } else {
      const checkDigit = (inn: string, coefficients: number[]): number => {
        let n = 0;
        for (let i = 0; i < coefficients.length; i++) {
          const digit = parseInt(inn[i], 10);
          if (!isNaN(digit)) {
            n += coefficients[i] * digit;
          }
        }
        return (n % 11) % 10;
      };

      const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
      const lastDigit = parseInt(inn[9], 10);
      if (!isNaN(lastDigit) && n10 === lastDigit) {
        result = true;
      }
      if (!result) {
        errorObj.code = 4;
        errorObj.message = "Введите корректные данные";
      }
    }

    setInnError(errorObj.message);
    return result;
  };

  const validateCount = (count: string | number) => {
    count = Number(count);

    if (count < 1 || count > 1000) {
      setCountError("Введите число > 0 и < 1000");
    } else {
      setCountError("");
    }
  };

  const validateStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const now = new Date();
    const start = new Date(e.target.value);

    if (start > now) {
      
      setDateStartError("Дата не может быть позже текущей");
      
    } else if (start > new Date(endDate)) {
      
      setDateStartError("Дата начала периода не может быть больше даты конца");
    } else {
     
      setDateStartError("");
    }
  };

  const validateEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const now = new Date();
    const finish = new Date(e.target.value);

    if (finish > now) {
       setDateEndError("Дата не может быть позже текущей");
    } else if (finish < new Date(startDate)) {
      
      setDateEndError("Дата конца периода не может быть меньше даты начала");
    } else {
     
      setDateEndError("");
    }
  };

  useEffect(() => {
    if(inn && countDocs && startDate && endDate && !innError && !countError && !dateEndError && !dateStartError){
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  },[inn, countDocs, startDate, endDate])

	const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
    const tonSearch =
      ton === "любая" ? "any" : ton === "позитивная" ? "positive" : "negative";
    if (isFormValid) {
      const searchParams = {
        issueDateInterval: {
          startDate: `${startDate}T00:00:00+03:00`,
          endDate: `${endDate}T23:59:59+03:00`,
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                inn: inn,
                maxFullness: maxFull,
              },
            ],
            onlyMainRole: mainRole,
            tonality: tonSearch,
            onlyWithRiskFactors: onlyRisk,
          },
        },
        attributeFilters: {
          excludeTechNews: technicalNews,
          excludeAnnouncements: previews,
          excludeDigests: newsBulletin,
        },
        similarMode: "duplicates",
        limit: Number(countDocs),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
      };
      console.log("Отправка запроса на сервер:", searchParams);
      navigate("/result", { state: { searchParams: searchParams } });
    } else {
      console.log("Форма не валидна, введите корректные данные.");
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
            <form onSubmit={handleSubmitForm} className={style.searthform}>
              <div className={style.formdecor}>
                <img src={documentlist} alt="зеленый лист бумаги" />
              </div>
              <div className={style.formblock}>
                <div className={style.inputs}>
                  <div className={style.inputwrapper}>
                    <label htmlFor="inn" className={style.label}>
                      ИНН компании
                      <sup style={{ color: innError ? "#ff0000" : "#000000" }}>
                        *
                      </sup>
                    </label>
                    <input
                      type="text"
                      name="inn"
                      id="inn"
                      value={inn}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInn(e.target.value)
                      }
                      className={`${style.input} ${style.inputinfo}`}
                      onBlur={() => validateInn(inn)}
                      placeholder="10 цифр"
                      required
                      style={{
                        border: innError
                          ? "0.1rem solid #ff0000"
                          : "0.1rem solid #c7c7c7",
                        color: innError ? "#ff0000" : "#000000",
                      }}
                    />
                    <p className={style.error}>{innError}</p>
                  </div>
                  <label htmlFor="ton" className={style.label}>
                    Тональность
                  </label>
                  <select
                    name="ton"
                    id="ton"
                    value={ton}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setTon(e.target.value)
                    }
                    className={`${style.selectinput} ${style.inputinfo}`}
                  >
                    <option>любая</option>
                    <option>позитивная</option>
                    <option>негативная</option>
                  </select>
                  <div className={style.inputwrapper}>
                    <label htmlFor="countdoc" className={style.label}>
                      Количество документов в выдаче
                      <sup
                        style={{ color: countError ? "#ff0000" : "#000000" }}
                      >
                        *
                      </sup>
                    </label>
                    <input
                      type="text"
                      name="countdoc"
                      id="countdoc"
                      value={countDocs}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCountDocs(e.target.value)
                      }
                      onBlur={() => validateCount(countDocs)}
                      className={`${style.input} ${style.inputinfo}`}
                      placeholder="От 1 до 1000"
                      required
                    />
                    <p className={style.error}>{countError}</p>
                  </div>
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
                Диапазон поиска
                <sup
                  style={{
                    color:
                      dateEndError || dateStartError ? "#ff0000" : "#000000",
                  }}
                >
                  *
                </sup>
              </p>
              <div className={style.formfinishblock}>
                <div className={style.datewrapper}>
                  <div className={style.dateblock}>
                    <input
                      type="date"
                      name="start"
                      id="start"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      onBlur={validateStartDate}
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
                    <input
                      type="date"
                      name="finish"
                      id="finish"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      onBlur={validateEndDate}
                      className={`${style.input} ${style.dateinput}`}
                      placeholder="Дата конца"
                      required
                      style={{
                        border:
                          dateEndError !== ""
                            ? "0.1rem solid #ff0000"
                            : "0.1rem solid #c7c7c7",
                      }}
                    />
                  </div>
                  <p className={style.errordate}>{dateStartError}</p>
                  <p className={style.errordate}>{dateEndError}</p>
                </div>
                <div className={style.submitblock}>
                  <button
                    type="submit"
                    className={`${allstyles.button} ${style.submitbutton}`}
                    disabled={!isFormValid}
                    style={{ opacity: !isFormValid ? 0.5 : 1 }}
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
