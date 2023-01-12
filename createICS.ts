import parseCSV from "./parse";
import kdb from "./kdb.json";

const createICS = (fileContent: string, ifDeadlinesIncluded: boolean) => {
  const isFromKdBAlt = fileContent.slice(0, 1) === "科";
  const idList = isFromKdBAlt
    ? fileContent
        .split("\n")
        .filter((x) => x.slice(0, 1) === '"')
        .map((x) => x.replace('"', ""))
        .filter((x, i, self) => self.indexOf(x) === i)
    : fileContent.split("\n").filter((x, i, self) => self.indexOf(x) === i);
  return (
    parseCSV(idList, kdb, ifDeadlinesIncluded, isFromKdBAlt) + `END:VCALENDAR`
  );
};

export { createICS };
