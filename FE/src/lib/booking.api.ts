import type { AvailableCarType, BookingType } from "@/types";
import { api } from "./apis";

export function createBooking(booking: BookingType) {
  return api.post("/booking/create", booking);
}

export function getUserBookings() {
  return api.get("/booking/userBookings");
}

export function changeBookingStatus({
  bookingId,
  status,
}: {
  bookingId: string;
  status: string;
}) {
  return api.patch(`/booking/changeStatus/${bookingId}`, { status });
}

export function getAvailableCars(carData: AvailableCarType) {
  return api.post("/booking", carData);
}
