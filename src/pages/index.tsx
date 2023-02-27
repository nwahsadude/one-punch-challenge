import React from "react";
import Workout from "~/components/workout";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import DailyProgress from "~/components/dailyProgress";

function HomePage() {

  const workouts = ["Pushups", "Situps", "Squats", "Running"];

  const { data: workoutSessions } = api.workoutSession.getTodaySessions.useQuery();


  return (
    <div className="h-screen flex justify-center bg-gray-600">
      <div className="flex w-1/2 flex-col align-middle">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl text-center">One Punch Challenge</h1>
          <AuthShowcase />
        </div>
        {
          workoutSessions &&
          <div className="flex w-full">
            <div className="flex-1 border p-2">
              <div>
                {
                  workouts.map(workout => (
                    <Workout key={workout} workout={workout} />
                  ))
                }
              </div>
            </div>
            <div className="flex-1 border p-2">
              <div>
                {

                  workoutSessions.length &&
                  <DailyProgress workouts={workouts} workoutSessions={workoutSessions}></DailyProgress>
                }
              </div>
            </div>
            <div className="flex-1 border p-2"> others progress</div>
          </div>
        }

      </div>
    </div>
  );
}

export default HomePage;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
