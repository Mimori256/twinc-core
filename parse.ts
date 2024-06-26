import {
  classBeginPeriod,
  classEndPeriod,
  deadlinesDetail,
  engWeekday,
  weekdayList,
} from "./const/constData";
import data from "./data/schedule.json";
import { Course, Kdb } from "./types/Kdb";
import { ScheduleData } from "./types/scheduleData";

const scheduleData: ScheduleData = data;

//Global variables
const beginSpringA = scheduleData.beginSpringA;
const beginSpringB = scheduleData.beginSpringB;
const beginSpringC = scheduleData.beginSpringC;
const beginFallA = scheduleData.beginFallA;
const beginFallB = scheduleData.beginFallB;
const beginFallC = scheduleData.beginFallC;

const springEndDate = scheduleData.springEndDate;
const fallEndDate = scheduleData.fallEndDate;

const springABCEndDate = scheduleData.springABCEndDate;
const fallABCEndDate = scheduleData.fallABCEndDate;

const springAHolidays = scheduleData.springAHolidays;
const springBHolidays = scheduleData.springBHolidays;
const springCHolidays = scheduleData.springCHolidays;
const fallAHolidays = scheduleData.fallAHolidays;
const fallBHolidays = scheduleData.fallBHolidays;
const fallCHolidays = scheduleData.fallCHolidays;

const springABCHolidays = scheduleData.springABCHolidays;
const fallABCHolidays = scheduleData.fallABCHolidays;

const rescheduledDateList = scheduleData.rescheduledDateList;
const rescheduledClassList = scheduleData.rescheduledClassList;

const deadlinesDate = scheduleData.deadlinesDate;

//time stamp is supposed to be a date several days before the date of the first class
const timeStamp = scheduleData.timeStamp;

const createDateFormat = (
  DTSTART: string,
  beginDate: string,
  beginPeriod: string,
  DTEND: string,
  endPeriod: string,
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
    "\n",
  );
};

const isAvailableModule = (module: string): boolean => {
  return ["春", "秋"].some((season) => module.includes(season));
};

const isAvailableDay = (period: string): boolean => {
  //There's no Sunday class in the year
  return weekdayList.includes(period.slice(0, 1));
};

const getModulePeriodList = (
  moduleList: string[][],
  periodList: string[][],
): string[][] => {
  const modulePeriodList: string[][] = [];
  let tmpList: string[] = [];
  let newPeriodList: string[][];

  if (moduleList.length === 1 && periodList.length > 1) {
    for (let i = 0; i < periodList.length; i++) {
      tmpList = tmpList.concat(periodList[i]);
    }
    newPeriodList = [tmpList];
  } else {
    newPeriodList = periodList;
  }

  for (let i = 0; i < moduleList.length; i++) {
    for (let j = 0; j < moduleList[i].length; j++) {
      for (let k = 0; k < newPeriodList[i].length; k++) {
        modulePeriodList.push([moduleList[i][j], newPeriodList[i][k]]);
      }
    }
  }
  return modulePeriodList;
};

const getSpan = (module: string, period: string): string => {
  let beginDate = "";
  const DTSTART = "DTSTART;TZID=Asia/Tokyo:";
  const DTEND = "DTEND;TZID=Asia/Tokyo:";

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
  const DTSTART = "DTSTART;TZID=Asia/Tokyo:";
  const DTEND = "DTEND;TZID=Asia/Tokyo:";

  //Get the start and end time of the course
  const beginPeriod: string = classBeginPeriod[parseInt(period.slice(1, 2))];
  const endPeriod: string = classEndPeriod[parseInt(period.slice(-1))];

  return createDateFormat(DTSTART, beginDate, beginPeriod, DTEND, endPeriod);
};

const getRepeat = (module: string, period: string): string => {
  let rrule = "RRULE:FREQ=WEEKLY;UNTIL=";
  const exdate = removeHolidays(module, period);

  rrule +=
    module[0] === "春"
      ? springEndDate[module.slice(-1)]
      : fallEndDate[module.slice(-1)];

  rrule += `BYDAY=${engWeekday[period[0]]}\n`;
  return rrule + exdate;
};

//For ABC module class
const getABCRepeat = (module: string, period: string): string => {
  let rrule = "RRULE:FREQ=WEEKLY;UNTIL=";
  const exdate = removeABCHolidays(module, period);

  rrule += module[0] === "春" ? springABCEndDate : fallABCEndDate;

  rrule += `BYDAY=${engWeekday[period[0]]}\n`;
  return rrule + exdate;
};

