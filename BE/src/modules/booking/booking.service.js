import { bookingModel, bookingStatus, carModel, userRoles } from "../../DB/index.js";


// check availability of car by given date
export async function checkAvailability({ carId, pickupDate, returnDate }) {
  const isAvailable = await bookingModel.findOne({
    carId,
    status: { $ne: bookingStatus.cancelled },
    pickupDate: { $lt: returnDate },
    returnDate: { $gt: pickupDate }
  });
  return !isAvailable;
}



// get available cars by given date
export async function getAvailableCars(req, res, next) {
  let { pickupDate, returnDate, location } = req.body;
  pickupDate = new Date(pickupDate);
  returnDate = new Date(returnDate);
  const cars = await carModel.find({ location: location.toLowerCase(), isAvailable: true });
  const carsWithAvailability = [];
  for (const car of cars) {
    const isAvailable = await checkAvailability({ carId: car._id, pickupDate, returnDate });
    carsWithAvailability.push({ ...car.toObject(), isAvailable });
  }
  const availableCars = carsWithAvailability.filter((car) => car.isAvailable);
  return res.status(200).json({ message: "available cars", availableCars });
}


// create booking
export async function createBooking(req, res, next) {
  const { carId, pickupDate, returnDate } = req.body;
  const car = await carModel.findOne({ _id: carId, isAvailable: true });
  if (!car) {
    throw new Error("car not available", { cause: 400 });
  }
  const isAvailable = await checkAvailability({ carId, pickupDate, returnDate });
  if (!isAvailable) {
    throw new Error("car not available", { cause: 400 });
  }
  const picked = new Date(pickupDate);
  const returned = new Date(returnDate);
  const days = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
  const price = car.price * days;
  const booking = await bookingModel.create({ carId, pickupDate, returnDate, userId: req.user._id, price, owner: car.owner });
  return res.status(201).json({ message: "booking created successfully", booking });
}


// get user bookings
export async function getUserBookings(req, res, next) {
  const bookings = await bookingModel.find({ userId: req.user._id }).populate([
    {
      path: "carId",
    }
  ]);
  return res.status(200).json({ message: "user bookings", bookings });
}


// get owener bookings
export async function getOwnerBookings(req, res, next) {
  const bookings = await bookingModel.find({ owner: req.user._id }).populate([
    {
      path: "carId",
    }
  ]);
  return res.status(200).json({ message: "owner bookings", bookings });
}


// change booking status
export async function changeBookingStatus(req, res, next) {
  const { bookingId } = req.params;
  const { status } = req.body;
  if (status.toLowerCase() === bookingStatus.cancelled) {
    const booking = await bookingModel.findOneAndDelete({ _id: bookingId, owner: req.user._id });
    if (!booking) {
      throw new Error("booking not found", { cause: 404 });
    }
    return res.status(200).json({ message: "booking cancelled successfully", booking });
  }
  const booking = await bookingModel.findOne({ _id: bookingId, owner: req.user._id });
  if (!booking) {
    throw new Error("booking not found", { cause: 404 });
  }
  booking.status = status;
  await booking.save();
  return res.status(200).json({ message: "booking status changed successfully", booking });
}