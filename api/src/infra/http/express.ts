import express from 'express'
import { config } from "dotenv";
import {index, listAll, listStats, refreshData} from '@controller/LaunchesController'
import {connect} from "@database/connect";
import {hydrate} from '@cron/cron'

config()


const app = express()

app.use(express.json())

app.get('/', index)
app.get('/launches', listAll)
app.get('/launches/stats', listStats);
app.get('/data', refreshData);

(async () => {
  try{
    await connect();
    hydrate;

    app.listen(3030, () => console.log("Server started on port 3030"));
  }catch (err: any) {
    console.error(err);
    process.exit(1);
  }
})();
