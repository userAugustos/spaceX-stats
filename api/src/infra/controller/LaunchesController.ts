import { Request, Response } from "express";
import { launchesModel, rocketsModel} from "@database/models";
import {Launches} from "@services/Launches";
import {listAllSchema} from "../../core/types/Launch";


const launches = new Launches(launchesModel, rocketsModel)
export async function index(_: Request, res: Response) {
  return res.send({
    message: "Fullstack Challenge 🏅 - Space X API"
  })
}

export async function listAll(req: Request, res: Response) {
  let validReq: { search: string, page?: number | any, limit?: number | any };

  try {
    console.debug()
    validReq = listAllSchema.parse(req.query)
  }catch (err: any) {
    console.debug(err)
    return res.status(404).json({
      message: err.message
    });
  }

  try{
    const response = await launches.list(validReq.search, validReq.limit, validReq.page)
    if(response.results.length < 1) { //  204 no body
      return res.status(204)
    }
    return res.send(response)
  }catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }
}

export async function listStats(_: Request, res: Response) {
  try{
    res.send({})
  }catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }
}

export async function refreshData(_: Request, res: Response) {
  try{
    const response = await launches.add()
    res.send(response)
  }catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }
}
