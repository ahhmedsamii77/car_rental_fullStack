import { api } from "./apis";

export function getUserInfo() {
  return api.get("/users/userInfo");
}

export function updateProfileImage(image: File) {
  const formData = new FormData();
  formData.append("image", image);
  return api.patch("/users/updateProfileImage", formData);
}