const getMisc = (name: string, classroom: string, desc: string): string => {
  const dtstamp = `DTSTAMP:${timeStamp}`;
  const created = `CREATED:${timeStamp}`;
  const description = `DESCRIPTION:${desc}`;
  const lastModified = `LAST-MODIFIED:${timeStamp}`;
  const classroomLocation = `LOCATION:${classroom}`;
  const sequence = "SEQUENCE:0";
  const confirmed = "STATUS:CONFIRMED";
  const summary = `SUMMARY:${name}`;
  const transp = "TRANSP:OPAQUE";

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
  const beginPeriod: string = classBeginPeriod[parseInt(period.slice(1, 2))];
  let holidaysList: string[] = [];
  let exdate = "EXDATE:";

  if (module[0] === "春") {
    for (let i = 1; i < module.length; i++) {
      if (module[i] === "A")
        holidaysList = holidaysList.concat(springAHolidays);
      else if (module[i] === "B")
        holidaysList = holidaysList.concat(springBHolidays);
      else if (module[i] === "C")
        holidaysList = holidaysList.concat(springCHolidays);
    }
  }

  if (module[0] === "秋") {
    for (let i = 1; i < module.length; i++) {
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

  for (let i = 0; i < holidaysList.length; i++) {
    exdate += `${holidaysList[i]}T${beginPeriod},`;
  }

  return `${exdate}\n`;
};

//For ABC classes
const removeABCHolidays = (module: string, period: string): string => {
  const beginPeriod: string = classBeginPeriod[parseInt(period.slice(1, 2))];
  const holidaysList = module[0] === "春" ? springABCHolidays : fallABCHolidays;
  let exdate = "EXDATE:";

  for (const holiday of holidaysList) {
    exdate += `${holiday}T${beginPeriod},`;
  }

  return `${exdate}\n`;
};

const addDeadlines = (): string => {
  const deadlinesList: string[] = [];
  const misc =
    "DTSTAMP:20220408T000000\nCREATED:20220408T000000\nSTATUS:CONFIRMED\nTRANSP:TRANSPARENT\n";
  let dtstart: string;
  let dtend: string;
  let nextDate: string;
  let summary: string;
  let icsEvent: string;
  for (const deadline of deadlinesDate) {
    dtstart = `DTSTART;VALUE=DATE:${deadline}\n`;
    nextDate = String(Number(deadline) + 1);
    dtend = `DTEND;VALUE=DATE:${nextDate}\n`;
    summary = `SUMMARY:${deadlinesDetail[deadlinesDate.indexOf(deadline)]}\n`;
    icsEvent = `BEGIN:VEVENT\n${dtstart}${dtend}${misc}${summary}END:VEVENT\n`;
    deadlinesList.push(icsEvent);
  }
  return deadlinesList.join("");
};

export const parseCSV = (
  tmpidList: string[],
  kdb: Kdb,
  ifDeadlinesIncluded: boolean,
  isFromKdbAlt: boolean,
): string => {
  let output =
    "BEGIN:VCALENDAR\nPRODID:-//gam0022//TwinC 1.0//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:授業時間割\nX-WR-TIMEZONE:Asia/Tokyo\nX-WR-CALDESC:授業時間割\nBEGIN:VTIMEZONE\nTZID:Asia/Tokyo\nX-LIC-LOCATION:Asia/Tokyo\nBEGIN:STANDARD\nTZOFFSETFROM:+0900\nTZOFFSETTO:+0900\nTZNAME:JST\nDTSTART:19700102T000000\nEND:STANDARD\nEND:VTIMEZONE\n";
  let idList = tmpidList.filter((ele, pos) => tmpidList.indexOf(ele) === pos);

  idList = idList.map((x) => x.replace(/["]/g, ""));
  idList = idList.map((x) => x.replace(/\r/g, ""));

  const eventBegin = "BEGIN:VEVENT\n";
  const eventEnd = "\nEND:VEVENT\n";
  const courseList: Course[] = [];
  let idListLength: number;

  if (isFromKdbAlt) {
    idListLength = idList.length;
  } else {
    idListLength = idList.length - 1;
  }

  //Search courses
  for (let i = 0; i < idListLength; i++) {
    try {
      courseList.push(kdb[idList[i]]);
    } catch (error) {
      //Do nothing
    }
  }

  for (let i = 0; i < courseList.length; i++) {
    let name: string;
    let moduleList: string[][];
    let periodList: string[][];
    let classroom: string;
    let description: string;
    try {
      name = courseList[i].name;
      moduleList = courseList[i].module;
      periodList = courseList[i].period;
      classroom = courseList[i].room;
      description = courseList[i].description;
    } catch (error) {
      continue;
    }
    const modulePeriodList: string[][] = getModulePeriodList(
      moduleList,
      periodList,
    );
    let module: string;
    let period: string;
    let devidedModule: string;
    let devidedPeriod: string;

    for (let j = 0; j < modulePeriodList.length; j++) {
      module = modulePeriodList[j][0];
      period = modulePeriodList[j][1];
      let icsEvent = "";

      if (!isAvailableModule(module) || !isAvailableDay(period)) continue;

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
      for (let k = 1; k < module.length; k++) {
        devidedModule = module[0] + module[k];
        devidedPeriod = period[0];

        for (let i = 0; i < rescheduledClassList.length; i++) {
          if (rescheduledClassList[i] === `${devidedModule}:${devidedPeriod}`) {
            icsEvent =
              addReschedule(i, period) + getMisc(name, classroom, description);
            output += eventBegin + icsEvent + eventEnd;
          }
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
