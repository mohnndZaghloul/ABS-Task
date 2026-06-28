export function generateJobPostingJsonLd(job: {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType: string;
  company: string;
  website: string;
  location: string;
  salary: { currency: string; value: number };
}) {
  const employmentTypeMap: Record<string, string> = {
    "Full-time": "FULL_TIME",
    "Part-time": "PART_TIME",
    Contract: "CONTRACTOR",
    Internship: "INTERN",
    Temporary: "TEMPORARY",
  };

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: employmentTypeMap[job.employmentType] ?? "OTHER",
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: job.website,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: job.salary.currency,
      value: {
        "@type": "QuantitativeValue",
        value: job.salary.value,
        unitText: "MONTH",
      },
    },
  };
}
