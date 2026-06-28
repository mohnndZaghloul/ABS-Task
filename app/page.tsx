import jobs from "@/data/jobs.json";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container px-2 mx-auto">
      <section className="my-8 space-y-4 ">
        {jobs.map((job) => (
          <Link
            href={job.slug}
            key={job.id}
            className="rounded-xl border flex justify-between items-center p-5 bg-zinc-900 hover:bg-zinc-800 hover:-translate-1 hover:border-emerald-500 transition duration-200">
            <div>
              <h3 className="md:text-2xl font-semibold">{job.title}</h3>
              <span className="text-xs md:text-sm px-2 text-zinc-500">
                {job.company}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="bg-emerald-600/40 border text-xs md:text-sm border-emerald-300 px-4 py-1 rounded-full">
                  {job.employmentType}
                </p>
              </div>
              <div className="font-semibold md:text-xl">
                {job.salary.currency} {job.salary.value}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
