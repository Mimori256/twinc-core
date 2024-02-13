import { fetchKdb } from "./fetchKdb";
import parseCSV from "./parse";

const createICS = async (fileContent: string, ifDeadlinesIncluded: boolean) => {
  const kdb = await fetchKdb();
  console.log(kdb);
  const isFromKdBAlt = fileContent.slice(0, 1) === "科";
  const idList = isFromKdBAlt
    ? fileContent
        .split("\n")
        .filter((x) => x.slice(0, 1) === '"')
        .map((x) => x.replace('"', ""))
        .filter((x, i, self) => self.indexOf(x) === i)
    : fileContent.split("\n").filter((x, i, self) => self.indexOf(x) === i);
  return `${parseCSV(
    idList,
    kdb,
    ifDeadlinesIncluded,
    isFromKdBAlt,
  )}END:VCALENDAR`;
};

export default createICS;
