import {Launch} from "@/types";
import Item from "@/components/list/item/item";

export function ItemsTable({ launches }: { launches: Launch[] }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full">
      <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <section className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-bold hidden sm:flex">
          <p className="px-6 py-3 w-[14.2%]">
            N° de Voo
          </p>
          <p className="px-6 py-3 w-[14.2%]">
            Logo
          </p>
          <p className="px-6 py-3 w-[14.2%]">
            Nome da Missão
          </p>
          <p className="px-6 py-3 w-[14.2%]">
            Data
          </p>
          <p className="px-6 py-3 w-[14.2%]">
            Foguete
          </p>
          <p className="px-6 py-3 w-[14.2%]">
            Status
          </p>
          <p className="px-6 py-3 w-[14.2%]">
            Assista
          </p>
        </section>
        {
          launches.map(launch => (
            <Item launch={launch} key={launch.id}/>
          ))
        }
      </div>
    </div>

  )
}
