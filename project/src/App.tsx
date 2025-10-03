import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuthInit } from "./store/slices/useAuthInit";

const LazyCustomLayout = lazy(() => import("./components/CustomLayout/CustomLayout"));
const LazyMainPage = lazy(() => import("./pages/MainPage/MainPage"));
const LazyGenresPage = lazy(() => import("./pages/GenresPage/GenresPage"));
const LazyGenrePage = lazy(() => import("./pages/GenrePage/GenrePage"));
const LazyMoviePage = lazy(() => import("./pages/MoviePage/MoviePage"));
const LazyAccountPage = lazy(() => import("./pages/AccountPage/AccountPage"));

const App = () => {
   useAuthInit();
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<LazyCustomLayout />}>
            <Route path="/" index element={<LazyMainPage />} />
            <Route path="/genres" element={<LazyGenresPage />} />
            <Route path="genre/:genreName" element={<LazyGenrePage />} />
            <Route path="movie/:movieId" element={<LazyMoviePage />} />
            <Route path="/account" element={<LazyAccountPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
