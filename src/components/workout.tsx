import React, { type PropsWithoutRef, useState } from "react";
import { api } from "~/utils/api";
import { useStopwatch } from "react-timer-hook";

function Workout({ workout }: PropsWithoutRef<{ workout: string }>) {

  const { isRunning, start, pause, hours, minutes, seconds, reset } = useStopwatch({ autoStart: false });
  const { mutateAsync } = api.workoutSession.create.useMutation();
  const utils = api.useContext();

  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>();
  const [amount, setAmount] = useState('0');



  const handleStart = () => {
    setDateStart(new Date());
    start();
  }

  const handleStop = () => {
    setDateEnd(new Date());
    pause();
  }


  const handleSubmit = () => {
    reset(undefined, false);

    if (dateStart && dateEnd) {
      void mutateAsync({
          amount: parseInt(amount),
          workoutType: workout,
          dateTimeEnd: dateEnd,
          dateTimeStart: dateStart
        },
        {
          onSuccess: () => {
            setDateStart(null);
            setDateEnd(null);
            setAmount('0')
            void utils.workoutSession.getTodaySessions.invalidate();
          }
        }
      );
    }
  };


  return (
    <div className="border-black border-b-2 pt-2 pb-2">
      <h1 className="text-2xl text-center">{workout}</h1>
      <div>
        <div>
          <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
          <input name="amount" id="amount" type="number"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" />
          <div className="pb-2"></div>
        </div>
        <div>
          <p>{isRunning ? "Running" : "Not Running"}</p>
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <button type="button"
                onClick={handleStart}
                className="inline-block rounded bg-green-500 px-4 pt-2.5 pb-2 text-xs uppercase leading-normal text-white">start
        </button>
        <button type="button"
                onClick={handleStop}
                className="inline-block rounded bg-green-500 px-4 pt-2.5 pb-2 text-xs uppercase leading-normal text-white">stop
        </button>
        <button type="button"
                disabled={parseInt(amount) < 1}
                className="inline-block rounded bg-green-500 px-4 pt-2.5 pb-2 text-xs uppercase leading-normal text-white disabled:bg-green-900"
                onClick={handleSubmit}
        >Submit
        </button>
      </div>
    </div>
  );
}

export default Workout;
