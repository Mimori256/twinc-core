export type BeginSpringSchedule = {
  月: string;
  火: string;
  水: string;
  木: string;
  金: string;
  土: string;
};

export type BeginFallSchedule = {
  月: string;
  火: string;
  水: string;
  木: string;
  金: string;
  土: string;
};

export type SpringEndDate = {
  A: string;
  B: string;
  C: string;
};

export type FallEndDate = {
  A: string;
  B: string;
  C: string;
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
