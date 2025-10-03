import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { fetchProfile, getFavorites } from "../../api/UserApi";
import { loginUser, logoutUser, setAuthChecked } from "./userSlice";

export const useAuthInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const user = await fetchProfile();
        const favMovies = await getFavorites();
        const favIds = favMovies.map((m: any) => String(m.id));
        dispatch(loginUser({ ...user, favorites: favIds }));
      } catch {
        dispatch(logoutUser());
      } finally {
        dispatch(setAuthChecked(true));
      }
    };

    init();
  }, [dispatch]);
};
