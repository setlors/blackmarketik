import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";

interface Job {
  id: string;
  name: string;
  pay: number;
  lockedTill: string;
}

export default function Contracts() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/contracts")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const start = async (idshka: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/contracts/${idshka}/start`,
        {
          method: "POST",
        },
      );
      if (response.ok) {
        const updated = await response.json();
        setJobs((all) =>
          all.map((one) =>
            one.id === idshka
              ? { ...one, lockedTill: updated.lockedTill }
              : one,
          ),
        );
      }
    } catch (error) {
      console.log("womp womp", error);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {jobs.map((job) => {
          const locked = new Date(job.lockedTill) > new Date();
          return (
            <div
              key={job.id}
              className="rounded-lg border border-pink-hot/20 bg-card-dark/70 p-4"
            >
              <h2 className="mb-2 text-lg font-bold text-text-light">
                {job.name}
              </h2>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-pink-light">
                  <span>Pay:</span>
                  <DollarSign size={20} />
                  <span>{job.pay}</span>
                </div>

                <button disabled={locked} onClick={() => start(job.id)}>
                  {locked ? "Locked" : "Go to work"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
