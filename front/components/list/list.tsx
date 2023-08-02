"use client"
import {useLaunchesContext} from "@/context/useLaunches";
import {Load } from "@/components/list/item/load";
import {ItemsTable} from "@/components/list/item/itemsTable";
import {Pagination} from "@/components/list/pagination";

export default function List() {
  const { data, isLoading } = useLaunchesContext();
  // const flowPages = GetDiffBetween(data.page, data.totalPages)

  return (
    <div className='flex flex-col justify-center items-center h-[550px] max-h-[800px] overflow-y-scroll bg-[#e2e1dd59] p-2 list-launches'>
      {
        isLoading && <div className='w-full'>
          <Load />
          <Load />
        </div>
      }
      {
        !isLoading && data.results?.length >= 1 ? (
            <>
              <ItemsTable launches={data.results} />
              <Pagination />
            </>
          )
          :
          <p>Aconteceu algum erro ao requisitar os dados</p>
      }

    </div>
  );
}
