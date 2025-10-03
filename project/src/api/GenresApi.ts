import { BASE_URL, defaultConfig } from "./config";

export const getGenres = async (): Promise<string[]> => {
	const url = `${BASE_URL}/movie/genres`;
	const response = await fetch(url, defaultConfig);
	const data = await response.json();
	return data;
};