import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import maimimgresult from "./img/mainimgresult.svg";
import style from "./result.module.scss";
import allstyles from "../../allstyle.module.scss";

import Histograms from "./Histograms";
import DocumentItem from "./DocumentItem";
import { localHistogramsData } from "./localdata";


interface IHistogramsItem {
  period: string;
  total: number;
  risks: number;
}

const Result = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [histogramsItems, setHistogramsItems] = useState<IHistogramsItem[]>([]);
  const [documetsItems, setDocumentsItems] = useState(null);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  

  const getResult = async () => {
     const searchParams = location.state.searchParams;
     if (!searchParams) {
       console.log("Параметры поиска отсутствуют");
       setIsLoading(false);
       return;
     }

     setIsLoading(true);
     setIsError(false);

     // get histograms-------------------------------------------------
      const histogramUrl =
        "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms";

      try {
         const histogramsRes = await fetch(histogramUrl, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
           },
           body: JSON.stringify(searchParams),
           credentials: "omit",
         });

         if (!histogramsRes.ok) {
           throw new Error("Ошибка получения данных histograms с сервера");
         }

         const histogramsData = await histogramsRes.json();
         setHistogramsItems(histogramsData);
      } catch (err) {
         console.error("Ошибка при запросе данных с сервера:", err);
         try {
           setHistogramsItems(localHistogramsData);
         } catch (err) {
          console.error("Ошибка при загрузке локальных данных:", err);
          setIsError(true);
         }
      } finally {
        setIsLoading(false);
      }

      //get ids------------------------------
  }
  


  //-----------------------------------------------------------------
/*  const getResult = async () => {
   
    const searchParams = location.state.searchParams;
    if (!searchParams) {
      console.log("Параметры поиска отсутствуют");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    const histogramUrl =
      "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms";

    try {
      const histogramRes = await fetch(histogramUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(searchParams),
        credentials: "omit",
      }); 

     if (!histogramRes.ok) {
        throw new Error("Ошибка получения данных histograms с сервера");
      }

      const histogramData = await histogramRes.json();
      console.log(histogramData);
      setHistogramItems(histogramData);

         const publicationIdUrl =
        "https://gateway.scan-interfax.ru/api/v1/objectsearch";

      const publicationIdRes = await fetch(publicationIdUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(searchParams),
        credentials: "omit",
      });

      if (!publicationIdRes.ok) {
        throw new Error("Ошибка получения данных objectsearch с сервера");
      }

      const publicationIdData = await publicationIdRes.json();
      const publicationIdsItems = publicationIdData.map(
        (item: any) => item.encodedId
      );

      console.log(publicationIdsItems);

      const documentsUrl = "https://gateway.scan-interfax.ru/api/v1/documents";
      const documentsRes = await fetch(documentsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ ids: publicationIdsItems }),
        credentials: "omit",
      });

      if (!documentsRes.ok) {
        throw new Error("Ошибка получения данных documents с сервера");
      }

      const documentsData = await documentsRes.json();
      setDocumentsItems(documentsData);

      console.log(documentsData);
    } catch (e: any) {
      console.log("Ошибка выполнения запроса данных с сервера", e.message);
      setIsError(true);
      try {

      } catch (e) {

      }
    } finally {
      setIsLoading(false);
    }
  };*/

  useEffect(() => {
    getResult();
  }, [JSON.stringify(location.state?.searchParams)]);

  return (
    <main className={style.main}>
      <div className="container">
        <div className={style.result}>
          <div className={style.resultmainblock}>
            <div>
              <h2 className={`${allstyles.title} ${style.resulttitle}`}>
                Ищем. Скоро будут результаты
              </h2>
              <p className={style.resulttext}>
                Поиск может занять некоторое время, просим сохранять терпение.
              </p>
            </div>
            <div className={style.resultimage}>
              <img
                src={maimimgresult}
                alt="женщина смотрит через лупу и дуржит в руках дартс"
              />
            </div>
          </div>
         
          {isError && (
            <div className={style.resulterror}>
              Ошибка загрузки данных. Попробуйте зайти позднее.
            </div>
          )}
          <section className={style.histograms}>
            <h3 className={`${allstyles.title} ${style.histogramstitle}`}>
              Общая сводка
            </h3>
            <p className={style.histogramstext}>Найдено 4 221 вариантов</p>
            <div className={style.histogramstable}>
              <Histograms histogramsItems={histogramsItems} isLoading={isLoading}/>
            </div>
          </section>
          <section className={style.documents}>
            <h2 className={`${allstyles.title} ${style.documentstitle}`}>
              Список документов
            </h2>
            <div className={style.documentsitems}>
              <DocumentItem />
              <DocumentItem />
              <DocumentItem />
              <DocumentItem />
            </div>
            <button
              className={`${allstyles.button} ${style.buttonadddocuments}`}
            >
              Показать больше
            </button>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Result;
