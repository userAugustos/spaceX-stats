import Stacked from "@/components/graphs/stacked";
import Bar from "@/components/search/bar";
import List from "@/components/list/list";
import PieGraph from "@/components/graphs/pie";
import {statsRes} from "@/types";

// basically this is all we need now, of course isn't pretty, but since is simples and fast, i will keep it here
async function getData(): Promise<statsRes> {
  const res = await fetch('http://localhost:3030/launches/stats', { cache: 'force-cache' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export default async function Home() {
  const stats = await getData();

  return (
    <main className="md:p-12 flex flex-col">
      <div className='grid md:grid-cols-2 grid-cols-1 h-1/2 w-full'>
        <PieGraph
        stats={stats}
        ></PieGraph>
        <Stacked stats={stats}></Stacked>
      </div>
      <div className="h-full w-full max-w-[1280px] md:h-1/2 md:row-span-2 md:p-4 mt-1 self-center">
        <Bar></Bar>
        <List></List>
      </div>
    </main>
  )
}

