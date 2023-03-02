import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Bangers } from "@next/font/google";
import { useRouter } from "next/navigation";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

function WelcomePage() {
  return (
    <div className={bangers.className}>
      <div className="h-screen bg-gray-600">
        <div className="flex flex-col items-center text-white tracking-wider">
          <h1>
            Welcome to the Greatest Workout Routine in the World!
          </h1>
          <p>100 situps, pushups, and squats followed by a 6.2-mile (10-km) run.</p>
          <p>
            Set your goal of a percentage of the total workout and work your way up
            to developing the strength to defeat any thing with a single punch.
          </p>
        </div>
        <AuthShowcase />
      </div>
    </div>
  );
}

export default WelcomePage;


const AuthShowcase: React.FC = () => {
  const { data: sessionData, status: sessionStatus  } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStatus]);


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
