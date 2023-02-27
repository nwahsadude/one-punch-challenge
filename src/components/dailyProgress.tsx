import React, { type PropsWithoutRef } from "react";
import ProgressBar from "~/components/progressBar";
import { type WorkoutSession } from ".prisma/client";

function DailyProgress({
                         workouts,
                         workoutSessions
                       }: PropsWithoutRef<{ workouts: string[], workoutSessions: WorkoutSession[] }>) {


  function getProgress(workoutType: string) {
      return workoutSessions.filter((session) => session.workoutType === workoutType)
        .reduce((acc: number, cur) => (acc + cur.amount), 0);

  }

  return (
    <div>
      <h1 className="text-center text-2xl">Daily Progress</h1>

      {workouts.map(workout => (
        <div key={workout} className="border-black border-b-2 pt-2 pb-2">
          <h1 className="text-2xl text-center">{workout}</h1>
          <ProgressBar workout={workout} progress={getProgress(workout)} goal={100} />
        </div>
      ))}
    </div>
  );
}

export default DailyProgress;
