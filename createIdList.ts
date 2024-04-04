export const createIdList = (fileContent: string, isFromKdBAlt: boolean) => {
  const idList = isFromKdBAlt
    ? fileContent
        .split("\n")
        .filter((x) => x.slice(0, 1) === '"')
        .map((x) => x.replace('"', ""))
        .filter((x, i, self) => self.indexOf(x) === i)
    : fileContent
        .split("\n")
        .filter((x, i, self) => self.indexOf(x) === i)
        .map((x) => x.replace(/"/g, ""));
  return idList.map((x) => x.trim());
};
