export const createIdList = (fileContent: string, isFromKdBAlt: boolean) => {
  const idList = isFromKdBAlt
    ? fileContent
      .split("\n")
      .map((x) => x.replace('"', ""))
      .map((x) => x.split(",")[0])
      .filter((x) => x !== "科目番号")
      .filter((x, i, self) => self.indexOf(x) === i)
    : fileContent
      .split("\n")
      .filter((x, i, self) => self.indexOf(x) === i)
      .map((x) => x.replace(/"/g, ""));
  return idList.map((x) => x.trim());
};
