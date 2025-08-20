import { useEffect, useState } from "react";
import style from "./result.module.scss";
import docimage from "./img/article2.png";
import DocumentItem from "./DocumentItem";
import allstyles from "../../allstyle.module.scss";

interface IDocumentsProps {
  documentsItems: any;
  isGetDocumentsFromServer: boolean;
}

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function cleanHtmlContent(htmlContent: string) {
  const decodedHtml = decodeHtml(htmlContent);
  const cleanedContent = decodedHtml.replace(/(<([^>]+)>)/gi, "");
  return cleanedContent;
}

const Documents: React.FC<IDocumentsProps> = ({ documentsItems, isGetDocumentsFromServer }) => {
  const [documents, setDocuments] = useState<any>([]);
   const [displayedArticles, setDisplayedArticles] = useState(2); 


  useEffect(() => {
    if (documentsItems && Array.isArray(documentsItems)){
      if (isGetDocumentsFromServer) {
        const transformedArticles = documentsItems.map((doc) => ({
          date: new Date(doc.ok.issueDate).toLocaleDateString("ru-RU"),
          url: doc.ok.url,
          sourceName: doc.ok.source.name,
          isTechNews: doc.ok.attributes.isTechNews,
          isAnnouncement: doc.ok.attributes.isAnnouncement,
          isDigest: doc.ok.attributes.isDigest,
          title: doc.ok.title.text,
          content: cleanHtmlContent(doc.ok.content.markup),
          wordCount: doc.ok.attributes.wordCount,
          picture: docimage,
        }));

        setDocuments(transformedArticles);
      } else {
        setDocuments(documentsItems);
      }

    }
  }, [documentsItems]);

   const showMoreArticles = () => {
     setDisplayedArticles((prev) => prev + 2); // Показывать на две статьи больше
   };


  return (
    <>
      <div className={style.documentsitems}>
        {documents
          .slice(0, displayedArticles)
          .map((doc: any, index: number) => (
            <DocumentItem key={index} {...doc} />
          ))}
      </div>
      <button className={`${allstyles.button} ${style.buttonadddocuments}`} onClick={showMoreArticles} style={{display: displayedArticles < documents.length ? "block" : "none"}}>
        Показать больше
      </button>
    </>
  );
};

export default Documents;