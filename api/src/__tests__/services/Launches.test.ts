import {
  LaunchesDefaultData,
  launchesStatsResult, launchStats,
  listAllDataWithlookup,
  listAllDefaultData,
  rocketsArr, rocketStats
} from "../__mocks__/launches.mock";
import { statsResult } from '../__mocks__/controller.mock'
import {Launches} from "@services/Launches";
import {SpaceX} from "@services/spaceX";
import { launchesModel, rocketsModel} from "@database/models";

jest.mock('@database/models')

describe('Launches Service', () => {
  const launches = new Launches(launchesModel, rocketsModel)

  const getLaunchesSpy = jest.spyOn(SpaceX.prototype, 'getLaunches')
  const getRocketsSpy = jest.spyOn(SpaceX.prototype, 'getRockets')

  // models spy
  const rocketFindOneSpy = jest.spyOn(rocketsModel, 'findOne')
  const rocketCreateSpy = jest.spyOn(rocketsModel, 'create')

  const laucnhesAggregateFindSpy = jest.spyOn(launchesModel, 'aggregate');
  const launchFindOneSpy = jest.spyOn(launchesModel, 'findOne')
  const launchCreateSpy = jest.spyOn(launchesModel, 'create')

  afterEach(() => {
    // restore the spy created with spyOn
    // jest.restoreAllMocks();
  });

  it('Should add new data to the collection with the execution of create', async () => {
    // here findOne will not find a match document, so will add
    getLaunchesSpy.mockResolvedValueOnce(LaunchesDefaultData)
    getRocketsSpy.mockResolvedValueOnce(rocketsArr)
    rocketFindOneSpy.mockResolvedValueOnce(undefined)
    rocketCreateSpy.mockResolvedValueOnce([]) // doesn't know what create returns

    launchFindOneSpy.mockResolvedValueOnce(undefined)
    launchCreateSpy.mockResolvedValueOnce([])

    const res = await launches.add()

    expect(res.updated).toBe(true)
    expect(res.data).toEqual([rocketsArr[0], LaunchesDefaultData])
  })
  it('Should not add new data to the collection since find duplication', async () => {
    // here findOne will find a match document, so will not add duplicated
    getLaunchesSpy.mockResolvedValueOnce(LaunchesDefaultData)
    getRocketsSpy.mockResolvedValueOnce(rocketsArr)

    rocketFindOneSpy.mockResolvedValueOnce(rocketsArr[0])

    launchFindOneSpy.mockResolvedValueOnce(LaunchesDefaultData)

    const res = await launches.add()

    expect(res.updated).toBe(false)
  })
  it('Should throw new error when happens some error adding data', async () => {
    getLaunchesSpy.mockResolvedValueOnce(LaunchesDefaultData)
    getRocketsSpy.mockResolvedValueOnce(rocketsArr)

    rocketCreateSpy.mockRejectedValueOnce(new Error('Could not connect'))

    // expect(await launches.add()).rejects.toEqual(new Error('Could not connect'))
    try {
      await launches.add()
    }catch (e: any) {
      console.debug(e.message)
      expect(e).toEqual(new Error('Could not connect'))
    }
  })
  it('Should return data of list, organized with count, pages and results', async () => {
    laucnhesAggregateFindSpy.mockReturnValueOnce({ // from count
      count: jest.fn().mockReturnValueOnce([{
        project: 2
      }])
    } as any)
    laucnhesAggregateFindSpy.mockReturnValueOnce({
      skip: jest.fn().mockReturnValueOnce({
        limit: jest.fn().mockResolvedValueOnce(listAllDataWithlookup.results)
      })
    } as any) // isso é loucura.

    const res = await launches.list('falcon 1', 10, Number(listAllDefaultData.page))

    expect(res.results).toEqual(listAllDataWithlookup.results)
  })
  it('Should make query with success, but find none result', async () => {
    laucnhesAggregateFindSpy.mockReturnValueOnce({ // from count
      count: jest.fn().mockReturnValueOnce([{
        project: 0
      }])
    } as any)
    laucnhesAggregateFindSpy.mockReturnValueOnce({
      skip: jest.fn().mockReturnValueOnce({
        limit: jest.fn().mockResolvedValueOnce([])
      })
    } as any)

    const res = await launches.list()

    expect(res.results).toEqual([])
  })
  it('Should throw an error when fails to make the query', async () => {
    laucnhesAggregateFindSpy.mockReturnValueOnce({ // from count
      count: jest.fn().mockReturnValueOnce([{
        project: 2
      }])
    } as any)
    laucnhesAggregateFindSpy.mockReturnValueOnce({
      skip: jest.fn().mockReturnValueOnce({
          limit: jest.fn().mockRejectedValueOnce(new Error('Bad request') )
      })
    } as any)

      try {
        await launches.list('true')
      }catch (e: any) {
        console.debug(e.message)
        expect(e).toEqual(new Error('Bad request'))
      }
  })
  it('Should return stats data to fill in the graphs', async () => {
    laucnhesAggregateFindSpy.mockResolvedValueOnce([launchStats])
    laucnhesAggregateFindSpy.mockResolvedValueOnce(rocketStats)

    const res =  await launches.stats()

    expect(res).toEqual(launchesStatsResult)
  })
})
