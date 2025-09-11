import { Router } from "express"
import * as CS from "./car.service.js"
import * as CV from "./car.validation.js"
import { validation, authentication, authorization, Multer, customExtensions } from "../../middleware/index.js"
import { userRoles } from "../../DB/index.js";
export const carRouter = Router();

// add car
carRouter.post("/addCar", authentication, authorization([userRoles.admin]), Multer(customExtensions.image).single("image"), validation(CV.addCarSchema), CS.addCar);

// list cars
carRouter.get("/listCars", authorization([userRoles.admin]), CS.listCars);

// toggle availability
carRouter.patch("/toggleAvailability/:carId", authentication, authorization([userRoles.admin]), validation(CV.toggleAvailabilitySchema), CS.toggleAvailability);

// delete car
carRouter.delete("/deleteCar/:carId", authentication, authorization([userRoles.admin]), validation(CV.deleteCarSchema), CS.deleteCar);

// get dashboard data
carRouter.get("/dashboardData", authentication, authorization([userRoles.admin]), CS.getDashboardData);

// get cars
carRouter.get("/", CS.getCars);

// get car by id
carRouter.get("/:carId", authentication, CS.getCarById);