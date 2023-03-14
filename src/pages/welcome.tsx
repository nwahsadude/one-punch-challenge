import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Bangers } from "@next/font/google";
import { useRouter } from "next/navigation";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

function WelcomePage() {
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStatus]);

  return (
    <div
      className={bangers.className}
      style={{
        backgroundImage: "url(/background.jpg)",
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex h-screen items-center justify-center">
        <div className="h-auto w-1/2 rounded-lg bg-gray-700 p-10 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-wider text-white">
            Welcome to the Greatest Workout Routine in the World!
          </h2>
          <p className="mb-6 tracking-wider text-white">
            100 situps, pushups, and squats followed by a 6.2-mile (10-km) run.
            Set your goal of a percentage of the total workout and work your way
            up to developing the strength to defeat any thing with a single
            punch.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="rounded-md bg-blue-600 py-2 px-4 text-white shadow-md transition duration-200 hover:bg-blue-700"
              onClick={() => void signIn("discord")}
            >
              Login with Discord
            </button>
            <button
              className="rounded-md bg-red-600 py-2 px-4 text-white shadow-md transition duration-200 hover:bg-red-700"
              onClick={() => void signIn("google")}
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
