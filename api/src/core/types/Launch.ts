import {z} from "zod";

/**
 * Main Schema of launches
 *
 * @Important Not sure what is required
 *
  */
export interface Launch {
  fairings: unknown,
  links: {
    patch: {
      small: string,
      large: string
    },
    reddit: {
      campaign:  string,
      launch: string,
      media: string,
      recovery: string
    },
    flickr: {
      small: unknown, //mixed
      original: string[]
    },
    presskit: string,
    webcast: string,
    youtube_id: string,
    article: string,
    wikipedia: string,
  },
  static_fire_date_utc: string,
  static_fire_date_unix: number,
  tdb: boolean,
  net: boolean,
  window: number,
  rocket: string | { name: string, id: string },
  success: boolean,
  failures: Array<any>,
  details: string,
  crew: string[] | [{ string: string }],
  ships: string[],
  capsules: string[],
  payloads: string[],
  launchpad: string,
  auto_update: boolean,
  flight_number: number,
  name: string,
  date_utc: string,
  date_unix: number,
  date_local: string,
  date_precision: string,
  upcoming: boolean,
  cores?: [
    {
      core?: string,
      flight?: number,
      gridfins?: boolean,
      legs?: boolean,
      reused?: boolean,
      landing_attempt?: boolean,
      landing_success?: boolean,
      landing_type?: string,
      landpad?: string
    }
  ],
  id: string
}

const numberTransform = z.custom((value) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const transformed = Number(value)
    if (isNaN(transformed)) return null
    return transformed
  }
  return null;
}, {
  fatal: false
}, false);

// Define the Zod schema for the query parameters
export const listAllSchema = z.object({
  search: z.string().optional().default(''),
  page: numberTransform.optional().default(1),
  limit: numberTransform.optional().default(4),
});
