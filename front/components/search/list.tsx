"use client"
import {useLaunchesContext} from "@/context/useLaunches";
import {GetDiffBetween} from "@/utils/getDiffBetween";
import {Load } from "@/components/load";
import {ItemsTable} from "@/components/search/itemsTable";

export default function List() {
  const { data, limit, currentPage, nextPage, previousPage, searchTerm, setData, isLoading, setIsLoading } = useLaunchesContext();
  const flowPages = GetDiffBetween(data.page, data.totalPages)

  return (
    <div className='flex flex-col justify-center items-center h-[550px] max-h-[800px] overflow-y-scroll bg-[#e2e1dd59] p-2 list-launches'>
      {
        isLoading && <div className='w-full'>
          <Load />
          <Load />
        </div>
      }
      {
        !isLoading && data.results?.length >= 1 ? <ItemsTable launches={data.results} />
          :
          <p>Aconteceu algum erro ao requisitar os dados</p>
      }
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
            Vendo <span className="font-semibold text-gray-900 dark:text-white">{data?.results?.length}</span> Lançamentos por página | <span className="font-semibold text-gray-900 dark:text-white"> { data.page } </span> de <span className="font-semibold text-gray-900 dark:text-white"> {data.totalPages} </span> Páginas
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button className="flex items-center justify-center px-4 h-10 mr-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => previousPage()}
                  disabled={!data.hasPrev}
          >
            <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
            </svg>
            Prev
          </button>
          <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => nextPage()}
                  disabled={!data.hasNext}
          >
            Next
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
