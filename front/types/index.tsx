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
  id: string,
  rocketData: {
    name: string
  }
}


export interface Rocket {
  height: height,
  diameter: diameter,
  mass: mass,
  first_stage: stage,
  second_stage: stage,
  engines: {
    isp: {
      sea_level: number,
      vacuum: number,
    },
    thrust_sea_level: thrust,
    thrust_vacuum: thrust,
    number: number,
    type: string,
    version: string,
    layout: string,
    engine_loss_max: number,
    propellant_1: string,
    propellant_2: string,
    thrust_to_weight: number
  },
  landing_legs: {
    number: number,
    material?: string | null
  },
  payload_weights?:
    {
      id?: string,
      name?: string,
      kg?: number,
      lb?: number,
    }[],
  flickr_images: string[],
  name: string,
  type: string,
  active: boolean,
  stages: number,
  boosters: number,
  cost_per_launch: number,
  success_rate_pct: number,
  first_flight: string,
  country: string,
  company: string,
  wikipedia: string,
  description: string,
  id: string,
}

export type stage = {
  thrust?: thrust,
  payloads?: {
    composite_fairing?: {
      height: height,
      diameter: diameter
    },
    option_1: string
  },
  thrust_sea_level?: thrust,
  thrust_vacuum?: thrust,
  reusable: boolean,
  engines: number,
  fuel_amount_tons: number,
  burn_time_sec: number,
}

export type thrust = {
  kN: number,
  lbf: number,
}

export type height = {
  meters: number,
  feet: number,
}

export type diameter = {
  meters: number,
  feet: number,
}

export type mass =  {
  kg: number,
  lb: number,
}


export type statsRes = {
  total: number,
  success: number,
  fails: number,
  rockets: {
    _id: string,
    count: 5,
    date: string[],
    name: string
  }[]
}

export type listLaunches = {
  results: Launch[],
  limit: number,
  totalDocs: number,
  page: number,
  totalPages: number,
  hasNext: boolean,
  hasPrev: boolean
}
