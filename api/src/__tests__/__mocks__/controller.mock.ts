import {LaunchesDefaultData, launchesStatsResult, launchStats} from "./launches.mock";

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

export const statsResult = {
  total: launchStats.total[0].total,
  success: launchStats.success[0].success,
  fails: launchStats.fails[0].fails,
  rockets: launchesStatsResult
}

export const refreshDataResult = {
  updated: true,
  data: [LaunchesDefaultData]
}
