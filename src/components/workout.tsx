import React, { type PropsWithoutRef } from "react";
import { api } from "~/utils/api";

function Workout({ workout }: PropsWithoutRef<{ workout: string }>) {

  const { mutateAsync } = api.workoutSession.create.useMutation();
  const utils = api.useContext();
  const handleSubmit = async () => {

    await mutateAsync({
        amount: 5,
        workoutType: workout,
        dateTimeEnd: new Date(),
        dateTimeStart: new Date()
      },
      {
        onSuccess: () => {
          void utils.workoutSession.getTodaySessions.invalidate();
        }
      }
    );

  };

  return (
    <div className="border-black border-b-2 pt-2 pb-2">
      <h1 className="text-2xl text-center">{workout}</h1>
      <div>
        <div>
          <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
          <input name="amount" id="amount" type="number"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" />
          <div className="pb-2"></div>
        </div>
        <div>
          <p>Timer goes here 3.5min elapsed</p>
        </div>
        <button type="button"
                className="inline-block rounded bg-green-500 px-4 pt-2.5 pb-2 text-xs uppercase leading-normal text-white">start
        </button>
        <button type="button"
                className="inline-block rounded bg-green-500 px-4 pt-2.5 pb-2 text-xs uppercase leading-normal text-white">pause
        </button>
        <button type="button"
                className="inline-block rounded bg-green-500 px-4 pt-2.5 pb-2 text-xs uppercase leading-normal text-white">end
        </button>
        <button type="button"
                className="inline-block rounded bg-green-500 px-4 pt-2.5 pb-2 text-xs uppercase leading-normal text-white"
                onClick={handleSubmit}
        >Submit
        </button>
      </div>
    </div>
  );
}

export default Workout;
