import { validateSchedule } from "../types/scheduleSchema";
import scheduleData from "../data/schedule.json";

describe("validateSchedule", () => {
  it("should validate the schedule data", () => {
    const validateData = validateSchedule(scheduleData);
    expect(validateData).toEqual(scheduleData);
  });
});
