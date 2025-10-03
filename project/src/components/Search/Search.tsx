import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";
import type { IMovie } from "../../models";
import { searchMovies } from "../../api/MoviesApi";
import { getRatingClass, formatRuntime } from "../../utils/movie";
import "../../styles/scss/blocks/_search.scss";

type SearchProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const Search: FC<SearchProps> = ({ isOpen = false, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IMovie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    let mounted = true;
    searchMovies(query).then((movies) => {
      if (mounted) setResults(movies.slice(0, 5));
    });
    return () => {
      mounted = false;
    };
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClose = useCallback(() => {
    setQuery("");
    setResults([]);
    onClose?.();
  }, [onClose]);

  const handleSelect = (id: number) => {
    navigate(`/movie/${id}`);
    setQuery("");
    setResults([]);
    onClose?.();
  };

  return (
    <>
      {isOpen && <div className="search__overlay" onClick={handleClose} />}
      <div className={`search ${isOpen ? "search--active" : ""}`}>
        <div className="search__wrapper">
          <svg className="search__icon" aria-hidden="true" width={24} height={24}>
            <use xlinkHref="/images/sprite.svg#search" />
          </svg>

          <input
            type="search"
            placeholder="Поиск"
            value={query}
            onChange={handleChange}
            className="search__input"
            autoFocus={isOpen}
          />

          <button
            type="button"
            className="search__button"
            onClick={handleClose}
            aria-label="Закрыть поиск"
          >
            <svg className="search__close" aria-hidden="true" width={24} height={24}>
              <use xlinkHref="/images/sprite.svg#size-small" />
            </svg>
          </button>
        </div>

        {results.length > 0 && (
          <ul className="search__results">
            {results.map((m) => (
              <li
                key={m.id}
                className="search__item"
                onClick={() => handleSelect(m.id)}
              >
                {m.posterUrl ? (
                  <img
                    className="search__poster"
                    src={m.posterUrl}
                    alt={m.title}
                    width={40}
                    height={52}
                  />
                ) : (
                  <div className="search__placeholder">{m.title}</div>
                )}
                <div className="search__content">
                  <div className="search__info">
                    <span className={`search__rating ${getRatingClass(m.tmdbRating)}`}>
                      <svg className="search__star" aria-hidden="true" width={10} height={10}>
                        <use xlinkHref="/images/sprite.svg#star" />
                      </svg>
                      {Math.round(m.tmdbRating * 10) / 10}
                    </span>
                    <span className="search__indicator">{m.releaseYear}</span>
                    <span className="search__indicator">{m.genres.join(", ")}</span>
                    <span className="search__indicator">{formatRuntime(m.runtime)}</span>
                  </div>
                  <p className="search__title">{m.title}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Search;
