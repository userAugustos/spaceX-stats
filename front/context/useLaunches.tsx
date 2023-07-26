"use client"
import {createContext, ReactElement, ReactNode, useContext, useReducer} from "react";
import {Launch, listLaunches} from "@/types";

interface LaunchesContextType {
  searchTerm: string;
  setSearchValue: (value: string) => void
  data: listLaunches,
  setData: (data: listLaunches) => void;
  currentPage: number,
  previousPage: () => void;
  nextPage: () => void;
  limit: number,
  setLimit: (value: number) => void;
  setPage: (value: number) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

type LaunchesState = {
  searchTerm: string;
  data: listLaunches;
  currentPage: number;
  limit: number;
  isLoading: boolean;
};

const launchesReducer = (state: LaunchesState, action: { type: string; payload: any; }) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_LIMIT':
      return { ...state, limit: action.payload };
    case 'SET_ISLOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state;
  }
};

export const LaunchesContext = createContext<LaunchesContextType>({
  searchTerm: "",
  setSearchValue: (value: string) => {},
  data: {} as any,
  setData: (launches: listLaunches) => {},
  currentPage: 1,
  previousPage: () => {},
  nextPage: () => {},
  limit: 4,
  setLimit: (value: number) => {},
  setPage: () => {},
  isLoading: false,
  setIsLoading: (value: boolean) => {}
})

export function UseLaunchesContextProvider({ children }: { children: ReactElement | Array<ReactElement> | ReactNode }) {
  const [state, dispatch] = useReducer(launchesReducer, {
    searchTerm: "",
    data:{},
    currentPage: 1,
    limit: 4,
    isLoading: false
  });
  const { searchTerm, data, currentPage, limit, isLoading } = state

  const setSearchValue = (value: string) => {
    console.debug('dispatched')
    dispatch({ type: 'SET_SEARCH_TERM', payload: value })
  }

  const setData = (data: listLaunches) => {
    dispatch({ type: 'SET_DATA', payload: data })
    dispatch({ type: 'SET_LIMIT', payload: data.limit })
    dispatch({ type: 'SET_CURRENT_PAGE', payload: data.page })
  }

  const previousPage = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })
  }

  const nextPage = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })
  }

  const setLimit = (value: number) => {
    dispatch({ type: 'SET_LIMIT', payload: value })
  }

  const setPage = (page: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page })
  }

  const setIsLoading = (value: boolean) => {
    dispatch({ type: 'SET_ISLOADING', payload: value })
  }

  return <LaunchesContext.Provider value={{ searchTerm, data, limit, currentPage, setSearchValue, setData, previousPage, nextPage, setLimit, setIsLoading, isLoading, setPage }}>{children}</LaunchesContext.Provider>
}


export const useLaunchesContext = () => useContext(LaunchesContext);
