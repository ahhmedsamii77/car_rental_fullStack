import joi from "joi"
export const getAvailableCarsSchema = {
  body: joi.object({
    pickupDate: joi.date().required(),
    returnDate: joi.date().required(),
    location: joi.string().required()
  }).required()
}


export const createBookingSchema = {
  body: joi.object({
    carId: joi.string().required(),
    pickupDate: joi.date().required(),
    returnDate: joi.date().required(),
  }).required()
}