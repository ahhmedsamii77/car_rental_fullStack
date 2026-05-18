import axios from "axios";
import type {
  AvailableCarType,
  BookingType,
  CarType,
  ConfirmEmailType,
  LoginType,
  UserType,
} from "../types";
export function createUser({
  name,
  email,
  password,
  confirmPassword,
}: UserType) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return axios.post(`${baseUrl}/users/register`, {
    name,
    email,
    password,
    confirmPassword,
  });
}

export function login({ email, password }: LoginType) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return axios.post(`${baseUrl}/users/login`, { email, password });
}

export function confirmEmail({ email, otp }: ConfirmEmailType) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return axios.patch(`${baseUrl}/users/confirmEmail`, { email, otp });
}

export function logout() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");
  const prefix = localStorage.getItem("role") == "user" ? "Bearer" : "Admin";
  return axios.patch(
    `${baseUrl}/users/revokeToken`,
    {},
    {
      headers: {
        authorization: token ? `${prefix} ${token}` : "",
      },
    }
  );
}

export function addCar({
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
}: CarType) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");
  const formData = new FormData();
  formData.append("location", location);
  formData.append("price_per_day", String(price_per_day));
  formData.append("description", description);
  formData.append("transmission", transmission);
  formData.append("fuel_type", fuel_type);
  formData.append("price", String(price));
  formData.append("seating_capacity", String(seating_capacity));
  formData.append("category", category);
  formData.append("year", String(year));
  formData.append("model", model);
  formData.append("brand", brand);
  formData.append("image", image!);
  return axios.post(`${baseUrl}/cars/addCar`, formData, {
    headers: {
      authorization: token ? `Admin ${token}` : "",
    },
  });
}

export function getDashboardData() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");
  return axios.get(`${baseUrl}/cars/dashboardData`, {
    headers: {
      authorization: token ? `Admin ${token}` : "",
    },
  });
}

export function refershToken() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("refersh_token");
  const prefix = localStorage.getItem("role") == "user" ? "Bearer" : "Admin";
  return axios.post(
    `${baseUrl}/users/refershToken`,
    {},
    {
      headers: {
        authorization: token ? `${prefix} ${token}` : "",
      },
    }
  );
}

export function getUserInfo() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");
  return axios.get(`${baseUrl}/users/userInfo`, {
    headers: {
      authorization: token ? `Admin ${token}` : "",
    },
  });
}

export function updateProfileImage(image: File) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");
  const prefix = localStorage.getItem("role") == "user" ? "Bearer" : "Admin";
  const formData = new FormData();
  formData.append("image", image!);
  return axios.patch(`${baseUrl}/users/updateProfileImage`, formData, {
    headers: {
      authorization: token ? `${prefix} ${token}` : "",
    },
  });
}

export function deleteCar(carId: string) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");
  return axios.delete(`${baseUrl}/cars/deleteCar/${carId}`, {
    headers: {
      authorization: token ? `Admin ${token}` : "",
    },
  });
}

export function getCars({
  page,
  limit,
  query,
}: {
  page?: number;
  limit?: number;
  query?: string;
}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return axios.get(`${baseUrl}/cars`, {
    params: {
      page,
      limit,
      query,
    },
  });
}

export function getCar(carId: string) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");
  const prefix = localStorage.getItem("role") == "user" ? "Bearer" : "Admin";
  return axios.get(`${baseUrl}/cars/${carId}`, {
    headers: {
      authorization: token ? `${prefix} ${token}` : "",
    },
  });
}

export function createBooking(booking: BookingType) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");
  const prefix = localStorage.getItem("role") == "user" ? "Bearer" : "Admin";
  return axios.post(`${baseUrl}/booking/create`, booking, {
    headers: {
      authorization: token ? `${prefix} ${token}` : "",
    },
  });
}

export function getUserBookings() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");
  const prefix = localStorage.getItem("role") == "user" ? "Bearer" : "Admin";
  return axios.get(`${baseUrl}/booking/userBookings`, {
    headers: {
      authorization: token ? `${prefix} ${token}` : "",
    },
  });
}

export function changeBookingStatus({
  bookingId,
  status,
}: {
  bookingId: string;
  status: string;
}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");
  return axios.patch(
    `${baseUrl}/booking/changeStatus/${bookingId}`,
    { status },
    {
      headers: {
        authorization: token ? `Admin ${token}` : "",
      },
    }
  );
}

export function getAvailableCars(carData: AvailableCarType) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access_token");
  const prefix = localStorage.getItem("role") == "user" ? "Bearer" : "Admin";
  return axios.post(`${baseUrl}/booking`, carData, {
    headers: {
      authorization: token ? `${prefix} ${token}` : "",
    },
  });
}
