import React, { type PropsWithoutRef } from "react";
import ProgressBar from "~/components/progressBar";
import { api } from "~/utils/api";
import LoadingSpinner from "~/components/loadingSpinner";

function DailyProgress({
                         workouts
                       }: PropsWithoutRef<{ workouts: string[] }>) {

  const { data: workoutSessions } = api.workoutSession.getTodaySessions.useQuery();

  if (!workoutSessions) return (<LoadingSpinner loadingText={"Loading progress"} />);

  function getProgress(workoutType: string) {
    if (workoutSessions) {
      return workoutSessions.filter((session) => session.workoutType === workoutType)
        .reduce((acc: number, cur) => (acc + cur.amount), 0);

    }
    return 0;

  }

  return (
    <div>
      <h1 className="text-center text-2xl bg-gray-600 border-black border-b-2 py-2 text-white">Daily Progress</h1>

      <div className="px-4">

      {workouts.map(workout => (
        <div key={workout} className="border-black border-b-2 pt-2 pb-2">
          <h1 className="text-2xl text-center pb-1">{workout}</h1>
          {workoutSessions.length && <ProgressBar workout={workout} progress={getProgress(workout)} goal={100} />}

        </div>
      ))}
      </div>
    </div>
  );
}

export default DailyProgress;
