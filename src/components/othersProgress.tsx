import React, { useState } from "react";
import { api } from "~/utils/api";
import ProgressChart from "~/components/progressChart";

function OthersProgress() {


  const workouts = ["Pushups", "Situps", "Squats", "Running"];

  const [activeTab, setActiveTab] = useState("Pushups");



  const handleTabClick = (workoutType: string) => {
    setActiveTab(workoutType);
  };

  return (
    <div>
      <h1 className="text-center text-2xl">Other&apos;s Weekly Progress</h1>
      <div>
        <ul
          className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {workouts.map(workout => {
            return (
              <li key={workout} className="mr-2">
                <span onClick={() => handleTabClick(workout)}
                      className={` ${workout === activeTab ? 'active dark:bg-gray-800 dark:text-blue-500' : ''} inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}>
                  {workout}
                </span>
              </li>
            );
          })}
        </ul>
        <div>
          <ProgressChart workout={activeTab}/>
        </div>
      </div>
    </div>
  );
}

export default OthersProgress;
