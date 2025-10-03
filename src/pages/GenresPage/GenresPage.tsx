import type { FC } from "react";
import "../../styles/scss/blocks/_genres.scss";
import GenresList from "../../components/GenresList/GenresList";

export const GenresPage: FC = () => {
  return (
    <div className="genres">
      <h1 className="genres__title">Жанры фильмов</h1>
      <GenresList />
    </div>
  );
};

export default GenresPage;
