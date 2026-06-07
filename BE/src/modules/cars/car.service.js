import { bookingModel, bookingStatus, carModel } from "../../DB/index.js";
import cloudinary from "../../utils/cloudinary/index.js";

// add car
export async function addCar(req, res, next) {
  const {
    location,
    price_per_day,
    description,
    transmission,
    fuel_type,
    price,
    seating_capacity,
    category,
    year,
    model,
    brand,
  } = req.body;
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req?.file.path,
    { folder: "car-renta/cars/image" }
  );
  const car = await carModel.create({
    location,
    price_per_day,
    description,
    transmission,
    fuel_type,
    price,
    seating_capacity,
    category,
    year,
    model,
    brand,
    owner: req.user._id,
    image: { secure_url, public_id },
  });
  return res.status(201).json({ message: "car added successfully", car });
}

// list cars
export async function listCars(req, res, next) {
  const cars = await carModel.find({ owner: req.user._id });
  return res.status(200).json({ message: "cars list", cars });
}

// toogle car availability
export async function toggleAvailability(req, res, next) {
  const { carId } = req.params;
  const car = await carModel.findOne({ _id: carId, owner: req.user._id });
  if (!car) {
    throw new Error("car not found", { cause: 404 });
  }
  car.isAvailable = !car.isAvailable;
  await car.save();
  return res
    .status(200)
    .json({ message: "car availability toggled successfully", car });
}

// delete car
export async function deleteCar(req, res, next) {
  const { carId } = req.params;
  const car = await carModel.findOneAndDelete({
    _id: carId,
    owner: req.user._id,
  });
  if (!car) {
    throw new Error("car not found", { cause: 404 });
  }
  return res.status(200).json({ message: "car deleted successfully", car });
}

// get dashboard data
export async function getDashboardData(req, res, next) {
  const cars = await carModel.find({ owner: req.user._id });
  const bookings = await bookingModel
    .find({ owner: req.user._id })
    .populate("carId");
  const pendingBookings = await bookingModel
    .find({ owner: req.user._id, status: bookingStatus.pending })
    .populate("carId");
  const completedBookings = await bookingModel
    .find({ owner: req.user._id, status: bookingStatus.confirmed })
    .populate("carId");
  const monthlyEarnings = completedBookings.reduce(
    (total, booking) => total + booking.price,
    0
  );
  const totalEarnings = bookings.reduce(
    (total, booking) => total + booking.price,
    0
  );
  const dashboardData = {
    cars,
    bookings,
    pendingBookings,
    completedBookings,
    monthlyEarnings,
    totalEarnings,
    totalCars: cars.length,
    totalBookings: bookings.length,
  };
  return res.status(200).json({ message: "dashboard data", dashboardData });
}


// get cars
export async function getCars(req, res, next) {
  let { page, limit, query } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 6;
  const now = new Date();

  let filter = { isAvailable: true };
  if (query) {
    query = query.toLowerCase();
    filter = {
      isAvailable: true,
      $or: [
        { brand: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
      ],
    };
  }

  const total = await carModel.countDocuments(filter);
  const cars  = await carModel.find(filter).skip((page - 1) * limit).limit(limit);

  // Attach real-time booking status to each car
  const carsWithStatus = await Promise.all(
    cars.map(async (car) => {
      const activeBooking = await bookingModel.findOne({
        carId: car._id,
        status: { $ne: bookingStatus.cancelled },
        returnDate: { $gte: now },
      });
      return { ...car.toObject(), hasActiveBookings: !!activeBooking };
    })
  );

  return res.status(200).json({ message: "cars", page, total, cars: carsWithStatus });
}


// get car by id
export async function getCarById(req, res, next) {
  const { carId } = req.params;
  const car = await carModel.findOne({ _id: carId, isAvailable: true });
  if (!car) {
    throw new Error("car not found", { cause: 404 });
  }
  const now = new Date();
  const activeBooking = await bookingModel.findOne({
    carId: car._id,
    status: { $ne: bookingStatus.cancelled },
    returnDate: { $gte: now },
  });
  return res.status(200).json({ message: "car", car: { ...car.toObject(), hasActiveBookings: !!activeBooking } });
}