export type Job_TP = {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo: string;
  website: string;
  location: string;
  employmentType: string;
  experience: string;
  datePosted: string;
  validThrough: string;
  description: string;
  salary: {
    currency: string;
    value: number;
  };
};
