import { Request, Response } from "express";

export async function index(_: Request, res: Response) {
  // console.debug(res.send())
  res.send({
    message: "Fullstack Challenge 🏅 - Space X API"
  })
}

export async function listAll(_: Request, res: Response) {
  // console.debug(res.send())
  res.send({
    all: []
  })
}

export async function listStats(_: Request, res: Response) {
  // console.debug(res.send())
  res.send({
    data: {}
  })
}
