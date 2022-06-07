import Image from "next/image";
import { useDispatch } from "react-redux";
import { setCurrentMovie, setModalOpen } from "../redux/modalSlice";

const MovieThumbnail = ({ movie }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(setCurrentMovie(movie));
        dispatch(setModalOpen());
      }}
      className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className='rounded-sm object-cover md:rounded'
        layout='fill'
        alt='movie thumbnail cover'
      />
    </div>
  );
};

export default MovieThumbnail;
