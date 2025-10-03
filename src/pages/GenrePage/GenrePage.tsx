import type { FC } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IMovie } from "../../models";
import { Link } from "react-router-dom";
import { getMoviesByGenre } from "../../api/MoviesApi";
import "../../styles/scss/blocks/_genre.scss";
import "../../styles/scss/blocks/_btn.scss";

const INITIAL_COUNT = 15;
const LOAD_MORE_COUNT = 10;

export const GenrePage: FC = () => {
  const { genreName } = useParams();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    if (!genreName) return;
    getMoviesByGenre(genreName).then((list) => {
      const sorted = (list ?? []).sort((a, b) => b.tmdbRating - a.tmdbRating);
      setMovies(sorted);
      setVisibleCount(INITIAL_COUNT);
    });
  }, [genreName]);

  return (
    <div className="genre">
      <h1 className="genre__title">
        <Link to={"/genres"}>
          <svg
            className="genre__icon"
            aria-hidden="true"
            width={40}
            height={40}
          >
            <use xlinkHref="/images/sprite.svg#arrow"></use>
          </svg>
        </Link>

        {genreName
          ? genreName.charAt(0).toUpperCase() + genreName.slice(1)
          : ""}
      </h1>

      <ul className="genre__list">
        {movies.slice(0, visibleCount).map((m) => (
          <li className="genre__item" key={m.id}>
            <Link to={`/movie/${m.id}`}>
              <img
                className="genre__poster"
                src={m.posterUrl}
                alt={m.title}
                loading="lazy"
              />
            </Link>
          </li>
        ))}
      </ul>

      {movies.length > visibleCount && (
        <button
          type="button"
          className="btn"
          onClick={() =>
            setVisibleCount((n) => Math.min(n + LOAD_MORE_COUNT, movies.length))
          }
        >
          Показать еще
        </button>
      )}
    </div>
  );
};

export default GenrePage;
