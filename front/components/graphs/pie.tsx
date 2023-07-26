"use client"
import { Pie } from 'react-chartjs-2'
import {ArcElement, Chart, Tooltip, Legend} from "chart.js";
import {statsRes} from "@/types";

Chart.register(ArcElement, Tooltip, Legend)

export default function PieGraph({ stats }: { stats: statsRes }) {

  const data = {
    labels: stats.rockets.map(rocket => rocket.name),
    datasets: [
      {
        label: 'N de Lançamentos',
        data: stats.rockets.map(rocket => rocket.count),
        backgroundColor: [
          'rgb(246,66,105)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderColor: [
          'rgba(246,66,105)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-full w-full p-4 max-w-[620px]">
      <Pie data={data} options={{
        responsive: true,
        plugins: {
          subtitle: {
            display: true,
            position: "top",
            text: 'O status de alguns lançamentos é desconhecido!'
          },
          legend: {
            position: "left"
          },
          title: {
            position: 'top',
            align: 'center',
            display: true,
            text: 'Lançamentos de Foguetes',
            font: {
              size: 26
            },
          }
        }
      }}/>
      <section className="launches flex flex-wrap p-1 w-full justify-between font-bold">
        <p>Total: {stats.total}</p>
        <p>Sucesso: <span className="text-green-400">{stats.success}</span></p>
        <p>Falhas: <span className="text-red-500">{stats.fails}</span> </p>
      </section>
    </div>
  )
}
