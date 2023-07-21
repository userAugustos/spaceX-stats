import mongoose from "mongoose";

export async function connect() {
  return await mongoose.connect(`mongodb+srv://root:sKOtvSR2YUSD311@augustos.wzptygy.mongodb.net/?retryWrites=true&w=majority`);
}
