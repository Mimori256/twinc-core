import { describe, expect, it } from "@jest/globals";
import kdb from "../data/sample-2023.json";
import parseCSV from "../parse";

describe("parseCSV", () => {
  const idList = [
    "GC55301",
    "GC51401",
    "GC50501",
    "GC41203",
    "GC53401",
    "GC55201",
    "",
  ];
  const ics = `${parseCSV(idList, kdb, true, false)}END:VCALENDAR`;
  it("should return a string", () => {
    expect(typeof ics).toBe("string");
  });
  it("should match the expected result", () => {
    expect(ics).toMatchSnapshot();
  });
});
