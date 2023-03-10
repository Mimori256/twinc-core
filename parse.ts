import data from "./data/2022.json";

//Global variables
const beginSpringA: { [key: string]: string } = data["beginSpringA"];
const beginSpringB: { [key: string]: string } = data["beginSpringB"];
const beginSpringC: { [key: string]: string } = data["beginSpringC"];
const beginFallA: { [key: string]: string } = data["beginFallA"];
const beginFallB: { [key: string]: string } = data["beginFallB"];
const beginFallC: { [key: string]: string } = data["beginFallC"];

const springEndDate: { [key: string]: string } = data["springEndDate"];
const fallEndDate: { [key: string]: string } = data["fallEndDate"];

const springABCEndDate: string = data["springABCEndDate"];
const fallABCEndDate: string = data["fallABCEndDate"];

const springAHolidays: string[] = data["springAHolidays"];
const springBHolidays: string[] = data["springBHolidays"];
const springCHolidays: string[] = data["springCHolidays"];
const fallAHolidays: string[] = data["fallAHolidays"];
const fallBHolidays: string[] = data["fallBHolidays"];
const fallCHolidays: string[] = data["fallCHolidays"];

const springABCHolidays: string[] = data["springABCHolidays"];
const fallABCHolidays: string[] = data["fallABCHolidays"];

const rescheduledDateList: string[] = data["rescheduledDateList"];
const rescheduledClassList: string[] = data["rescheduledClassList"];

const deadlinesDate: string[] = data["deadlinesDate"];

const engWeekday: { [key: string]: string } = {
  月: "MO",
  火: "TU",
  水: "WE",
  木: "TH",
  金: "FR",
  土: "SA",
};

const weekdayList: string[] = ["月", "火", "水", "木", "金", "土"];

//the head element(0) is a dummy
const classBeginPeriod: string[] = [
  "0",
  "084000",
  "101000",
  "121500",
  "134500",
  "151500",
  "164500",
  "182000",
  "194500",
];
const classEndPeriod: string[] = [
  "0",
  "095500",
  "112500",
  "133000",
  "150000",
  "163000",
  "180000",
  "193500",
  "210000",
];

const deadlinesDetail: string[] = [
  "春A事前登録締め切り日",
  "春A履修登録締切日",
  "春B事前登録締め切り日",
  "春A期末試験",
  "春B履修登録締切日",
  "春C事前登録締め切り日",
  "春C履修登録締切日",
  "秋A事前登録締め切り日",
  "秋A履修登録締切日",
  "秋B事前登録締め切り日",
  "秋A期末試験",
  "秋B履修登録締切日",
  "秋C事前登録締め切り日",
  "秋C履修登録締切日",
];

//time stamp is supposed to be a date several days before the date of the first class
const timeStamp: string = data["timeStamp"];

const createDateFormat = (
  DTSTART: string,
  beginDate: string,
  beginPeriod: string,
  DTEND: string,
  endPeriod: string
): string => {
  return "".concat(
    DTSTART,
    beginDate,
    "T",
    beginPeriod,
    "\n",
    DTEND,
    beginDate,
    "T",
    endPeriod,
    "\n"
  );
};

const isAvailableModule = (module: string): boolean => {
  return !(module.indexOf("春") === -1 && module.indexOf("秋") === -1);
};

const isAvaibaleDay = (period: string): boolean => {
  //There's no Sunday class in the year
  return weekdayList.includes(period.slice(0, 1));
};

const getModulePeriodList = (
  moduleList: string[][],
  periodList: string[][]
): string[][] => {
  let modulePeriodList: string[][] = [];
  let tmpList: string[] = [];

  if (moduleList.length === 1 && periodList.length > 1) {
    for (let i: number = 0; i < periodList.length; i++) {
      tmpList = tmpList.concat(periodList[i]);
    }
    periodList = [tmpList];
  }
  for (let i: number = 0; i < moduleList.length; i++) {
    for (let j: number = 0; j < moduleList[i].length; j++) {
      for (let k: number = 0; k < periodList[i].length; k++) {
        modulePeriodList.push([moduleList[i][j], periodList[i][k]]);
      }
    }
  }
  return modulePeriodList;
};

