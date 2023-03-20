import React, { type PropsWithoutRef } from "react";

function ProgressBar({
  progress,
  goal,
}: PropsWithoutRef<{ workout: string; progress: number; goal: number }>) {
  const percentage = Math.floor((progress / goal) * 100);
  console.log(percentage)
  return (
    <div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        style={{ width: `${percentage}%` }}
        className="h-6 rounded-full bg-red-600 text-center font-medium text-red-100 dark:bg-red-700"
      >
        {percentage}%
      </div>
    </div>
  );
}

export default ProgressBar;
