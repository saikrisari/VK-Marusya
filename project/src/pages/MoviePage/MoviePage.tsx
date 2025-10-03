import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { FC } from "react";
import type { IMovie } from "../../models";
import { getMovie } from "../../api/MoviesApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setModal } from "../../store/slices/modalSlice";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from "../../api/UserApi";
import { updateFavorites } from "../../store/slices/userSlice";
import TrailerModal from "../../components/TrailerModal/TrailerModal";
import {
  formatRub,
  cutEndingDot,
  getRatingClass,
  formatRuntime,
} from "../../utils/movie";
import "../../styles/scss/blocks/_movie.scss";
import "../../styles/scss/blocks/_btn.scss";

const MoviePage: FC = () => {
  const location = useLocation();
  const movieId = Number(location.pathname.split("/").pop());
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [isTrailerOpen, setTrailerOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { favorites, isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    getMovie(movieId).then(setMovie);
  }, [movieId]);

  const isFavorite = favorites.includes(String(movieId));

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      dispatch(setModal("auth"));
      return;
    }

    if (isFavorite) {
      await removeFromFavorites(Number(movieId));
    } else {
      await addToFavorites(String(movieId));
    }

    const updated = await getFavorites();
    dispatch(updateFavorites(updated.map((f: any) => String(f.id))));
  };

  if (!movie) return null;

  return (
    <div className="movie">
      <div className="movie__upper-block">
        <div className="movie__block">
          <div className="hero__description">
          <div className="hero__indicators">
            <span
              className={`hero__rating ${getRatingClass(movie.tmdbRating)}`}
            >
              <svg
                className="hero__icon"
                aria-hidden="true"
                width={16}
                height={16}
              >
                <use xlinkHref="/images/sprite.svg#star" />
              </svg>
              {Math.round(movie.tmdbRating * 10) / 10}
            </span>
            <span className="hero__year">{movie.releaseYear}</span>
            <span className="hero__genre">{movie.genres.join(", ")}</span>
            <span className="hero__runtime">
              {formatRuntime(movie.runtime)}
            </span>
          </div>

          <div className="hero__info">
            <h1 className="hero__info-title">{movie.title}</h1>
            <p className="hero__info-description">{movie.plot}</p>
          </div>
        </div>
        <div className="movie__wrapper">
          <button
            type="button"
            onClick={() => setTrailerOpen(true)}
            className="btn btn--movie"
          >
            Трейлер
          </button>
          {isTrailerOpen && (
            <TrailerModal
              movieId={movie.id}
              onClose={() => setTrailerOpen(false)}
            />
          )}
          <button
            type="button"
            className="btn__secondary btn__secondary--round"
            onClick={handleToggleFavorite}
            aria-pressed={isFavorite}
          >
            <svg
              className="movie__icon"
              aria-hidden="true"
              width={24}
              height={24}
            >
              <use
                xlinkHref={`/images/sprite.svg#heart${
                  isFavorite ? "-filled" : ""
                }`}
              />
            </svg>
          </button>
        </div>
        </div>
        

        {movie.backdropUrl ? (
          <img
            className="movie__image"
            src={movie.backdropUrl}
            alt="Кадр из фильма"
          />
        ) : (
          <div className="movie__placeholder">{movie.title}</div>
        )}
      </div>

      <div className="movie__lower-block">
        <h2 className="movie__title">О фильме</h2>
        <ul className="movie__info">
          <li className="movie__indicator">
            <span className="movie__label">Язык оригинала</span>
            <span className="movie__dots" />
            <span className="movie__data">{movie.language}</span>
          </li>
          <li className="movie__indicator">
            <span className="movie__label">Бюджет</span>
            <span className="movie__dots" />
            <span className="movie__data">{formatRub(movie.budget)}</span>
          </li>
          <li className="movie__indicator">
            <span className="movie__label">Выручка</span>
            <span className="movie__dots" />
            <span className="movie__data">{formatRub(movie.revenue)}</span>
          </li>
          <li className="movie__indicator">
            <span className="movie__label">Режиссёр</span>
            <span className="movie__dots" />
            <span className="movie__data">{movie.director}</span>
          </li>
          <li className="movie__indicator">
            <span className="movie__label">Продакшен</span>
            <span className="movie__dots" />
            <span className="movie__data">{movie.production}</span>
          </li>
          <li className="movie__indicator">
            <span className="movie__label">Награды</span>
            <span className="movie__dots" />
            <span className="movie__data">
              {cutEndingDot(movie.awardsSummary)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MoviePage;