const getSpan = (module: string, period: string): string => {
  let beginDate: string = "";
  const DTSTART: string = "DTSTART;TZID=Asia/Tokyo:";
  const DTEND: string = "DTEND;TZID=Asia/Tokyo:";

  //Get the start and end date of the module
  if (module[0] === "春") {
    switch (module[1]) {
      case "A":
        beginDate = beginSpringA[period[0]];
        break;

      case "B":
        beginDate = beginSpringB[period[0]];
        break;

      case "C":
        beginDate = beginSpringC[period[0]];
        break;
    }
  } else {
    switch (module[1]) {
      case "A":
        beginDate = beginFallA[period[0]];
        break;

      case "B":
        beginDate = beginFallB[period[0]];
        break;

      case "C":
        beginDate = beginFallC[period[0]];
        break;
    }
  }

  //Get the start and end time of the course
  const beginPeriod: string = classBeginPeriod[parseInt(period.slice(1, 2))];
  const endPeriod: string = classEndPeriod[parseInt(period.slice(-1))];

  return createDateFormat(DTSTART, beginDate, beginPeriod, DTEND, endPeriod);
};

const addReschedule = (index: number, period: string): string => {
  const beginDate: string = rescheduledDateList[index];
  const DTSTART: string = "DTSTART;TZID=Asia/Tokyo:";
  const DTEND: string = "DTEND;TZID=Asia/Tokyo:";

  //Get the start and end time of the course
  const beginPeriod: string = classBeginPeriod[parseInt(period.slice(1, 2))];
  const endPeriod: string = classEndPeriod[parseInt(period.slice(-1))];

  return createDateFormat(DTSTART, beginDate, beginPeriod, DTEND, endPeriod);
};

const getRepeat = (module: string, period: string): string => {
  let rrule: string = "RRULE:FREQ=WEEKLY;UNTIL=";
  let exdate: string;

  rrule +=
    module[0] === "春"
      ? springEndDate[module.slice(-1)]
      : fallEndDate[module.slice(-1)];

  rrule += "BYDAY=" + engWeekday[period[0]] + "\n";
  exdate = removeHolidays(module, period);
  return rrule + exdate;
};

//For ABC module class
const getABCRepeat = (module: string, period: string): string => {
  let rrule: string = "RRULE:FREQ=WEEKLY;UNTIL=";
  let exdate: string;

  rrule += module[0] === "春" ? springABCEndDate : fallABCEndDate;

  rrule += "BYDAY=" + engWeekday[period[0]] + "\n";
  exdate = removeABCHolidays(module, period);
  return rrule + exdate;
};

const getMisc = (name: string, classroom: string, desc: string): string => {
  const dtstamp: string = "DTSTAMP:" + timeStamp;
  const created: string = "CREATED:" + timeStamp;
  const description: string = "DESCRIPTION:" + desc;
  const lastModified: string = "LAST-MODIFIED:" + timeStamp;
  const classroomLocation: string = "LOCATION:" + classroom;
  const sequence: string = "SEQUENCE:0";
  const confirmed: string = "STATUS:CONFIRMED";
  const summary: string = "SUMMARY:" + name;
  const transp: string = "TRANSP:OPAQUE";

  return [
    dtstamp,
    created,
    description,
    lastModified,
    classroomLocation,
    sequence,
    confirmed,
    summary,
    transp,
  ].join("\n");
};

const removeHolidays = (module: string, period: string): string => {
  let beginPeriod: string = classBeginPeriod[parseInt(period.slice(1, 2))];
  let holidaysList: string[] = [];
  let exdate: string = "EXDATE:";

  if (module[0] === "春") {
    for (let i: number = 1; i < module.length; i++) {
      if (module[i] === "A")
        holidaysList = holidaysList.concat(springAHolidays);
      else if (module[i] === "B")
        holidaysList = holidaysList.concat(springBHolidays);
      else if (module[i] === "C")
        holidaysList = holidaysList.concat(springCHolidays);
    }
  }

  if (module[0] === "秋") {
    for (let i: number = 1; i < module.length; i++) {
      if (module[i] === "A") holidaysList = holidaysList.concat(fallAHolidays);
      else if (module[i] === "B")
        holidaysList = holidaysList.concat(fallBHolidays);
      else if (module[i] === "C")
        holidaysList = holidaysList.concat(fallCHolidays);
    }
  }

  //Check if the list is blank
  if (!holidaysList.length) {
    return "";
  }

  for (let i: number = 0; i < holidaysList.length; i++) {
    exdate += holidaysList[i] + "T" + beginPeriod + ",";
  }

  return exdate + "\n";
};

//For ABC classes
const removeABCHolidays = (module: string, period: string): string => {
  let beginPeriod: string = classBeginPeriod[parseInt(period.slice(1, 2))];
  let holidaysList: string[];
  let exdate: string = "EXDATE:";

  holidaysList = module[0] === "春" ? springABCHolidays : fallABCHolidays;

  for (let i: number = 0; i < holidaysList.length; i++) {
    exdate += holidaysList[i] + "T" + beginPeriod + ",";
  }

  return exdate + "\n";
};

