import React, { PropsWithoutRef } from "react";

function ProgressBar({ workout, progress, goal }: PropsWithoutRef<{ workout: string, progress: number, goal: number }>) {

  const percentage = Math.floor((progress / goal) * 100);

  return (

      <div className="w-full bg-neutral-200">
        <div style={{ width: `${percentage}%` }} className="h-full bg-green-600">{percentage}%</div>
      </div>
  );
}

export default ProgressBar;
