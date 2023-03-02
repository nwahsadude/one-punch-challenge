import React, { useState } from "react";
import Workout from "~/components/workout";

const Workouts: React.FC = () => {
  const workouts = ["Pushups", "Situps", "Squats", "Running"];
  const [activeTab, setActiveTab] = useState("Pushups");

  const handleTabClick = (workoutType: string) => {
    setActiveTab(workoutType);
  };
  return (
    <div>
      <h1 className="border-b-2 border-black bg-gray-600 py-2 text-center text-2xl text-white">
        Workouts
      </h1>
      <ul className="flex justify-center text-center text-sm font-medium text-white">
        {workouts.map((workout) => {
          return (
            <li key={workout} className="mr-2">
                <span
                  onClick={() => handleTabClick(workout)}
                  className={` ${
                    workout === activeTab
                      ? "active bg-red-600"
                      : "bg-red-900"
                  } inline-block rounded-b-lg  px-3 py-2 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 `}
                >
                  {workout}
                </span>
            </li>
          );
        })}
      </ul>

      <div>
        <Workout workout={activeTab} />
      </div>
    </div>
  );
};

export default Workouts;
