import jobs from "@/data/jobs.json";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { generateJobPostingJsonLd } from "@/lib/jsonld";

type Props_TP = {
  params: Promise<{
    slug: string;
  }>;
};

//metadata
export async function generateMetadata({
  params,
}: Props_TP): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((job) => job.slug === slug);
  if (!job) {
    return { title: "not founded product" };
  }

  return {
    title: `${job.title} | ${job.company}`,
    description: job.description,
    openGraph: {
      title: job.title,
      description: job.description,
      images: job.companyLogo,
      type: "website",
    },
  };
}

//SSG ==> static side generating
export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export default async function JobDetailsPage({ params }: Props_TP) {
  const { slug } = await params;
  const jobDetails = jobs.find((job) => job.slug === slug);
  if (!jobDetails) notFound();

  const jsonLd = generateJobPostingJsonLd(jobDetails);

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="container mx-auto py-8">
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-700">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 md:gap-4">
              <div>
                {jobDetails?.companyLogo ? (
                  <div className="relative overflow-hidden w-16 aspect-square rounded-2xl">
                    <Image
                      alt={jobDetails?.title}
                      src={jobDetails?.companyLogo}
                      fill
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-16 text-2xl flex justify-center items-center aspect-square rounded-2xl bg-emerald-500/20">
                    {jobDetails?.company[0]}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl md:text-4xl">{jobDetails?.title}</h3>
                <p className="text-emerald-500 text-sm">
                  {" "}
                  {jobDetails?.company}
                </p>
              </div>
            </div>
            <div>
              <p className="text-zinc-500 uppercase text-xs text-end">
                monthly salary
              </p>
              <p className="font-semibold md:text-2xl">
                {jobDetails?.salary.currency} {jobDetails?.salary.value}
              </p>
            </div>
          </div>
          <div className="flex gap-2 md:gap-5 mt-3 md:mt-5">
            <span className="px-5 py-1 text-sm bg-emerald-500/20 border-emerald-500 border rounded-2xl">
              {jobDetails?.employmentType}
            </span>
            <span className="px-5 py-1 text-sm bg-zinc-950/20 border-zinc-950 border rounded-2xl">
              {jobDetails?.location}
            </span>
            <span className="px-5 py-1 text-sm bg-zinc-950/20 border-zinc-950 border rounded-2xl">
              {jobDetails?.experience}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 my-2 md:my-4 gap-2 md:gap-4">
          <div className="block md:hidden col-span-3 md:col-span-1 bg-zinc-900 p-8 rounded-2xl border space-y-2 md:space-y-4 border-zinc-700">
            <p className="text-zinc-500 uppercase ">job details</p>
            <div>
              <p className="text-zinc-500 capitalize text-sm">posted</p>
              <p className="text-sm pt-1 md:text-lg font-semibold">
                {jobDetails?.datePosted}
              </p>
            </div>
            <div>
              <p className="text-zinc-500 capitalize text-sm">company</p>
              <p className="text-sm pt-1 md:text-lg font-semibold">
                {jobDetails?.company}
              </p>
            </div>
          </div>
          <div className="col-span-3 md:col-span-2 space-y-2 md:space-y-4">
            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-700">
              <h4 className="capitalize text-lg pb-4">about the role</h4>
              <p className="text-zinc-500">{jobDetails?.description}</p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-700 flex gap-2 md:gap-4">
              <button className="w-[70%] py-2 capitalize text-sm md:text-lg font-semibold cursor-pointer hover:bg-emerald-500/40 transition duration-200 bg-emerald-500/20 border-emerald-500 border rounded-xl ">
                apply now
              </button>
              <button className="w-[30%] py-2 capitalize text-sm md:text-lg font-semibold cursor-pointer hover:bg-zinc-500/40 transition duration-200 bg-zinc-500/20 border-zinc-500 border rounded-xl ">
                save
              </button>
            </div>
          </div>
          <div className="hidden md:block col-span-3 md:col-span-1 bg-zinc-900 p-8 rounded-2xl border space-y-2 md:space-y-4 border-zinc-700">
            <p className="text-zinc-500 uppercase ">job details</p>
            <div>
              <p className="text-zinc-500 capitalize text-sm">posted</p>
              <p className="text-sm pt-1 md:text-lg font-semibold">
                {jobDetails?.datePosted}
              </p>
            </div>
            <div>
              <p className="text-zinc-500 capitalize text-sm">company</p>
              <p className="text-sm pt-1 md:text-lg font-semibold">
                {jobDetails?.company}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
