import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import DailyProgress from "~/components/dailyProgress";
import OthersProgress from "~/components/othersProgress";
import { useRouter } from "next/navigation";
import { Bangers } from "@next/font/google";
import Workouts from "~/components/workout/workouts";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

function HomePage() {
  const workouts = ["Pushups", "Situps", "Squats", "Running"];

  const { data: sessionData, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/welcome");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStatus]);

  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(/background.jpg)",
      }}
    >
      <div className={bangers.className}>
        <div className="flex items-center justify-center justify-between gap-2 pb-2 px-4 pt-4">
          <h1 className="text-4xl text-white whitespace-nowrap">
            One Punch Challenge
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-center text-2xl text-white">
              {sessionData && (
                <span>Logged in as {sessionData.user?.name}</span>
              )}
            </p>
            <button
              className="rounded bg-red-600 py-2 px-4 text-white transition-colors duration-200 hover:bg-red-700 whitespace-nowrap"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-wrap px-4 md:flex-row md:justify-center">
          <div className="flex-1 border bg-gray-700">
            <Workouts />
          </div>
          <div className="flex-1 border bg-gray-700">
            <div>{<DailyProgress workouts={workouts}></DailyProgress>}</div>
          </div>
          <div className="flex-1 border bg-gray-700">
            <OthersProgress />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
