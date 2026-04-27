import { useEffect, useRef, useState } from "react";
import { DollarSign } from "lucide-react";
import { BiQueue } from "../process/queue";

interface Job {
  id: string;
  name: string;
  pay: number;
  lockedTill: string;
}

export default function Contracts() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [, setBalance] = useState(0);
  const [usId, setUsId] = useState<string | null>(null);
  const sumQueue = useRef(new BiQueue());
  const isWorking = useRef(false);

  useEffect(() => {
    fetch("http://localhost:5000/contracts")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((users) => {
        if (users.length > 0) {
          setBalance(users[0].wallet);
          setUsId(users[0]._id || users[0].id);
        }
      });
  }, []);

  const proccesQ = async () => {
    if (isWorking.current === true) return;
    const goWork = sumQueue.current.dequeue("highest");
    if (!goWork) return;
    isWorking.current = true;

    setTimeout(async () => {
      if (usId) {
        await fetch(`http://localhost:5000/users/${usId}/pay`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: goWork.priority }),
        });
        setBalance((prev) => prev + goWork.priority);
        window.dispatchEvent(new Event("groshi"));
      }
      isWorking.current = false;
      proccesQ();
    }, 300000);
  };

  const start = async (job: Job) => {
    try {
      const response = await fetch(
        `http://localhost:5000/contracts/${job.id}/start`,
        {
          method: "POST",
        },
      );
      if (response.ok) {
        const updated = await response.json();
        setJobs((all) =>
          all.map((one) =>
            one.id === job.id
              ? { ...one, lockedTill: updated.lockedTill }
              : one,
          ),
        );
        sumQueue.current.enqueue(job.name, job.pay);
        proccesQ();
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

                <button
                  disabled={locked}
                  onClick={() => {
                    start(job);
                  }}
                >
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
