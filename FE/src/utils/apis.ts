/**
 * @deprecated — All API functions have been moved to lib/*.api.ts
 * This file is kept as a backward-compatible re-export barrel.
 */
export { createUser, login, confirmEmail, logout, refreshToken as refershToken } from "../lib/auth.api";
export { getUserInfo, updateProfileImage } from "../lib/user.api";
export { addCar, deleteCar, getCar, getCars, getDashboardData } from "../lib/cars.api";
export { changeBookingStatus, createBooking, getAvailableCars, getUserBookings } from "../lib/booking.api";
