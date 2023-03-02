import React, { useState } from "react";
import ProgressChart from "~/components/progressChart";

function OthersProgress() {
  const workouts = ["Pushups", "Situps", "Squats", "Running"];
  const [activeTab, setActiveTab] = useState("Pushups");

  const handleTabClick = (workoutType: string) => {
    setActiveTab(workoutType);
  };

  return (
    <div>
      <h1 className="border-b-2 border-black bg-gray-600 py-2 text-center text-2xl">
        Other&apos;s Weekly Progress
      </h1>
      <div>
        <ul className="flex justify-center border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
          {workouts.map((workout) => {
            return (
              <li key={workout} className="mr-2">
                <span
                  onClick={() => handleTabClick(workout)}
                  className={` ${
                    workout === activeTab
                      ? "active dark:bg-gray-800 dark:text-blue-500"
                      : ""
                  } inline-block rounded-b-lg bg-gray-100 px-3 py-2 text-blue-600 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
                >
                  {workout}
                </span>
              </li>
            );
          })}
        </ul>
        <div>
          <ProgressChart workout={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default OthersProgress;
