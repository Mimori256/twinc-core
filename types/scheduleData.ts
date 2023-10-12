export type BeginSpringSchedule = {
  [key: string]: string;
};

export type BeginFallSchedule = {
  [key: string]: string;
};

export type SpringEndDate = {
  [key: string]: string;
};

export type FallEndDate = {
  [key: string]: string;
};

export type SpringABCEndDate = string;
export type FallABCEndDate = string;

export type SpringAHolidays = string[];
export type SpringBHolidays = string[];
export type SpringCHolidays = string[];
export type FallAHolidays = string[];
export type FallBHolidays = string[];
export type FallCHolidays = string[];
export type SpringABCHolidays = string[];
export type FallABCHolidays = string[];
export type RescheduledDateList = string[];
export type RescheduledClassList = string[];
export type DeadlinesDate = string[];
export type timeStamp = string;

export interface ScheduleData {
  beginSpringA: BeginSpringSchedule;
  beginSpringB: BeginSpringSchedule;
  beginSpringC: BeginSpringSchedule;
  beginFallA: BeginFallSchedule;
  beginFallB: BeginFallSchedule;
  beginFallC: BeginFallSchedule;
  springEndDate: SpringEndDate;
  fallEndDate: FallEndDate;
  springABCEndDate: SpringABCEndDate;
  fallABCEndDate: FallABCEndDate;
  springAHolidays: SpringAHolidays;
  springBHolidays: SpringBHolidays;
  springCHolidays: SpringCHolidays;
  fallAHolidays: FallAHolidays;
  fallBHolidays: FallBHolidays;
  fallCHolidays: FallCHolidays;
  springABCHolidays: SpringABCHolidays;
  fallABCHolidays: FallABCHolidays;
  rescheduledDateList: RescheduledDateList;
  rescheduledClassList: RescheduledClassList;
  deadlinesDate: DeadlinesDate;
  timeStamp: string;
}
