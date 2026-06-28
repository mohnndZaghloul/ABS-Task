import CardJob from "@/components/CardJob";
import jobs from "@/data/jobs.json";

export default function Home() {
  return (
    <main className="container px-2 mx-auto">
      <section className="my-8 space-y-4 ">
        {jobs.map((job) => (
          <CardJob key={job.id} job={job} />
        ))}
      </section>
    </main>
  );
}
