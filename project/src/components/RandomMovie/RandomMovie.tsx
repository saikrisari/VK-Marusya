import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";
import type { IMovie } from "../../models";
import { getRandomMovie } from "../../api/MoviesApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setModal } from "../../store/slices/modalSlice";
import { getRatingClass, formatRuntime } from "../../utils/movie";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from "../../api/UserApi";
import { updateFavorites } from "../../store/slices/userSlice";
import TrailerModal from "../TrailerModal/TrailerModal";

const RandomMovie: FC = () => {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [isTrailerOpen, setTrailerOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { favorites, isAuthenticated } = useAppSelector((state) => state.user);

  const loadNewMovie = () => {
    getRandomMovie().then(setMovie);
  };

  useEffect(() => {
    loadNewMovie();
  }, []);

  const movieId = movie?.id;
  const isFavorite = movieId ? favorites.includes(String(movieId)) : false;

  const handleToggleFavorite = async () => {
    if (!isAuthenticated || !movieId) {
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
    <div className="main__random">
      <div className="main__hero">
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
        <div className="main__desktop">
          <button
            type="button"
            onClick={() => setTrailerOpen(true)}
            className="btn main__trailer"
          >
            Трейлер
          </button>

          <Link to={`/movie/${movie.id}`} className="btn__secondary">
            О фильме
          </Link>

          <button
            type="button"
            className="btn__secondary btn__secondary--round"
            onClick={handleToggleFavorite}
            aria-pressed={isFavorite}
          >
            <svg
              className="main__icon"
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

          <button
            type="button"
            className="btn__secondary btn__secondary--round"
            onClick={loadNewMovie}
          >
            <svg
              className="main__icon"
              aria-hidden="true"
              width={24}
              height={24}
            >
              <use xlinkHref="/images/sprite.svg#reload" />
            </svg>
          </button>
        </div>

        <div className="main__mobile">
          <button
            type="button"
            onClick={() => setTrailerOpen(true)}
            className="btn main__trailer"
          >
            Трейлер
          </button>
          <div className="main__wrapper">
            <Link to={`/movie/${movie.id}`} className="btn__secondary">
              О фильме
            </Link>

            <button
              type="button"
              className="btn__secondary btn__secondary--round"
              onClick={handleToggleFavorite}
              aria-pressed={isFavorite}
            >
              <svg
                className="main__icon"
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

            <button
              type="button"
              className="btn__secondary btn__secondary--round"
              onClick={loadNewMovie}
            >
              <svg
                className="main__icon"
                aria-hidden="true"
                width={24}
                height={24}
              >
                <use xlinkHref="/images/sprite.svg#reload" />
              </svg>
            </button>
          </div>
        </div>

        {isTrailerOpen && (
          <TrailerModal
            movieId={movie.id}
            onClose={() => setTrailerOpen(false)}
          />
        )}
      </div>
      {movie.backdropUrl ? (
        <img
          className="main__image"
          src={movie.backdropUrl}
          alt="Кадр из фильма"
        />
      ) : (
        <div className="main__placeholder">{movie.title}</div>
      )}
    </div>
  );
};

export default RandomMovie;
