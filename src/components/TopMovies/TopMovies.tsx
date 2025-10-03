import { useState, useEffect } from "react";
import type { FC } from "react";
import type { Movies } from "../../models";
import { Link } from "react-router-dom";
import { getTop10Movies } from "../../api/MoviesApi";

export const TopMovies: FC = () => {
  const [movies, setMovies] = useState<Movies>([]);

  useEffect(() => {
    getTop10Movies().then(setMovies);
  }, []);

  return (
    <div className="top">
      <h2 className="top__title">Топ 10 фильмов</h2>
      <div className="top__scroll">
        <ul className="top__list">
          {movies.map((m) => (
            <li className="top__item" key={m.id}>
              <Link to={`movie/${m.id}`}>
                {m.posterUrl ? (
                  <img className="top__image" src={m.posterUrl} alt={m.title} />
                ) : (
                  <div className="top__placeholder">{m.title}</div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopMovies;
