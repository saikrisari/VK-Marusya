import { useEffect, useState } from "react";
import { getMovie } from "../../api/MoviesApi";
import type { FC } from "react";
import type { IMovie } from "../../models";

interface TrailerModalProps {
  movieId: number;
  onClose: () => void;
}

const getYoutubeEmbedUrl = (url: string): string => {
  const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([\w\-]{11})/);
  const videoId = match?.[1];
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
    : "";
};

const TrailerModal: FC<TrailerModalProps> = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    getMovie(movieId).then(setMovie);
  }, [movieId]);

  if (!movie?.trailerUrl) return null;

  const trailerUrl = getYoutubeEmbedUrl(movie.trailerUrl);

  return (
    <div className="trailer">
      <div className="trailer__content">
        <iframe
          className="trailer__window"
          width="960"
          height="540"
          src={trailerUrl}
          title="Трейлер"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

        <button className="trailer__button" onClick={onClose}>
          <svg
            className="trailer__icon"
            aria-hidden="true"
            width={24}
            height={24}
          >
            <use xlinkHref="/images/sprite.svg#size-large"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TrailerModal;
