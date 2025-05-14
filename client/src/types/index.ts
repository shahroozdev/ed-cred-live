export interface QueryProps {
  url: string;
  key: string;
}

export   const imagesUrls = {
    "Leadership Members": "leadership",
    Teachers: "Teachers",
    Schools: "schools",
    Districts: "districts",
    "Staff Members":"staff",
    "Parent":"parent",
    "Principal":"pricipal",
  }as any

  export interface CustomTableProps {
  data: any;
  columns: any;
  pagination?: boolean;
  title?: string;
  loading?: boolean;
}