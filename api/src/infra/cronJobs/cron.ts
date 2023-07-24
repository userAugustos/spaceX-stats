  import cron from 'node-cron';
  import { Launches } from "@services/Launches";
  import {launchesModel, rocketsModel} from "@database/models";

  const launches = new Launches(launchesModel, rocketsModel)
  export const hydrate = cron.schedule('0 9 * * *', () => {
    // so we basically didn't not care to the response here, so let's treat this a kind of queue, what goes in, never came out.
    launches.add()
    console.log('successfully updated')
  }).start;
