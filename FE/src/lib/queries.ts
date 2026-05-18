import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCar,
  changeBookingStatus,
  confirmEmail,
  createBooking,
  createUser,
  deleteCar,
  getAvailableCars,
  getCar,
  getCars,
  getDashboardData,
  getUserBookings,
  getUserInfo,
  login,
  logout,
  refershToken,
  updateProfileImage,
} from "../utils/apis";
import type {
  AvailableCarType,
  BookingType,
  CarType,
  ConfirmEmailType,
  LoginType,
  UserType,
} from "../types";
export function useCreateUser() {
  return useMutation({
    mutationFn: ({ name, email, password, confirmPassword, image }: UserType) =>
      createUser({ name, email, password, confirmPassword, image }),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: LoginType) => login({ email, password }),
  });
}

export function useConfirmEmail() {
  return useMutation({
    mutationFn: ({ email, otp }: ConfirmEmailType) =>
      confirmEmail({ email, otp }),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
  });
}

export function useAddCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
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
      image,
    }: CarType) =>
      addCar({
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
        image,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboardData", "cars"],
      });
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

export function useRefershToken() {
  return useMutation({
    mutationFn: refershToken,
  });
}

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

export function useDeleteCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (carId: string) => deleteCar(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboardData"],
      });
    },
  });
}

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
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (booking: BookingType) => createBooking(booking),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userBookings"],
      });
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
    mutationFn: ({
      bookingId,
      status,
    }: {
      bookingId: string;
      status: string;
    }) => changeBookingStatus({ bookingId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userBookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboardData"],
      });
    },
  });
}

export function useGetAvailableCars(carData: AvailableCarType) {
  return useQuery({
    queryKey: ["availableCars" , carData],
    queryFn: () => getAvailableCars(carData),
    enabled: !!carData.location && !!carData.pickupDate && !!carData.returnDate
  });
}
