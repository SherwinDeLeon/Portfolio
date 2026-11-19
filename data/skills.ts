export type Course = { name: string; detail: string; status: "completed" | "in-progress" };

export const languages: string[] = ["Python", "C"];

export const courses: Course[] = [
  { name: "Harvard CS50P", detail: "Introduction to Programming with Python", status: "completed" },
  { name: "Harvard CS50x", detail: "Introduction to Computer Science", status: "in-progress" },
];
