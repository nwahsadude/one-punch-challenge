import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import DailyProgress from "~/components/dailyProgress";
import OthersProgress from "~/components/othersProgress";
import { useRouter } from "next/navigation";
import { Bangers } from "@next/font/google";
import Workouts from "~/components/workout/workouts";
import Image from "next/image";

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
    <>
      <div className="fixed h-screen w-screen overflow-hidden">
        <Image
          src={"/background.jpg"}
          alt={"Background image"}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className={`${bangers.className} relative`}>
        <div className="flex items-center justify-center justify-between gap-2 px-4 pb-2 pt-4">
          <h1 className="whitespace-nowrap text-4xl text-white">
            One Punch Challenge
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-center text-2xl text-white">
              {sessionData && (
                <span>Logged in as {sessionData.user?.name}</span>
              )}
            </p>
            <button
              className="whitespace-nowrap rounded bg-red-600 py-2 px-4 text-white transition-colors duration-200 hover:bg-red-700"
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
    </>
  );
}

export default HomePage;
