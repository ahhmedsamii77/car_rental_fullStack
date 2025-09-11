import joi from "joi"
import { generalRules } from "../../utils/index.js"

export const addCarSchema = {
  body: joi.object({
    price: joi.number().required(),
    description: joi.string().required(),
    category: joi.string().required(),
    year: joi.number().required(),
    brand: joi.string().required(),
    model: joi.string().required(),
    seating_capacity: joi.number().required(),
    transmission: joi.string().required(),
    fuel_type: joi.string().required(),
    location: joi.string().required(),
    price_per_day: joi.number().required(),
  }).required()
}

export const toggleAvailabilitySchema = {
  params: joi.object({
    carId: generalRules.id.required()
  }).required()
}

export const deleteCarSchema = {
  params: joi.object({
    carId: generalRules.id.required()
  }).required()
}

