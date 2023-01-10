import parseCSV from "./parse";
import kdb from "./kdb.json";

const createICS = (csv: Blob, ifDeadlinesIncluded: boolean) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsText(csv);
    reader.onload = () => {
      const fileContent = String(reader.result);
      const isFromKdBAlt = fileContent.slice(0, 1) === "科";
      const idList = isFromKdBAlt
        ? fileContent
            .split("\n")
            .filter((x) => x.slice(0, 1) === '"')
            .map((x) => x.replace('"', ""))
            .filter((x, i, self) => self.indexOf(x) === i)
        : fileContent.split("\n").filter((x, i, self) => self.indexOf(x) === i);
      const output =
        parseCSV(idList, kdb, ifDeadlinesIncluded, isFromKdBAlt) +
        `END:VCALENDAR`;

      resolve(output);
    };
  });

export { createICS };
