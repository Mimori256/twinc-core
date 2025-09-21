export const createIdList = (fileContent: string, isFromKdBAlt: boolean) => {
  const normalize = (s: string) => s.replace(/"/g, "").trim();

  const idList = isFromKdBAlt
    ? fileContent
      .split("\n")
      .map((x) => x.split(",")[0])
      .map(normalize)
      .filter((x) => x !== "" && x !== "科目番号")
      .filter((x, i, self) => self.indexOf(x) === i)
    : fileContent
      .split("\n")
      .map(normalize)
      .filter((x) => x !== "" && x !== "科目番号")
      .filter((x, i, self) => self.indexOf(x) === i);

  return idList;
};
