import React, { type PropsWithoutRef } from "react";

function ProgressBar({ progress, goal }: PropsWithoutRef<{ workout: string, progress: number, goal: number }>) {

  const percentage = Math.floor((progress / goal) * 100);

  return (
      <div className="w-full bg-gray-200 rounded-full h-6 dark:bg-gray-700">
        <div style={{ width: `${percentage}%` }} className="h-6 bg-red-600 rounded-full dark:bg-red-700 text-center font-medium text-red-100">{percentage}%</div>
      </div>
  );
}

export default ProgressBar;
