import React, { type PropsWithoutRef, useMemo } from "react";
import { api } from "~/utils/api";
import { type WorkoutSession } from ".prisma/client";
import LoadingSpinner from "~/components/loadingSpinner";
import dynamic from "next/dynamic";
import { type AxisOptions } from "react-charts";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});
interface DataPoint {
  name: string;
  amount: number;
  userId: string;
  date: string;
}

interface DataSeries {
  label: string;
  data: DataPoint[];
}

function ProgressChart({ workout }: PropsWithoutRef<{ workout: string }>) {
  const { data } = api.workoutSession.getOthersSessions.useQuery(workout);

  const primaryAxis = React.useMemo<AxisOptions<any>>(
    () => ({
      getValue: (datum: DataPoint) => datum.date,
      showGrid: false,
      innerBandPadding: 0.3,
      innerSeriesBandPadding: 0.05,
    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<any>[]>(() => {
    return [
      {
        getValue: (datum: DataPoint) => datum.amount,
        hardMin: 0,
        hardMax: 100,
        showGrid: false,
        elementType: "bar",
      },
    ];
  }, []);

  const prepData = (
    data: (WorkoutSession & { user: { name: string | null } })[]
  ) => {
    const users = [...new Set(data.map((d) => d.user.name))];

    return users.reduce<DataSeries[]>((dataseries, name) => {
      return [
        ...dataseries,
        {
          label: name ? name : "",
          data: data
            .filter((r) => r.user.name === name)
            .reduce<DataPoint[]>((acc, cur) => {
              const date = cur.dateTimeCreated.toLocaleDateString();
              const existingTotalAmount = acc.find(
                (total) => total.userId === cur.userId && total.date === date
              );

              if (existingTotalAmount) {
                existingTotalAmount.amount += cur.amount;
              } else {
                acc.push({
                  userId: cur.userId,
                  name: cur.user.name || "",
                  amount: cur.amount,
                  date: date,
                });
              }
              return acc;
            }, []),
        },
      ];
    }, []);
  };

  if (!data)
    return (
      <div className="pt-24">
        <LoadingSpinner />
      </div>
    );

  const chartData = prepData(data);

  return (
    <div className="block h-40 w-full pt-5">
      <Chart
        options={{
          data: chartData,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
}

export default ProgressChart;
