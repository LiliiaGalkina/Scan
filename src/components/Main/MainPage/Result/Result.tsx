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
import loader from "../../../Header/img/loader.png";


interface IHistogramsItem {
  period: string;
  total: number;
  risks: number;
}



const Result = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(false);
  const [histogramsItems, setHistogramsItems] = useState<IHistogramsItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [documetsItems, setDocumentsItems] = useState<any>(null);
  const [isGetDocumentsFromServer, setIsGetDocumentsFromServer] = useState(false);
  const [isGetHistogramFromServer, setIsGetHistogramFromServer] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  

  useEffect(() => {
    const getResults = async () => {
      const searchParams = location.state?.searchParams;
      if (!searchParams) {
        console.error("Параметры поиска отсутствуют.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setIsDocumentsLoading(true);
      setIsError(false);

      try {
        //histograms
        const histogramRes= await fetch(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(searchParams),
            credentials: "omit",
          }
        );

        if (histogramRes.ok) {
          const histogramsData = await histogramRes.json();
          setHistogramsItems(histogramsData);
          const totalDocuments = histogramsData.data.find(
            (histogram: any) => histogram.histogramType === "totalDocuments"
          );
          if (totalDocuments) {
            const total = totalDocuments.data.reduce(
              (sum: number, item: any) => sum + item.value,
              0 
            );
            setTotalCount(total);
          }
            setIsGetHistogramFromServer(true);
            setIsLoading(false);
        } else {
          setHistogramsItems(localHistogramsData);
           const totalLocal = localHistogramsData.reduce(
             (sum, item) => sum + item.total,
             0
           );
           if (totalLocal) {
             setTotalCount(totalLocal);
           }
          setIsGetHistogramFromServer(false);
           setIsLoading(false);
        }

        //ids
        const publicationIdsResponse = await fetch(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(searchParams),
            credentials: "omit",
          }
        );

       if (publicationIdsResponse.ok) {
         const publicationIdsData = await publicationIdsResponse.json();
         const publicationIds = publicationIdsData.items.map(
           (item: any) => item.encodedId
         );

         // documents
         const documentsResponse = await fetch(
           "https://gateway.scan-interfax.ru/api/v1/documents",
           {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
             },
             body: JSON.stringify({ ids: publicationIds }),
             credentials: "omit",
           }
         );

           if (documentsResponse.ok) {
             const documentsData = await documentsResponse.json();
             setDocumentsItems(documentsData);
             setIsGetDocumentsFromServer(true);
           }
           setIsDocumentsLoading(false);
       } else {
        setDocumentsItems(localDocuments);
        setIsGetDocumentsFromServer(false);
        }
      } catch (err) {
          setIsError(true);
        throw new Error("Данных по указанным параметрам поиска не найдено. Вернитесь на страницу поиска и введите другие параметры.");
     
      } finally {
        setIsDocumentsLoading(false);
      }
    };

    getResults();
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
                alt="женщина смотрит через лупу и держит в руках дартс"
              />
            </div>
          </div>
          {isError && (
            <div className={style.error}>
              "Данных по указанным параметрам поиска не найдено. Вернитесь на
              страницу поиска и введите другие параметры."
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
                isGetHistogramFromServer={isGetHistogramFromServer}
              />
            </div>
          </section>
          <section className={style.documents}>
            <h2 className={`${allstyles.title} ${style.documentstitle}`}>
              Список документов
            </h2>
            {isDocumentsLoading && (
              <div className={style.loaderblockdocuments}>
                <div className={style.resultloader}>
                  <img src={loader} alt="loader" />
                </div>
                <div className={style.resultloadertext}>Загрузка данных...</div>
              </div>
            )}
            <Documents
              documentsItems={documetsItems}
              isGetDocumentsFromServer={isGetDocumentsFromServer}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Result;
