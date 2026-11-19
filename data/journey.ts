export type Step = { when: string; title: string; detail: string; status: "done" | "current" };

// Listed by status, not by date.
export const journey: Step[] = [
  { when: "Completed", title: "Harvard CS50P", detail: "Introduction to Programming with Python.", status: "done" },
  { when: "In progress", title: "Harvard CS50x", detail: "Strengthening my computer science fundamentals.", status: "current" },
  { when: "Ongoing", title: "Building foundations", detail: "Programming and computer science, in my first year of the BS Computer Science program.", status: "current" },
];

export const affiliations = [
  { label: "Education", title: "BS Computer Science", detail: "Technological University of the Philippines – Manila · First year" },
  { label: "Community", title: "Google Developer Groups on Campus", detail: "TUP Manila · Member" },
];
