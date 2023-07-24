import mongoose from "mongoose";
import {launchSchema, rocketSchema} from "./schema";

export const launchesModel = mongoose.model('launches', launchSchema)

export const rocketsModel = mongoose.model('rockets', rocketSchema)
