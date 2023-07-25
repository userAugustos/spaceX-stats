import {SpaceX} from "@services/spaceX";
import {LaunchesDefaultData, rocketsArr} from "../__mocks__/launches.mock";

const spaceX = new SpaceX();
const fetchMock = jest.spyOn(global, 'fetch') as jest.Mock;

describe('Testing success path of spaceX service', () => {
  it.each([
    {
      variables: {
        expected: LaunchesDefaultData,
      },
      method: spaceX.getLaunches
    },
    {
      variables: {
        expected: rocketsArr
      },
      method: spaceX.getRockets
    }
  ])('should return success data', async ({ variables, method }) => {
    const { expected } = variables

    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(JSON.stringify(expected)),
      }),
    );

    const response = await method()

    expect(response).toBe(JSON.stringify(expected))
  })
})

describe('Testing errors path of spaceX service', () => {
  it.each([
    {
      method: spaceX.getLaunches
    },
    {
      method: spaceX.getRockets
    }
  ])('should return trhow error', async ({ method }) => {
    fetchMock.mockImplementationOnce(() =>
      Promise.reject(new Error('SpaceX api is down')),
    );

    // const response = await method()
    // expect(response).toBe(JSON.stringify(expected))
    try {
      await method()
    }catch (e:any) {
      expect(e.message).toBe('SpaceX api is down')
    }
  })
})
