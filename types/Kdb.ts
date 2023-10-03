type Course = {
  class_id: string;
  name: string;
  module: string[][];
  period: string[][];
  room: string;
  description: string;
};

type Kdb = {
  [key: string]: Course;
};

export type { Course, Kdb };
