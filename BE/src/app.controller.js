import { checkConnectionDB } from "./DB/index.js";
import { globalErrorHandler } from "./middleware/index.js"
import { bookingRouter } from "./modules/booking/booking.controller.js";
import { carRouter } from "./modules/cars/car.controller.js";
import { userRouter } from "./modules/users/user.controller.js";
import cors from "cors";
export default async function bootstrap({ app, express }) {
    // cors
  app.use(cors());

  // check connection to DB
  await checkConnectionDB();

  // parse data
  app.use(express.json());

  // main route
  app.get("/", (req, res, next) => {
    return res.status(200).json({ message: "welcome to my app........" });
  });

  // users routes
  app.use("/users", userRouter);

  // cars routes
  app.use("/cars", carRouter);

  // booking routes
  app.use("/booking", bookingRouter);

  // unhandled routes
  app.use((req, res, next) => {
    throw new Error(`404 Not Found url ${req.originalUrl}`);
  });

  // global error handler
  app.use(globalErrorHandler);
}