import mongoose from "mongoose";
import * as process from "process";

export async function connect() {
  return await mongoose.connect(`mongodb+srv://spacex-test:${process.env.ROOT_PASSWORD}@augustos.wzptygy.mongodb.net/${process.env.CURRENT_DB}?retryWrites=true&w=majority`);
}
