// i think things are getting a little bit messy now, i'll keep class even that we know it could be one function with call

import {Launch} from "../types/Launch";
import {Rocket} from "../types/Rocket";

export class SpaceX {
  async getLaunches() {
    try{
      return await fetch(
        'https://api.spacexdata.com/v5/launches/latest',
        {},
      )
        .then<Launch>((res) => res.json())
        .then((data) => data);
    }catch (err: any) {
      throw new Error(err.message)
    }
  }

  async getRockets() {
    try{
      return await fetch(
        'https://api.spacexdata.com/v4/rockets/',
        {},
      )
        .then<Rocket[]>((res) => res.json())
        .then((data) => data);
    }catch (err: any) {
      throw new Error(err.message)
    }
  }
}
