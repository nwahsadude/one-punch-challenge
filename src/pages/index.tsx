import React from "react";
import Workout from "~/components/workout";
import { api } from "~/utils/api";
import Progress from "~/components/progress";
import { signIn, signOut, useSession } from "next-auth/react";

function HomePage() {

  const workouts = ["Pushups", "Situps", "Squats", "Running"];

  const { data: workoutSessions } = api.workoutSession.getTodaySessions.useQuery();




  function getProgress(workoutType: string) {
    if (workoutSessions) {

      return workoutSessions.filter((session) => session.workoutType === workoutType)
        .reduce((acc: number, cur) => (acc + cur.amount), 0);
    } else {
      return 0
    }

  }

  return (
    <div className="h-screen flex justify-center bg-gray-600">
      <div className="flex w-1/2 flex-col align-middle">
        <h1 className="text-4xl text-center">One Punch Challenge</h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            Hello
          </p>
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
                  workouts.map(workout => (
                    <Progress key={workout} workout={workout} progress={getProgress(workout)} goal={100} />
                  ))
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
