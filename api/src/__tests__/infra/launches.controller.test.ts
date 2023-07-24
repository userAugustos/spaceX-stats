
import {Request, Response} from "express";
import {index, listAll, listStats} from "@controller/LaunchesController";
import {listAllSuccessRes, listAllSuccessResNoResult} from "../__mocks__/controller";
import {Launches} from "@services/Launches";

let mockResponse: (status?: number | unknown, send?: Record<any, any>, json?: string) => Response;

jest.mock('@services/Launches')

describe('testing success of launches controller', () => {
  const listSpy = jest.spyOn(Launches.prototype, 'list');

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
  it('Should return success start message at listStats endpoint', async () => {
    const expected = {}
    const req = {} as Request;
    const res = mockResponse(200, expected, '') as Response;

    await listStats(req, res)

    expect(res.send).toBeCalled()
    expect(res.send).toBeCalledWith(expected)
  })
});

describe('Testing fails of launches controller', () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it('Should throw error because of bade query request at listAll endpoint', async () => {
    const statusObj = {
      send: jest.fn().mockReturnValue(''),
      json: jest.fn().mockReturnValueOnce('Invalid page or limit type parameter.')
    }
    const req = {
      query: {
        page: 'page'
      }
    } as unknown as Request;
    const res = mockResponse(statusObj) as Response;

    expect(await listAll(req, res)).toBe('Invalid page or limit type parameter.')
  })
  it('Should throw error because of some error getting list data', async () => {
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
})
