import * as controller from "../../infra/controller/LaunchesController";
import {Request, Response} from "express";
import {index, listAll, listStats} from "../../infra/controller/LaunchesController";

describe('', () => {
  const indexSpy = jest.spyOn(controller, 'index')
  const listAllSpy = jest.spyOn(controller, 'listAll')
  const listStatsSpy = jest.spyOn(controller, 'listStats')
  let mockResponse: (status: number, send: Record<any, any>, json: string) => Record<string, any>;

  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    mockResponse = (status = 200, send = {}, json = '') => {
      const res: Record<string, any>= {};

      res.status = jest.fn().mockReturnValueOnce(status);
      res.json = jest.fn().mockReturnValueOnce(json);
      res.send = jest.fn().mockReturnValue(send);
      return res;
    };
  })

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
    jest.clearAllMocks()
  });


// success
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
      func: controller.listStats
    }
  ])('Should return success start message endpoint', async ( { variables, func } ) => {
    const { expected } = variables
    const req = {} as Request;
    const res = mockResponse(200, expected, '') as Response;

    await func(req, res)

    expect(res.send).toBeCalled()
    expect(res.send).toBeCalledWith(expected)
  })

  // it('Should return success start message at index endpoint', async () => {
  //   const expected = {
  //     message: "Fullstack Challenge 🏅 - Space X API"
  //   }
  //   const req = {} as Request;
  //   const res = mockResponse(200, expected, '') as Response;
  //
  //   await index(req, res)
  //
  //   expect(res.send).toBeCalled()
  //   expect(res.send).toBeCalledWith(expected)
  // })
});

