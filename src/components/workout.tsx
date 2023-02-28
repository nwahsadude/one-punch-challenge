import React, { type PropsWithoutRef, useState } from "react";
import { api } from "~/utils/api";
import { useStopwatch } from "react-timer-hook";

function Workout({ workout }: PropsWithoutRef<{ workout: string }>) {

  const { isRunning, start, pause, hours, minutes, seconds, reset } = useStopwatch({ autoStart: false });
  const { mutateAsync } = api.workoutSession.create.useMutation();
  const utils = api.useContext();

  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>();
  const [amount, setAmount] = useState("0");


  const handleStart = () => {
    setDateStart(new Date());
    start();
  };

  const handleStop = () => {
    setDateEnd(new Date());
    pause();
  };

  const handleReset = () => {
    reset(undefined, false);
    setDateStart(null);
    setDateEnd(null);
    setAmount("0");
  };


  const handleSubmit = () => {
    if (dateStart && dateEnd && amount) {
      void mutateAsync({
          amount: parseInt(amount),
          workoutType: workout,
          dateTimeEnd: dateEnd,
          dateTimeStart: dateStart
        },
        {
          onSuccess: () => {
            handleReset();
            void utils.workoutSession.getTodaySessions.invalidate();
            void utils.workoutSession.getOthersSessions.invalidate();
          }
        }
      );
    }
  };

  return (
    <div className="border-black border-b-2 pb-2">
      <h1 className="text-2xl text-center">{workout}</h1>
      <div className="flex flex-col place-items-center">
        <div className="w-full px-4">
          <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
          <input name="amount" id="amount" type="number"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-1.5" />
          <div className="pb-2"></div>
        </div>
        <div className="px-4 mb-2 text-xl">
          <span> Hours: {hours} </span><span>Minutes: {minutes} </span><span>Seconds: {seconds} </span>
        </div>
        <div className="flex w-full justify-between pl-4 pr-4">
          <button type="button"
                  disabled={isRunning}
                  onClick={dateStart && !isRunning ? handleReset : handleStart}
                  className="mr-2 w-full inline-block rounded bg-green-500 px-4 pt-2.5 pb-2 text-xs uppercase leading-normal text-white disabled:bg-green-900">{dateStart && !isRunning ? "Reset" : "Start"}
          </button>
          <button type="button"
                  disabled={!isRunning}
                  onClick={handleStop}
                  className="mr-2 w-full inline-block rounded bg-green-500 px-4 pt-2.5 pb-2 text-xs uppercase leading-normal text-white disabled:bg-green-900">stop
          </button>
          <button type="button"
                  disabled={parseInt(amount) < 1 || isRunning}
                  className="inline-block w-full rounded bg-green-500 px-4 pt-2.5 pb-2 text-xs uppercase leading-normal text-white disabled:bg-green-900"
                  onClick={handleSubmit}
          >Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Workout;
