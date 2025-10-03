export interface IUser {
  name: string;
  surname: string;
  email: string;
  favorites: string[];
  isAuthenticated: boolean;
  isAuthChecked: boolean,
}

export type User = IUser[];