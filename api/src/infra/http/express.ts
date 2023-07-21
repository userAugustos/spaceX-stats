import express from 'express'
import {index, listAll, listStats} from '../controller/LaunchesController'
import {connect} from "../database/connect";

const app = express()
app.use(express.json())

app.get('/', index)
app.get('/launches', listAll)
app.get('/launches/stats', listStats);

(async () => {
  try{
      await connect()
      app.listen(3000, () => console.log("Server started on port 3000"));
  }catch (err: any) {
    console.error(err);
    process.exit(1);
  }
})();
