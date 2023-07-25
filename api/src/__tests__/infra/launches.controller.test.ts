
import {Request, Response} from "express";
import {index, listAll, listStats, refreshData} from "@controller/LaunchesController";
import {listAllSuccessRes, listAllSuccessResNoResult, refreshDataResult, statsResult} from "../__mocks__/controller.mock";
import {Launches} from "@services/Launches";

let mockResponse: (status?: number | unknown, send?: Record<any, any>, json?: string) => Response;

jest.mock('@services/Launches')

describe('testing success of launches controller', () => {
  const listSpy = jest.spyOn(Launches.prototype, 'list');
  const statsSpy = jest.spyOn(Launches.prototype, 'stats');
  const addSpy = jest.spyOn(Launches.prototype, 'add')

  beforeEach(() => {
    mockResponse = (status = 200, send = {}, json = '') => {
      const res = {} as Response;

      res.status = jest.fn().mockReturnValueOnce(status);
      res.json = jest.fn().mockReturnValueOnce(json);
      res.send = jest.fn().mockReturnValue(send);
      return res;
    };
  })

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
// so i really try to make it less redundant with it.each, but appears that by the way it works, my mock of express response isn't work for every loop of test
  it.each([
//   index
    {
      variables: {
        expected: {
          message: "Fullstack Challenge 🏅 - Space X API"
        }
      },
      func: index
    },
//   listAll
    {
      variables: {
        expected: {
          all: []
        }
      },
      func: listAll
    },
//   listStats
    {
      variables: {
        expected: {
          data: {}
        }
      },
      func: listStats
    }
  ])

  it('Should return success start message at index endpoint', async () => {
    const expected = {
      message: "Fullstack Challenge 🏅 - Space X API"
    }
    const req = {} as Request;
    const res = mockResponse(200, expected, '') as Response;

    await index(req, res)

    expect(res.send).toBeCalled()
    expect(res.send).toBeCalledWith(expected)
  })
  it('Should return success and data at listAll endpoint', async () => {
    const statusObj = {
      send: jest.fn().mockReturnValueOnce(listAllSuccessRes),
      json: jest.fn().mockReturnValueOnce('')
    }
    const req = {
      query: {}
    } as unknown as Request;
    const res = mockResponse(statusObj) as Response;
    // console.debug(listSpy)

    listSpy.mockResolvedValueOnce(listAllSuccessRes)

    await listAll(req, res)

    expect(res.send).toBeCalled()
    expect(res.send).toBeCalledWith(listAllSuccessRes)
  })
  it('Should return success but with no data at listAll', async () => {
    const req = {
      query: {}
    } as unknown as Request;
    const res = mockResponse(204) as Response;
    // console.debug(listSpy)

    listSpy.mockImplementationOnce(() => Promise.resolve(listAllSuccessResNoResult))

    const response = await listAll(req, res)

    expect(response).toBe(204)
    // expect(res.send).toBeCalledTimes(0)
  })
  it('Should return success data response at listStats endpoint', async () => {
    const req = {} as Request

    const res = mockResponse(200, statsResult, '') as Response;

    statsSpy.mockResolvedValueOnce(statsResult)

    expect(await listStats(req, res)).toEqual(statsResult)
  })
  it('Should return success data response at refresData endpoint', async () => {
    const req = {} as Request

    const res = mockResponse(200, refreshDataResult, '') as Response;

    addSpy.mockResolvedValueOnce(refreshDataResult)

    expect(await refreshData(req, res)).toEqual(refreshDataResult)
  })
});

describe('Testing fails of launches controller', () => {
  const addSpy = jest.spyOn(Launches.prototype, 'add')
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it('Should throw error because of bad request getting list data', async () => {
    const statusObj = {
      send: jest.fn().mockReturnValue(''),
      json: jest.fn().mockReturnValueOnce({
        message: 'Bad Request'
      })
    }
    const req = {
      query: {
        page: '1',
        limit: '10'
      }
    } as unknown as Request;
    const res = mockResponse(statusObj) as Response;

    expect(await listAll(req, res)).toEqual({
      message: 'Bad Request'
    })
  })
  it('Should throw error because could not load total launches in db', async () => {
    const statsSpy = jest.spyOn(Launches.prototype, 'stats')
    const statusObj = {
      send: jest.fn().mockReturnValue(''),
      json: jest.fn().mockReturnValue({
        message: 'mongodb:err:3423'
      })
    }
    const req = {} as Request

    const res = mockResponse(statusObj, {}, '') as Response;

    statsSpy.mockRejectedValueOnce(new Error('mongodb:err:3423'))

    expect(await listStats(req, res)).toEqual({
      message: 'mongodb:err:3423'
    })
  })

  it('Should throw error because could insert in db using refresh data', async () => {
    const statusObj = {
      send: jest.fn().mockReturnValue(''),
      json: jest.fn().mockReturnValueOnce({
        message: 'mongodb:err:400'
      })
    }
    const req = {} as Request

    const res = mockResponse(statusObj, {}, '') as Response;

    addSpy.mockRejectedValueOnce(new Error('mongodb:err:3423'))

    expect(await refreshData(req, res)).toEqual({
      message: 'mongodb:err:400'
    })
  })
})
