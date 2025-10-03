import type { FC } from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser, updateFavorites } from "../../store/slices/userSlice";
import { logoutRequest, removeFromFavorites, getFavorites } from "../../api/UserApi";
import { setModal } from "../../store/slices/modalSlice";
import Favorite from "../../components/Favorite/Favorite";
import { useNavigate } from "react-router-dom";
import "../../styles/scss/blocks/_account.scss";

export const AccountPage: FC = () => {
  const { name, surname, email, isAuthenticated, isAuthChecked } =
    useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"favorites" | "settings">(
    "favorites"
  );

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      dispatch(setModal("auth"));
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isAuthChecked, dispatch, navigate]);

  const handleLogout = async () => {
    await logoutRequest();
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  const handleRemoveFavorite = async (movieId: number) => {
    await removeFromFavorites(movieId);
    const updated = await getFavorites();
    dispatch(updateFavorites(updated.map((f: any) => String(f.id))));
  };

  if (!isAuthenticated) return null;

  return (
    <div className="account">
      <h1 className="account__title">Мой аккаунт</h1>

      <ul className="account__nav">
        <li
          className={`account__nav-item ${
            activeTab === "favorites" ? "account__nav-item--active" : ""
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          <svg className="account__nav-icon" width={24} height={24}>
            <use xlinkHref="/images/sprite.svg#heart" />
          </svg>
          <span className="account__nav-text">Избранные фильмы</span>
          <span className="account__nav-text--mobile">Избранное</span>
        </li>
        <li
          className={`account__nav-item ${
            activeTab === "settings" ? "account__nav-item--active" : ""
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <svg className="account__nav-icon" width={24} height={24}>
            <use xlinkHref="/images/sprite.svg#filled-false" />
          </svg>
          <span className="account__nav-text">Настройка аккаунта</span>
          <span className="account__nav-text--mobile">Настройки</span>
        </li>
      </ul>

      <div className="account__content">
        {activeTab === "favorites" && (
          <div className="account__favorite">
            <Favorite onRemoveFavorite={handleRemoveFavorite} />
          </div>
        )}

        {activeTab === "settings" && (
          <div className="account__settings account__settings--active">
            <div className="account__info">
              <div className="account__personal">
                <div className="account__image">
                  <span className="account__initials">
                    {name?.[0]?.toUpperCase()}
                    {surname?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="account__block">
                  <p className="account__label">Имя Фамилия</p>
                  <p className="account__data">
                    {name} {surname}
                  </p>
                </div>
              </div>
              <div className="account__personal">
                <div className="account__image">
                  <svg className="account__svg" width={24} height={24}>
                    <use xlinkHref="/images/sprite.svg#mail" />
                  </svg>
                </div>
                <div className="account__block">
                  <p className="account__label">Электронная почта</p>
                  <p className="account__data">{email}</p>
                </div>
              </div>
            </div>

            <button className="btn" onClick={handleLogout}>
              Выйти из аккаунта
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
