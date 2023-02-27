import React, { PropsWithoutRef } from "react";
import { api } from "~/utils/api";
import { VictoryBar, VictoryChart, VictoryGroup, VictoryTooltip } from "victory";
import { WorkoutSession } from ".prisma/client";

function ProgressChart({ workout }: PropsWithoutRef<{ workout: string }>) {

  const { data } = api.workoutSession.getOthersSessions.useQuery(workout);

  if (!data) return (<div>Loading...</div>);


  const prepData = (data: (WorkoutSession & { user: { name: string | null } })[]) => {

    return data.reduce((acc, cur) => {
      const date = cur.dateTimeCreated.toLocaleDateString();
      const existingTotalAmount = acc.find(total => total.userId === cur.userId && total.date === date);

      if (existingTotalAmount) {
        existingTotalAmount.totalAmount += cur.amount;
      } else {
        acc.push({
          userId: cur.userId,
          label: `${cur.user.name || ""} - ${cur.amount}`,
          user: cur.user.name || "",
          date: date,
          totalAmount: cur.amount
        });
      }

      return acc;
    }, [] as { userId: string, user: string, label: string, date: string, totalAmount: number }[]);

  };

  const chartData = prepData(data);

  return (
    <div>
      <VictoryChart>
        <VictoryGroup>

          {
            chartData &&
            chartData.map((d) => {
              return (
                <VictoryBar labelComponent={<VictoryTooltip />} key={d.user} data={chartData}
                            x={"date"} y={"totalAmount"} />);
            })

          }
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

export default ProgressChart;
