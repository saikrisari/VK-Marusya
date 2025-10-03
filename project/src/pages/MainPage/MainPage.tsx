import type { FC } from "react";
import "../../styles/scss/blocks/_main.scss";
import "../../styles/scss/blocks/_btn.scss";
import RandomMovie from "../../components/RandomMovie/RandomMovie";
import TopMovies from "../../components/TopMovies/TopMovies";

export const MainPage: FC = () => {
  return (
    <div className="main">
      <RandomMovie />
      <TopMovies />
    </div>
  );
};

export default MainPage;
