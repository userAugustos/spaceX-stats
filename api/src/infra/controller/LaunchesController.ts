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
  const validReq = listAllSchema.parse(req.query)

  try{
    const response = await launches.list(validReq.search, validReq.limit, validReq.page)
    if(response.results.length < 1) { //  204 no body
      return res.status(204).send(response)
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
    const response = await launches.stats()

    return res.send(response)
  }catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }
}

export async function refreshData(_: Request, res: Response) {
  try{
    const response = await launches.add()
    return res.send(response)
  }catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }
}
