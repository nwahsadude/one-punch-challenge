import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function UserAccountDropdown() {
  const { data: sessionData } = useSession();
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();
  const handleEscape = (e: KeyboardEvent) => {
    console.log(e);
    if (e.key === "Esc" || e.key === "Escape") {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: "/welcome" });
    router.push("/welcome");
  };

  return (
    <div className="relative">
      <button
        className={`text-xl text-white transition duration-100 ease-linear hover:scale-110 ${
          isOpened ? "scale-110" : ""
        }`}
        onClick={() => setIsOpened((prevState) => !prevState)}
      >
        <span className="">{sessionData?.user.name}</span>
      </button>
      {isOpened && (
        <button
          className="fixed inset-0 h-full w-full cursor-default"
          onClick={() => setIsOpened(false)}
        ></button>
      )}
      {isOpened && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-xl">
          <p className="block border-b-4 px-4 py-2 text-gray-800">
            Signed in as {sessionData?.user.name}
          </p>
          <a
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            onClick={void handleSignOut}
          >
            Sign Out
          </a>
        </div>
      )}
    </div>
  );
}

export default UserAccountDropdown;
