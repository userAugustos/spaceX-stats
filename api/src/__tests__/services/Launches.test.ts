import {LaunchesDefaultData, listAllDefaultData, rocketsArr} from "../__mocks__/launches";
import {Launches} from "@services/Launches";
import {SpaceX} from "@useCase/spaceXUseCase";
import { launchesModel, rocketsModel} from "@database/models";

jest.mock('@database/models')

describe('Launches Service', () => {
  const launches = new Launches(launchesModel, rocketsModel)

  const getLaunchesSpy = jest.spyOn(SpaceX.prototype, 'getLaunches')
  const getRocketsSpy = jest.spyOn(SpaceX.prototype, 'getRockets')

  // models spy
  const rocketFindOneSpy = jest.spyOn(rocketsModel, 'findOne')
  const rocketCreateSpy = jest.spyOn(rocketsModel, 'create')

  const launchesFindSpy = jest.spyOn(launchesModel, 'find');
  const launchesCountSpy = jest.spyOn(launchesModel, 'count')
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
    launchesFindSpy.mockReturnValueOnce({
      skip: jest.fn().mockReturnValueOnce({
        limit: jest.fn().mockResolvedValueOnce(listAllDefaultData.results)
      })
    } as any) // isso é loucura.

    const res = await launches.list('', 10, Number(listAllDefaultData.page))

    expect(res.results).toEqual(listAllDefaultData.results)
  })
  it('Should throw an error when fails to make the query', async () => {
    launchesCountSpy.mockResolvedValueOnce(2)
    launchesFindSpy.mockReturnValueOnce({
      skip: jest.fn().mockReturnValueOnce({
          limit: jest.fn().mockRejectedValueOnce(new Error('Bad request') )
      })
    } as any)

    // testing the error with .rejects
    // expect(launches.list()).rejects.toBe(new Error('Bad request'))
      try {
        await launches.list()
      }catch (e: any) {
        console.debug(e.message)
        expect(e).toEqual(new Error('Bad request'))
      }
  })
})
