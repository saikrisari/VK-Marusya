import type { Movies, IMovie } from "../models";
import { BASE_URL, defaultConfig } from "./config";

export const getTop10Movies = async (): Promise<Movies> => {
  const url = `${BASE_URL}/movie/top10`;
  const response = await fetch(url, defaultConfig);
  const data = await response.json();
  return data;
};

export const getMovie = async (movieId: number): Promise<IMovie> => {
  const url = `${BASE_URL}/movie/${movieId}`;
  const response = await fetch(url, defaultConfig);
  const data = await response.json();
  return data;
};

export const getRandomMovie = async (): Promise<IMovie> => {
  const url = `${BASE_URL}/movie/random`;
  const response = await fetch(url, defaultConfig);
  const data = await response.json();
  return data;
};

export const getMoviesByGenre = async (genre: string): Promise<IMovie[]> => {
  const url = `${BASE_URL}/movie?genre=${encodeURIComponent(genre)}`;
  const res = await fetch(url, defaultConfig);
  const data = await res.json();
  return data;
};

export const searchMovies = async (query: string): Promise<IMovie[]> => {
  const url = `${BASE_URL}/movie?title=${encodeURIComponent(query)}&count=5`;
  const res = await fetch(url, defaultConfig);
  const data = await res.json();
  return data;
};
