import { Router } from "express"

import * as TS from "./booking.service.js"
import * as TV from "./booking.validation.js"
import { authorization, authentication, validation } from "../../middleware/index.js"
import { userRoles } from "../../DB/index.js";

export const bookingRouter = Router();


// get availability of car by given date (public - no auth needed)
bookingRouter.post("/", validation(TV.getAvailableCarsSchema), TS.getAvailableCars);

// create booking
bookingRouter.post("/create", authentication, validation(TV.createBookingSchema), TS.createBooking);


// get user bookings
bookingRouter.get("/userBookings", authentication, TS.getUserBookings);


// get owener bookings
bookingRouter.get("/ownerBookings", authentication, authorization([userRoles.admin]), TS.getOwnerBookings);


// change booking status
bookingRouter.patch("/changeStatus/:bookingId", authentication, authorization([userRoles.admin]), TS.changeBookingStatus);