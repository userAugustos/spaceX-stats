import mongoose from "mongoose";
const { Schema } = mongoose

// _id will be default

export const rocketSchema = new Schema({
  height: {
    meters: Number,
    feet: Number,
  },
  diameter: {
    meters: Number,
    feet: Number,
  },
  mass: {
    kg: Number,
    lb: Number,
  },
  first_stage: {
    thrust_sea_level: {
      kN: Number,
      lbf: Number,
    },
    thrust_vacuum: {
      kN: Number,
      lbf: Number,
    },
    reusable: Boolean,
    engines: Number,
    fuel_amount_tons: Number,
    burn_time_sec: Number,
  },
  second_stage: {
    thrust: {
      kN: Number,
      lbf: Number,
    },
    payloads: {
      composite_fairing: {
        height: {
          meters: Number,
          feet: Number,
        },
        diameter: {
          meters: Number,
          feet: Number,
        }
      },
      option_1: String
    },
    reusable: Boolean,
    engines: Number,
    fuel_amount_tons: Number,
    burn_time_sec: Number,
  },
  engines: mongoose.Schema.Types.Mixed,
  landing_legs: {
    number: Number,
    material: String
  },
  payload_weights: [
    {
      id: String,
      name: String,
      kg: Number,
      lb: Number,
    },
  ],
  flickr_images: [String],
  name: String,
  type: String,
  active: Boolean,
  stages: Number,
  boosters: Number,
  cost_per_launch: Number,
  success_rate_pct: Number,
  first_flight: String,
  country: String,
  company: String,
  wikipedia: String,
  description: String,
  id: String,
}, {collection: 'rockets'})
export const launchSchema = new Schema({
  fairings: { any: {} },
  links: {
    patch: {
      small: String,
      large: String
    },
    reddit: {
      campaign:  String,
      launch: String,
      media: String,
      recovery: String
    },
    flickr: {
      small: { any: Array }, //mixed
      original: [String]
    },
    presskit: String,
    webcast: String,
    youtube_id: String,
    article: String,
    wikipedia: String,
  },
  static_fire_date_utc: Date,
  static_fire_date_unix: Number,
  tdb: Boolean,
  net: Boolean,
  window: Number,
  rocket: String,
  success: Boolean,
  failures: { any: Array },
  details: String,
  crew: mongoose.Schema.Types.Mixed,
  ships: [String],
  capsules: [String],
  payloads: [String],
  launchpad: String,
  auto_update: Boolean,
  flight_number: Number,
  name: String,
  date_utc: Date,
  date_unix: Number,
  date_local: Date,
  date_precision: String,
  upcoming: Boolean,
  cores: [
    {
      core: String,
      flight: Number,
      gridfins: Boolean,
      legs: Boolean,
      reused: Boolean,
      landing_attempt: Boolean,
      landing_success: Boolean,
      landing_type: String,
      landpad: String
    }
  ],
  id: String
}, { collection: 'launches' });
