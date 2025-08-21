import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import maimimgresult from "./img/mainimgresult.svg";
import style from "./result.module.scss";
import allstyles from "../../allstyle.module.scss";
import Histograms from "./Histograms";
import {
  localHistogramsData,
  localDocuments
} from "./localdata";
import Documents from "./Documents";


interface IHistogramsItem {
  period: string;
  total: number;
  risks: number;
}



const Result = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [histogramsItems, setHistogramsItems] = useState<IHistogramsItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [documetsItems, setDocumentsItems] = useState<any>(null);
  const [isGetDocumentsFromServer, setIsGetDocumentsFromServer] = useState(false);
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
         const totalDocuments = histogramsData.data.find(
           (histogram:any) => histogram.histogramType === "totalDocuments"
         );
           if (totalDocuments) {
             const total = totalDocuments.data.reduce(
               (sum:number, item:any) => sum + item.value,
               0
             );
             setTotalCount(total);
           }
         setHistogramsItems(histogramsData);
      } catch (err) {
         console.error("Ошибка при запросе данных histograms с сервера:", err);
         try {
          const totalLocal = localHistogramsData.reduce((sum, item) => sum + item.total, 0);
          if(totalLocal){
            setTotalCount(totalLocal);
          }
           setHistogramsItems(localHistogramsData);
         } catch (err) {
          console.error(
            "Ошибка при загрузке локальных данных histograms:",
            err
          );
          setIsError(true);
         }
      } finally {
        setIsLoading(false);
      }

      //get ids------------------------------
      const publicationIdUrl =
        "https://gateway.scan-interfax.ru/api/v1/objectsearch";
           const publicationIdRes = await fetch(publicationIdUrl, {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
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


           //get documents
           const documentsUrl =
             "https://gateway.scan-interfax.ru/api/v1/documents";
             try {
               const documentsRes = await fetch(documentsUrl, {
                 method: "POST",
                 headers: {
                   "Content-Type": "application/json",
                   Accept: "application/json",
                   Authorization: `Bearer ${localStorage.getItem(
                     "accessToken"
                   )}`,
                 },
                 body: JSON.stringify({ ids: publicationIdsItems }),
                 credentials: "omit",
               });
    
               if (!documentsRes.ok) {
                 throw new Error("Ошибка получения данных documents с сервера");
               }
    
               const documentsData = await documentsRes.json();
               setDocumentsItems(documentsData);
               setIsGetDocumentsFromServer(true);

             } catch (err) {
          console.error("Ошибка при запросе данных documents с сервера:", err);
          try {
           setDocumentsItems(localDocuments);
           setIsGetDocumentsFromServer(false);
          } catch (err) {
            console.error(
              "Ошибка при загрузке локальных данных publicationIds:",
              err
            );
          }
        }
  }
  

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
            <p className={style.histogramstext}>
              Найдено {totalCount} вариантов
            </p>
            <div className={style.histogramstable}>
              <Histograms
                histogramsItems={histogramsItems}
                isLoading={isLoading}
              />
            </div>
          </section>
          <section className={style.documents}>
            <h2 className={`${allstyles.title} ${style.documentstitle}`}>
              Список документов
            </h2>
            <Documents
              documentsItems={documetsItems}
              isGetDocumentsFromServer={isGetDocumentsFromServer}
            />
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
