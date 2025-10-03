import { BASE_URL, defaultConfig } from "./config";
import type { IUser } from "../models";

export const loginRequest = async (
  email: string,
  password: string
): Promise<boolean> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    ...defaultConfig,
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return response.ok;
};

export const fetchProfile = async (): Promise<
  Omit<IUser, "isAuthenticated" | "isAuthChecked">
> => {
  const response = await fetch(`${BASE_URL}/profile`, defaultConfig);
  if (!response.ok) throw new Error("Unauthorized");
  return response.json();
};

export const registerUser = async (user: {
  email: string;
  password: string;
  name: string;
  surname: string;
}): Promise<void> => {
  await fetch(`${BASE_URL}/user`, {
    ...defaultConfig,
    method: "POST",
    body: JSON.stringify(user),
  });
};

export const logoutRequest = async (): Promise<void> => {
  await fetch(`${BASE_URL}/auth/logout`, {
    ...defaultConfig,
    method: "GET",
  });
};

export const getFavorites = async (): Promise<any[]> => {
  const response = await fetch(`${BASE_URL}/favorites`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to load favorites");
  return response.json();
};

export const addToFavorites = async (movieId: string | number): Promise<void> => {
  await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id: String(movieId) }),
  });
};

export const removeFromFavorites = async (
  movieId: string | number
): Promise<void> => {
  await fetch(`${BASE_URL}/favorites/${Number(movieId)}`, {
    method: "DELETE",
    credentials: "include",
  });
};
