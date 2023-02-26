import React, { PropsWithoutRef } from "react";

function Progress({ workout, progress, goal }: PropsWithoutRef<{ workout: string, progress: number, goal: number }>) {

  const percentage = Math.floor((progress / goal) * 100);

  return (
    <div className="border-black border-b-2 pt-2 pb-2">
      <h1 className="text-2xl text-center">{workout}</h1>
      <div className="w-full bg-neutral-200">
        <div style={{ width: `${percentage}%` }} className="h-full bg-green-600">{percentage}%</div>
      </div>
    </div>
  );
}

export default Progress;
