"use client"
import {createContext, ReactElement, ReactNode, useContext, useEffect, useMemo, useReducer} from "react";
import {listLaunches} from "@/types";
import {getLaunches} from "@/utils/getLaunches";

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
  status: string | undefined;
  setStatus: (status: string) => void
}

type LaunchesState = {
  searchTerm: string;
  data: listLaunches;
  currentPage: number;
  limit: number;
  isLoading: boolean;
  status: string | undefined
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
    case 'SET_STATUS':
      return { ...state, status: action.payload }
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
  setIsLoading: (value: boolean) => {},
  status: undefined,
  setStatus: (status: string) => {}
})

export function UseLaunchesContextProvider({ children }: { children: ReactElement | Array<ReactElement> | ReactNode }) {
  const [state, dispatch] = useReducer(launchesReducer, {
    searchTerm: "",
    data:{},
    currentPage: 1,
    limit: 4,
    isLoading: false,
    status: undefined
  });
  const { searchTerm, data, currentPage, limit, isLoading } = state

  // update data
  useEffect(() => {
    try {
      setIsLoading(true)
      getLaunches(searchTerm, currentPage, limit).then(res => {
        setData(res)
        setIsLoading(false)
      })
    }catch (e) {
      console.debug(e)
      setIsLoading(false)
    }
  }, [searchTerm, currentPage, limit]);

  const setSearchValue = (value: string) => {
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

  const setStatus = (value: string) => {
    console.debug(value)
    dispatch({ type: 'SET_STATUS', payload: value })
    console.debug(status)
  }

  const memo = useMemo(() => ({ searchTerm, data, limit, currentPage,isLoading, status, setStatus, setSearchValue, setData, previousPage, nextPage, setLimit, setIsLoading, setPage }), [searchTerm, data, limit, currentPage,isLoading, status])

  return <LaunchesContext.Provider value={memo}>{children}</LaunchesContext.Provider>
}


export const useLaunchesContext = () => useContext(LaunchesContext);
