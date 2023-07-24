
import {SpaceX} from "@useCase/spaceXUseCase";
import mongoose from "mongoose";

export class Launches {
  launches: mongoose.Model<any>;
  rockets: mongoose.Model<any>;
  api
  constructor(launches:  mongoose.Model<any>, rockets: mongoose.Model<any>, spaceX: SpaceX = new SpaceX()) {
    this.launches = launches
    this.rockets = rockets
    this.api = spaceX
  }

  async add() {
    try{
      const launch = await this.api.getLaunches();
      const rockets = await this.api.getRockets();
      const updated: any[] = []

      for (const rocket of rockets) {
        const dbRockets = await this.rockets.findOne({ id: rocket.id })
        if(rocket.id === launch.rocket) {
          launch.rocket = {
            name: rocket.name,
            id: rocket.id
          }
        }
        if(!dbRockets) {
          updated.push(rocket)
          console.debug(this.rockets.create)
          await this.rockets.create(rocket)
        }
      }
      const dbLaunch = await this.launches.findOne({ id: launch.id })

      if(!dbLaunch) {
        updated.push(launch)
        await this.launches.create(launch)
      }

      return {
        updated: updated.length > 1,
        data: updated
      }
    }catch (err: any){
      throw new Error(err.message)
    }
  }

  async list(search = '', limit = 4, page = 1) {
    try {
      const skip = (page - 1) * limit;

      const totalDocs = await this.launches.count()
      const results = await this.launches.find().skip(skip).limit(limit);

      return {
        results,
        totalDocs: totalDocs,
        page: page,
        totalPages: Math.ceil(totalDocs / limit),
        hasNext: page < Math.ceil(totalDocs / limit),
        hasPrev: page > 1,
      }
    }catch (err: any) {
      console.debug(err)
      throw new Error(err.message)
    }
  }

  async stats() {
    return {}
  }
}