const addDeadlines = (): string => {
  let deadlinesList: string[] = [];
  let misc: string =
    "DTSTAMP:20220408T000000\nCREATED:20220408T000000\nSTATUS:CONFIRMED\nTRANSP:TRANSPARENT\n";
  let dtstart: string;
  let dtend: string;
  let nextDate: string;
  let summary: string;
  let icsEvent: string;
  for (let i: number = 0; i < deadlinesDate.length; i++) {
    dtstart = "DTSTART;VALUE=DATE:" + deadlinesDate[i] + "\n";
    nextDate = String(Number(deadlinesDate[i]) + 1);
    dtend = "DTEND;VALUE=DATE:" + nextDate + "\n";
    summary = "SUMMARY:" + deadlinesDetail[i] + "\n";
    icsEvent =
      "BEGIN:VEVENT\n" + dtstart + dtend + misc + summary + "END:VEVENT\n";
    deadlinesList.push(icsEvent);
  }
  return deadlinesList.join("");
};

export const parseCSV = (
  tmpidList: string[],
  kdb: any,
  ifDeadlinesIncluded: boolean,
  isFromKdbAlt: boolean
): string => {
  let output: string =
    "BEGIN:VCALENDAR\nPRODID:-//gam0022//TwinC 1.0//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:授業時間割\nX-WR-TIMEZONE:Asia/Tokyo\nX-WR-CALDESC:授業時間割\nBEGIN:VTIMEZONE\nTZID:Asia/Tokyo\nX-LIC-LOCATION:Asia/Tokyo\nBEGIN:STANDARD\nTZOFFSETFROM:+0900\nTZOFFSETTO:+0900\nTZNAME:JST\nDTSTART:19700102T000000\nEND:STANDARD\nEND:VTIMEZONE\n";
  let idList = tmpidList.filter(function (ele, pos) {
    return tmpidList.indexOf(ele) === pos;
  });

  idList = idList.map((x) => x.replace(/["]/g, ""));
  idList = idList.map((x) => x.replace(/\r/g, ""));

  const eventBegin: string = "BEGIN:VEVENT\n";
  const eventEnd: string = "\nEND:VEVENT\n";
  let courseList: any = [];
  let idListLength;

  if (isFromKdbAlt) {
    idListLength = idList.length;
  } else {
    idListLength = idList.length - 1;
  }

  //Search courses
  for (let i: number = 0; i < idListLength; i++) {
    try {
      courseList.push(kdb[idList[i]]);
    } catch (error) {
      //Do nothing
    }
  }

  for (let i: number = 0; i < courseList.length; i++) {
    const name: string = courseList[i].name;
    const moduleList: string[][] = courseList[i].module;
    const periodList: string[][] = courseList[i].period;
    const classroom: string = courseList[i].room;
    const description: string = courseList[i].description;
    const modulePeriodList: string[][] = getModulePeriodList(
      moduleList,
      periodList
    );
    let module: string;
    let period: string;
    let devidedModule: string;
    let devidedPeriod: string;
    let rescheduleIndex: number;

    for (let j: number = 0; j < modulePeriodList.length; j++) {
      module = modulePeriodList[j][0];
      period = modulePeriodList[j][1];
      let icsEvent: string = "";

      if (!isAvailableModule(module) || !isAvaibaleDay(period)) continue;

      if (module.slice(1) === "ABC") {
        icsEvent =
          getSpan(module, period) +
          getABCRepeat(module, period) +
          getMisc(name, classroom, description);
        output += eventBegin + icsEvent + eventEnd;
      } else {
        icsEvent =
          getSpan(module, period) +
          getRepeat(module, period) +
          getMisc(name, classroom, description);
        output += eventBegin + icsEvent + eventEnd;
      }
      for (let k: number = 1; k < module.length; k++) {
        devidedModule = module[0] + module[k];
        devidedPeriod = period[0];
        rescheduleIndex = rescheduledClassList.indexOf(
          devidedModule + ":" + devidedPeriod
        );
        if (rescheduleIndex !== -1) {
          icsEvent =
            addReschedule(rescheduleIndex, period) +
            getMisc(name, classroom, description);
          output += eventBegin + icsEvent + eventEnd;
        }
      }
    }
  }

  //Add register deadlines to the calendar if checked
  if (ifDeadlinesIncluded) {
    output += addDeadlines();
  }
  return output;
};
export default parseCSV;
