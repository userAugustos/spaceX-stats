"use client"
import {Bar} from 'react-chartjs-2'
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {statsRes} from "@/types";
import {countLaunches} from "@/utils/countLaunches";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Lançamentos por ano',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export default function Stacked({ stats }: { stats: statsRes }) {
  const yearsArray: number[] = [];

  stats.rockets.forEach((data) =>
    data.date.forEach((obj) => {
      !yearsArray.includes(new Date(obj).getFullYear()) && yearsArray.push(new Date(obj).getFullYear())
    })
  );

  const launchesCount: Record<string, any> = countLaunches(stats.rockets, yearsArray)
  const falcon1Years = Object.keys(launchesCount[0]).filter((year) => year !== "name");
  const falcon9Years = Object.keys(launchesCount[1]).filter((year) => year !== "name");
  const falconHeavyYears = Object.keys(launchesCount[2]).filter((year) => year !== "name");

  const data = {
    labels: yearsArray,
    datasets: [
      {
        label: stats.rockets[0].name,
        data: falcon1Years.map(year => launchesCount[0][year]),
        backgroundColor: [
          'rgb(246,66,105)',
        ],
        borderWidth: 1,
      },
      {
        label: stats.rockets[1].name,
        data: falcon9Years.map(year => launchesCount[1][year]),
        backgroundColor: [
          'rgb(66,129,246)',
        ],
        borderWidth: 1,
      },
      {
        label: stats.rockets[2].name,
        data: falconHeavyYears.map(year => launchesCount[2][year]),
        backgroundColor: [
          'rgb(111,246,66)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-full w-full p-4 max-w-[720px] min-h-[400px] flex place-items-center">
      <Bar options={options} data={data} />
    </div>
  )
}
