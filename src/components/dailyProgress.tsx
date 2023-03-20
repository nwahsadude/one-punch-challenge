import React, { type PropsWithoutRef } from "react";
import ProgressBar from "~/components/progressBar";
import { api } from "~/utils/api";
import LoadingSpinner from "~/components/loadingSpinner";

function DailyProgress({ workouts }: PropsWithoutRef<{ workouts: string[] }>) {
  const { data: workoutSessions } =
    api.workoutSession.getTodaySessions.useQuery();

  if (!workoutSessions)
    return <LoadingSpinner loadingText={"Loading progress"} />;

  function getProgress(workoutType: string) {
    if (workoutSessions) {
      return workoutSessions
        .filter((session) => session.workoutType === workoutType)
        .reduce((acc: number, cur) => acc + cur.amount, 0);
    }
    return 0;
  }

  return (
    <div>
      <h1 className="border-b-2 border-black bg-gray-600 py-2 text-center text-2xl text-white">
        Daily Progress
      </h1>

      <div className="px-4">
        {workouts.map((workout) => (
          <div key={workout} className="border-b-2 border-black pt-2 pb-2">
            <h1 className="pb-1 text-center text-2xl text-white">{workout}</h1>
            <ProgressBar
              workout={workout}
              progress={getProgress(workout)}
              goal={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyProgress;
