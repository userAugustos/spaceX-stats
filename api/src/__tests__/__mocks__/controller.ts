import {LaunchesDefaultData} from "./launches";

export const listAllSuccessRes = {
  results: [LaunchesDefaultData],
  totalDocs: [LaunchesDefaultData].length,
  page: 1,
  totalPages: 10,
  hasNext: true,
  hasPrev: false,
}

export const listAllSuccessResNoResult = {
  results: [],
  totalDocs: [].length,
  page: 1,
  totalPages: 10,
  hasNext: true,
  hasPrev: false,
}
