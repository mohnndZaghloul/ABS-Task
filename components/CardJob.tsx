import { Job_TP } from "@/types";
import Link from "next/link";

const CardJob = ({ job }: { job: Job_TP }) => {
  return (
    <Link
      href={job.slug}
      className="rounded-xl border flex justify-between items-center p-3 md:p-5 bg-zinc-900 hover:bg-zinc-800 hover:-translate-1 hover:border-emerald-500 transition duration-200">
      <div>
        <h3 className="md:text-2xl font-semibold max-w-full line-clamp-1">
          {job.title}
        </h3>
        <span className="text-xs md:text-sm px-2 text-zinc-500">
          {job.company}
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div>
          <p className="bg-emerald-600/40 text-nowrap border text-[0.75rem] md:text-sm border-emerald-300 px-4 py-1 rounded-full">
            {job.employmentType}
          </p>
        </div>
        <div className="font-semibold text-nowrap text-sm md:text-xl">
          {job.salary.currency} {job.salary.value}
        </div>
      </div>
    </Link>
  );
};

export default CardJob;
