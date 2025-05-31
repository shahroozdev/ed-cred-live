// Color Variants for Rating Icons
export const colorVariants: Record<string, string> = {
  red: "text-red-400 fill-red-400 hover:fill-red-300",
  blue: "text-blue-400 fill-blue-400 hover:fill-blue-300",
  green: "text-green-400 fill-green-400 hover:fill-green-300",
  yellow: "text-yellow-400 fill-yellow-400 hover:fill-yellow-300",
};

export const detailType = {
  schoolName: "text",
  schoolWebsite: "text",
  schoolCountry: "dropdown",
  reportingPeriod: "date-range",
  pricipalName: "text",
  pricipalDivison: "text",
  directorName: "text",
  salary: "number",
} as any;

export const detailHeading = {
  salary: "Salary",
  schoolName: "School Name",
  schoolWebsite: "School Website",
  schoolCountry: "School Country",
  reportingPeriod: "Reporting Period",
  pricipalName: "Principal Name",
  pricipalDivison: "Principal Division",
  directorName: "Director Name",
} as any;
