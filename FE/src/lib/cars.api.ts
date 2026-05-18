import type { CarType } from "@/types";
import { api } from "./apis";

export function getCars({
  page,
  limit,
  query,
}: {
  page?: number;
  limit?: number;
  query?: string;
}) {
  return api.get("/cars", { params: { page, limit, query } });
}

export function getCar(carId: string) {
  return api.get(`/cars/${carId}`);
}

export function addCar(data: CarType) {
  const formData = new FormData();
  formData.append("location",         data.location);
  formData.append("price_per_day",    String(data.price_per_day));
  formData.append("description",      data.description);
  formData.append("transmission",     data.transmission);
  formData.append("fuel_type",        data.fuel_type);
  formData.append("price",            String(data.price));
  formData.append("seating_capacity", String(data.seating_capacity));
  formData.append("category",         data.category);
  formData.append("year",             String(data.year));
  formData.append("model",            data.model);
  formData.append("brand",            data.brand);
  formData.append("image",            data.image!);
  return api.post("/cars/addCar", formData);
}

export function deleteCar(carId: string) {
  return api.delete(`/cars/deleteCar/${carId}`);
}

export function getDashboardData() {
  return api.get("/cars/dashboardData");
}
