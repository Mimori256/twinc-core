import { z } from "zod";

// YYYYMMDD format
const dateRegex = /^\d{8}$/;

// YYYYMMDDTHHMMSSZ format
const dateTimeRegex = /^\d{8}T\d{6}Z;$/;

// weekday schema
const weekdaySchema = z.object({
  月: z.string().regex(dateRegex),
  火: z.string().regex(dateRegex),
  水: z.string().regex(dateRegex),
  木: z.string().regex(dateRegex),
  金: z.string().regex(dateRegex),
  土: z.string().regex(dateRegex),
});

const termEndDateSchema = z.object({
  A: z.string().regex(dateTimeRegex),
  B: z.string().regex(dateTimeRegex),
  C: z.string().regex(dateTimeRegex),
});

// rescheduled class format (example: "春A:火")
const rescheduledClassRegex = /^(春|秋)[ABC]:[月火水木金土]$/;

export const universityScheduleSchema = z
  .object({
    beginSpringA: weekdaySchema,
    beginSpringB: weekdaySchema,
    beginSpringC: weekdaySchema,

    beginFallA: weekdaySchema,
    beginFallB: weekdaySchema,
    beginFallC: weekdaySchema,

    springEndDate: termEndDateSchema,
    fallEndDate: termEndDateSchema,

    springABCEndDate: z.string().regex(dateTimeRegex),
    fallABCEndDate: z.string().regex(dateTimeRegex),

    springAHolidays: z.array(z.string().regex(dateRegex)),
    springBHolidays: z.array(z.string().regex(dateRegex)),
    springCHolidays: z.array(z.string().regex(dateRegex)),
    fallAHolidays: z.array(z.string().regex(dateRegex)),
    fallBHolidays: z.array(z.string().regex(dateRegex)),
    fallCHolidays: z.array(z.string().regex(dateRegex)),

    springABCHolidays: z.array(z.string().regex(dateRegex)),
    fallABCHolidays: z.array(z.string().regex(dateRegex)),

    rescheduledDateList: z.array(z.string().regex(dateRegex)),
    rescheduledClassList: z.array(z.string().regex(rescheduledClassRegex)),

    deadlinesDate: z.array(z.string().regex(dateRegex)),

    timeStamp: z.string().regex(/^\d{8}T\d{6}$/),
  })
  .refine(
    (data) =>
      data.rescheduledDateList.length === data.rescheduledClassList.length,
    {
      message:
        "The length of rescheduledDateList and rescheduledClassList must be the same",
      path: ["rescheduledDateList", "rescheduledClassList"],
    },
  )
  .refine((data) => data.deadlinesDate.length === 14, {
    message: "The length of deadlinesDate must be 14",
    path: ["deadlinesDate"],
  });

export const validateSchedule = (scheduleData: unknown) => {
  try {
    const validateData = universityScheduleSchema.parse(scheduleData);
    return validateData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
