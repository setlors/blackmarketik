import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";

interface Job {
  id: string;
  name: string;
  pay: number;
}

export default function Contracts() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/contracts")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {jobs.map((job) => {
          return (
            <div
              key={job.id}
              className="rounded-lg border border-pink-hot/20 bg-card-dark/70 p-3"
            >
              <h2 className="mb-2 text-lg font-bold text-text-light">
                {job.name}
              </h2>
              <div className="flex items-center gap-1 text-pink-light">
                <span>Pay:</span>
                <DollarSign size={20} />
                <span>{job.pay}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
