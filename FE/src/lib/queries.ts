import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AvailableCarType,
  BookingType,
  CarType,
  ConfirmEmailType,
  LoginType,
  UserType,
} from "@/types";

// ─── API imports ──────────────────────────────────────────────────────────────
import {
  createUser,
  login,
  confirmEmail,
  logout,
  refreshToken,
} from "./auth.api";

import { getUserInfo, updateProfileImage } from "./user.api";

import {
  addCar,
  deleteCar,
  getCar,
  getCars,
  getDashboardData,
} from "./cars.api";

import {
  changeBookingStatus,
  createBooking,
  getAvailableCars,
  getUserBookings,
} from "./booking.api";

// ─── Auth hooks ───────────────────────────────────────────────────────────────

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: UserType) => createUser(data),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginType) => login(data),
  });
}

export function useConfirmEmail() {
  return useMutation({
    mutationFn: (data: ConfirmEmailType) => confirmEmail(data),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
  });
}

export function useRefershToken() {
  return useMutation({
    mutationFn: () => refreshToken(),
  });
}

// ─── User hooks ───────────────────────────────────────────────────────────────

export function useGetUserInfo() {
  const token = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    enabled: !!token,
  });
}

export function useUpdateProfileImage() {
  return useMutation({
    mutationFn: (image: File) => updateProfileImage(image),
  });
}

// ─── Cars hooks ───────────────────────────────────────────────────────────────

export function useGetCars({
  page,
  limit,
  query,
}: {
  page?: number;
  limit?: number;
  query?: string;
}) {
  return useQuery({
    queryKey: ["cars", page, limit, query],
    queryFn: () => getCars({ page, limit, query }),
  });
}

export function useGetCar(carId: string) {
  return useQuery({
    queryKey: ["car", carId],
    queryFn: () => getCar(carId),
    enabled: !!carId,
  });
}

export function useAddCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CarType) => addCar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (carId: string) => deleteCar(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

export function useGetDashboardData() {
  const token = localStorage.getItem("access_token");
  const { data: userInfo } = useGetUserInfo();
  const isAdmin = userInfo?.data?.data?.role === "admin";
  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
    enabled: !!token && isAdmin,
  });
}

// ─── Booking hooks ────────────────────────────────────────────────────────────

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (booking: BookingType) => createBooking(booking),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
    },
  });
}

export function useGetUserBookings() {
  const token = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["userBookings"],
    queryFn: getUserBookings,
    enabled: !!token,
  });
}

export function useChangeBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: string; status: string }) =>
      changeBookingStatus({ bookingId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
    },
  });
}

export function useGetAvailableCars(carData: AvailableCarType) {
  return useQuery({
    queryKey: ["availableCars", carData],
    queryFn: () => getAvailableCars(carData),
    enabled: !!carData.location && !!carData.pickupDate && !!carData.returnDate,
  });
}
