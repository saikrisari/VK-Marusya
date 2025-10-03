import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../../api/GenresApi";
import { getMoviesByGenre } from "../../api/MoviesApi";

import adventure1x from "/images/adventure.jpg";
import adventure2x from "/images/adventure@2x.jpg";
import drama1x from "/images/drama.jpg";
import drama2x from "/images/drama@2x.jpg";
import comedy1x from "/images/comedy.jpg";
import comedy2x from "/images/comedy@2x.jpg";
import thriller1x from "/images/thriller.jpg";
import thriller2x from "/images/thriller@2x.jpg";
import crime1x from "/images/crime.jpg";
import crime2x from "/images/crime@2x.jpg";
import family1x from "/images/family.jpg";
import family2x from "/images/family@2x.jpg";
import scifi1x from "/images/scifi.jpg";
import scifi2x from "/images/scifi@2x.jpg";
import history1x from "/images/history.jpg";
import history2x from "/images/history@2x.jpg";

const genreImages: Record<string, { src: string; srcSet: string }> = {
  adventure: {
    src: adventure1x,
    srcSet: `${adventure1x} 1x, ${adventure2x} 2x`,
  },
  drama: {
    src: drama1x,
    srcSet: `${drama1x} 1x, ${drama2x} 2x`,
  },
  comedy: {
    src: comedy1x,
    srcSet: `${comedy1x} 1x, ${comedy2x} 2x`,
  },
  thriller: {
    src: thriller1x,
    srcSet: `${thriller1x} 1x, ${thriller2x} 2x`,
  },
  crime: {
    src: crime1x,
    srcSet: `${crime1x} 1x, ${crime2x} 2x`,
  },
  family: {
    src: family1x,
    srcSet: `${family1x} 1x, ${family2x} 2x`,
  },
  scifi: {
    src: scifi1x,
    srcSet: `${scifi1x} 1x, ${scifi2x} 2x`,
  },
  history: {
    src: history1x,
    srcSet: `${history1x} 1x, ${history2x} 2x`,
  },
};

interface Genre {
  name: string;
  image: {
    src: string;
    srcSet: string;
  };
}

const GenresList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();

      const transformed: Genre[] = await Promise.all(
        data.map(async (name) => {
          const image = genreImages[name];
          if (image) {
            return { name, image };
          }

          const movies = await getMoviesByGenre(name);
          const posterMovie = movies.find((m) => m.posterUrl);
          return {
            name,
            image: {
              src: posterMovie?.posterUrl || "#",
              srcSet: "",
            },
          };
        })
      );

      setGenres(transformed);
    };

    fetchGenres();
  }, []);

  return (
    <ul className="genres__list">
      {genres.map((genre) => (
        <li className="genres__item" key={genre.name}>
          <Link to={`/genre/${genre.name}`}>
            <img
              className="genres__card"
              loading="lazy"
              src={genre.image.src}
              srcSet={genre.image.srcSet}
              alt={`Жанр ${genre.name}`}
            />
            <span className="genres__name">
              {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GenresList;
