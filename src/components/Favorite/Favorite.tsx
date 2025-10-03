import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import type { IMovie } from "../../models";
import { getMovie } from "../../api/MoviesApi";
import "../../styles/scss/blocks/_account.scss";

interface FavoriteProps {
  onRemoveFavorite: (id: number) => void;
}

const Favorite = ({ onRemoveFavorite }: FavoriteProps) => {
  const { favorites, isAuthChecked } = useAppSelector((s) => s.user);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    if (!isAuthChecked) return;

    const uniqueIds = Array.from(new Set(favorites));
    Promise.all(uniqueIds.map((id) => getMovie(Number(id)))).then(setMovies);
  }, [favorites, isAuthChecked]);

  return (
    <div className="account__grid">
      {movies.length === 0 ? (
        <div className="account__empty"></div>
      ) : (
        movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="account__grid-item"
          >
            <button
              className="account__grid-button"
              onClick={(e) => {
                e.preventDefault();
                onRemoveFavorite(movie.id);
              }}
            >
              <svg className="account__grid-icon" width={24} height={24}>
                <use xlinkHref="/images/sprite.svg#size-small" />
              </svg>
            </button>

            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={movie.title}
                width={224}
                height={336}
                className="account__grid-poster"
              />
            ) : (
              <div className="account__grid-placeholder">{movie.title}</div>
            )}
          </Link>
        ))
      )}
    </div>
  );
};

export default Favorite;
