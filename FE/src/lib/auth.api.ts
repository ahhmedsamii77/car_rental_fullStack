import type { ConfirmEmailType, LoginType, UserType } from "@/types";
import { api } from "./apis";

export function createUser(data: UserType) {
  return api.post("/users/register", {
    name: data.name,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  });
}

export function login(data: LoginType) {
  return api.post("/users/login", data);
}

export function confirmEmail(data: ConfirmEmailType) {
  return api.patch("/users/confirmEmail", data);
}

export function logout() {
  return api.patch("/users/revokeToken", {});
}

export function refreshToken() {
  const token  = localStorage.getItem("refersh_token");
  const prefix = localStorage.getItem("role") === "user" ? "Bearer" : "Admin";
  return api.post(
    "/users/refershToken",
    {},
    { headers: { authorization: token ? `${prefix} ${token}` : "" } },
  );
}
