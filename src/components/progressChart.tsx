import React, { PropsWithoutRef } from "react";
import { api } from "~/utils/api";
import { VictoryBar, VictoryChart, VictoryGroup, VictoryTooltip } from "victory";

function ProgressChart({ workout }: PropsWithoutRef<{ workout: string }>) {

  const { data } = api.workoutSession.getOthersSessions.useQuery(workout);

  if (!data) return (<div>Loading...</div>);


  let chartData = [];

  const prepData = () => {
    chartData = data.reduce((acc, cur) => {
      const key = `${cur.dateTimeCreated.getDate()}-${cur.dateTimeCreated.getMonth()}-${cur.dateTimeCreated.getFullYear()}-${cur.userId}`;
      const userKey = `${cur.userId}`;

      if (!acc[userKey]) {
        acc[userKey] = {};
      }

      if (!acc[userKey][key]) {
        acc[userKey][key] = {
          name: cur.user.name,
          userId: cur.userId,
          totalAmount: 0,
          date: `${cur.dateTimeCreated.getDate()}-${cur.dateTimeCreated.getMonth()}-${cur.dateTimeCreated.getFullYear()}`,
          values: [],
          label: cur.user.name
        };
      }
      acc[userKey][key].totalAmount += cur.amount;
      acc[userKey][key].values.push(cur.amount);
      return acc;
    }, {} );
  };

  prepData();


  return (
    <div>
      <VictoryChart>
        <VictoryGroup>

          {
            chartData &&
            Object.values(chartData).map((d) => {
              console.log(d);
              return (
                <VictoryBar labelComponent={<VictoryTooltip />} label={workout} key={d.name} data={Object.values(d)}
                            x={"date"} y={"totalAmount"} />);
            })

          }
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

export default ProgressChart;
