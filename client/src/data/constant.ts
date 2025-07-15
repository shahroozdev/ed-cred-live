// Color Variants for Rating Icons
export const colorVariants: Record<string, string> = {
  red: "text-red-400 fill-red-400 hover:fill-red-300",
  blue: "text-blue-400 fill-blue-400 hover:fill-blue-300",
  green: "text-green-400 fill-green-400 hover:fill-green-300",
  yellow: "text-yellow-400 fill-yellow-400 hover:fill-yellow-300",
};
export const colorScheme={
  Teacher:colorVariants['red'],
  "Staff Membars":colorVariants['red'],
  Leadership:colorVariants['green'],
  school:colorVariants['yellow'],
  district:colorVariants['yellow'],
}as any;
export const colors={
  Teacher:'red',
  Teachers:'red',
  "Staff Membars":'red',
  "School Staff Membars":'red',
  Leadership:'green',
  school:'yellow',
  schools:'yellow',
  district:'yellow',
  districts:'yellow',
}as any;
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
export const detailObjectsArray = [
  { name: "revieweeName", type: "text", placeholder: "Enter Reviewee name" },
  { name: "schoolName", type: "text", placeholder: "Enter school name" },
  {
    name: "country",
    type: "dropdown",
    placeholder: "Enter school country",
  },
  { name: "website", type: "text", placeholder: "Enter school website" },
  {
    name: "divison",
    type: "text",
    placeholder: "Enter principal division",
  },
  {
    name: "reportingPeriod",
    type: "date-range",
    placeholder: "Enter reporting period",
  },
] as any;

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

export const types = {
  all: ".jpg,.jpeg,.png,.mp4,.mov,.webm,.quicktime,.m4v,.M4V,.mp3,.audio/mpeg,.m4a,.x-m4a,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.MOV, application/vnd.ms-excel,application/vnd.ms-powerpoint,.ppt,.pptx,.PNG,.JPEG,.JPG,.xlxs,.xls,.csv,text/csv,.xlsx,",
  image: ".jpg,.jpeg,.png,.PNG,.JPEG,.JPG,",
  video: ".mp4,.webm,.mov,.quicktime,.MOV,.m4v,.M4V,",
  audio: ".mp3,.m4a,.x-m4a,.audio/mpeg,",
  doc: ".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,application/vnd.ms-powerpoint,.ppt,.pptx,.xls,.xlxs,.csv,text/csv,.xlsx,",
  docImg:
    ".jpg,.jpeg,.png,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,application/vnd.ms-powerpoint,.ppt,.xls,.xlxs,.csv,text/csv,.xlsx,.pptx,",
  comment:
    ".jpg,.jpeg,.png,.PNG,.JPEG,.JPG,.pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xls,.xlxs,.csv,text/csv,.xlsx,",
  pdfImg: ".jpg,.jpeg,.png,.pdf,",
  extensions:
    ".jpg, .jpeg, .png, .mp4, .webm, .mpeg, .mp3, .m4a, .mov, .pdf, .doc, .docx, .ppt, .pptx, .xlxs, .xls, .csv, .xlsx,",
  viewExtension:
    ".jpg,.jpeg,.png,.mp4,.webm,.m4v,.M4V,.mpeg,.mov,.mp3,.m4a,.pdf,.doc,.docx,.ppt,.pptx,.xlxs,.xls,.csv,.xlsx,",
  videoView: ".mp4,.webm,.mov,.m4v,.M4V,",
  imageView: ".jpg,.jpeg,.png,",
  audioView: ".mp3,.m4a,",
  docView: ".pdf,.doc,.docx,.ppt,.pptx,.xlxs,.xls,.csv,.xlsx,",
} as any;

export const oneDay = 24 * 60 * 60;

export const documentTypes=[{
    label:"Web Policy",
    value:"POLICY"},
    {
    label:"Terms of Service",
    value:"TOS"
    },
    {
    label:"Dispute Rules",
    value:"DISPUTE"
    },
    {
      label:"Response Rules",
      value:"RESPONSE",
    }
]