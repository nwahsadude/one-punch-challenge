import React, { PropsWithoutRef } from "react";

function LoadingSpinner({ loadingText = "Loading" }: PropsWithoutRef<{ loadingText?: string }>) {
  return (
    <div className="flex flex-col justify-center place-items-center pt-52">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-red-600 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
    >
      </div>
      <span className="text-xl">{loadingText}...</span>
    </div>
  );
}

export default LoadingSpinner;
