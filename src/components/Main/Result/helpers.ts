interface ICombinedDataItem {
  period: string;
  total: number;
  risks: number;
}

  interface IHistogramItem {
    date: string;
    value: number;
  }

  interface IHistogram {
    histogramType: string;
    data: IHistogramItem[];
  }

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const combineDataByDate = (data: any[]): ICombinedDataItem[] => {
  const combinedData: Record<string, ICombinedDataItem> = {};

  data.forEach((histogram: IHistogram) => {
    histogram.data.forEach((item) => {
      const dateKey = item.date.split("T")[0];
      if (!combinedData[dateKey]) {
        combinedData[dateKey] = {
          period: formatDate(dateKey),
          total: 0,
          risks: 0,
        };
      }
      if (histogram.histogramType === "totalDocuments") {
        combinedData[dateKey].total += item.value;
      } else if (histogram.histogramType === "riskFactors") {
        combinedData[dateKey].risks += item.value;
      }
    });
  });

  return Object.values(combinedData).sort(
    (a: ICombinedDataItem, b:ICombinedDataItem) => new Date(a.period).getTime() - new Date(b.period).getTime()
  );
};
