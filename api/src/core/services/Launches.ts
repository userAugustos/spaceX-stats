
import {SpaceX} from "@services/spaceX";
import mongoose from "mongoose";
import {LaunchStats} from "../types/Launch";

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
        const dbRocket = await this.rockets.findOne({ id: rocket.id })

        if(!dbRocket) {
          updated.push(rocket)
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
      const isSearchSuccess = (search === 'true' || search === 'false')
      let queryOr: Record<string, any>[] | Record<string, any> = [{}]

      if(isSearchSuccess) {
        queryOr = {
          success: (search === "true")
        }
      }

      if(search.length > 1 && !isSearchSuccess) {
        queryOr = {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          $or: [
            {name: {$regex: new RegExp(search, 'i')}},
            {'$rocketData.name': {$regex: new RegExp(search, 'i')}}
          ]
        }
      }

      const projectsCount = await this.launches.aggregate<any>([
        {
          $lookup: {
            from: 'rockets',
            localField: 'rocket',
            foreignField: 'id',
            as: 'rocketData',
          },
        },
        {
          $unwind: '$rocketData',
        },
        {
          $project: {
            rocketData: {
              name: 1,
            },
            success: 1,
            name: 1
          }
        },
        {
          $match: queryOr
        }
      ]).count('project')
      const totalDocs = projectsCount[0].project

      // so we will filter the data we want
      const results = await this.launches.aggregate([
        {
          $lookup: {
            from: 'rockets',
            localField: 'rocket',
            foreignField: 'id',
            as: 'rocketData',
          },
        },
        {
          $unwind: '$rocketData',
        },
        {
          $project: {
            links: 1,
            static_fire_date_utc: 1,
            static_fire_date_unix: 1,
            rocket: 1,
            rocketData: {
              name: 1,
            },
            success: 1,
            failures: 1,
            auto_update: 1,
            details: 1,
            crew: 1,
            ships: 1,
            flight_number: 1,
            name: 1,
            date_utc: 1,
            date_unix: 1,
            date_local: 1,
            date_precision: 1,
            upcoming: 1,
            cores: 1,
            id: 1
          },
        },
        {
          $match: queryOr,
        },
      ]).skip(skip).limit(limit);


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

    const launchStats: LaunchStats = await this.launches.aggregate([
      {
        $facet: {
          total: [{ $count: 'total' }],
          success: [{ $match: { success: true } }, { $count: 'success' }],
          fails: [{ $match: { success: false } }, { $count: 'fails' }],
        },
      },
    ]);

    const { total, success, fails } = launchStats[0];

    const rockets: Array<{
      _id : string,
      count: number,
      date : string[],
      name: string
    }> = await this.launches.aggregate([
      {
        $lookup: {
          from: 'rockets',
          localField: 'rocket',
          foreignField: 'id',
          as: 'rocketData',
        },
      },
      {
        $unwind: '$rocketData',
      },
      {
        $group:{
          _id:  '$rocketData.id',
          count: { $sum: 1 },
          date: { $push: '$rocketData.static_fire_date_utc'},
          name: { $first:  '$rocketData.name' }
        },
      },
    ]);

    return {
      total: total[0].total,
      success: success[0].success,
      fails: fails[0].fails,
      rockets
    }
  }
}


