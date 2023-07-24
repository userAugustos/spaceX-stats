
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
