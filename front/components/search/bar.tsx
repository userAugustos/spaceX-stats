"use client"
import {useLaunchesContext} from "@/context/useLaunches";
import 'flowbite';
import {useState} from "react";

export default function Bar() {
  const { setSearchValue, setStatus } = useLaunchesContext();
  const [barStatus, setBarStatus] = useState<{ status: string, color: string } | undefined>(undefined)

  // could do it with debounce onChange input, but we have a search button...
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.debug(e.target.elements.search.value)
    console.debug(setSearchValue)

    setSearchValue(e.target.elements.search.value)
  }

  const handleResetLaunches = () => {
		setSearchValue('')
  }

  const handleSetStatus = (status: string, color: string) => {
    setStatus(status)
    setBarStatus({
      status,
      color
    })
  }

  return (
    <div>
      <form>
        <div className="flex">
          <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
          <button id="dropdown-button" data-dropdown-toggle="dropdown"
                  className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 ${barStatus && barStatus.color}`} type="button">{barStatus?.status ?? 'Status'} <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg></button>
          <div id="dropdown" className="z-10 hidden bg-[#f1f3f9] divide-y divide-gray-100 rounded-lg shadow w-24 dark:bg-gray-700 mt-[-0.3rem!important]">
            <ul className=" text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-green-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleSetStatus('Sucesso', 'bg-green-200')}
                >Sucesso</button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-red-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleSetStatus('Falha', 'bg-red-400')}
                >Falha</button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setBarStatus(undefined)}
                >Ambos</button>
              </li>
            </ul>
          </div>
          <div className="relative w-full">
            <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Procure por missão ou foguete" required />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSubmit}
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
              </button>
          </div>
        </div>
      </form>
    </div>
  );
}
