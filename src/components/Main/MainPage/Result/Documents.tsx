import { useEffect, useState } from "react";
import style from "./result.module.scss";
import docimage from "./img/article2.png";
import DocumentItem from "./DocumentItem";

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


  return <div className={style.documentsitems}>
    {documents.map((doc: any, index:number) => (
        <DocumentItem key={index} {...doc}/>
    ))}
  </div>;
};

export default Documents;