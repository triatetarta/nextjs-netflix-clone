import { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import MovieThumbnail from "./MovieThumbnail";

const MovieRow = ({ title, movies }) => {
  const [isMoved, setIsMoved] = useState(false);
  const rowRef = useRef(null);

  const onClickHandler = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
      <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
        {title}
      </h2>
      <div className='group relative md:-ml-2'>
        <div className='absolute top-0 bottom-0 left-0 px-2 bg-[#141414]/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition overflow-hidden z-40'>
          <ChevronLeftIcon
            onClick={() => onClickHandler("left")}
            className={`z-40 h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
              !isMoved ? "hidden" : ""
            }`}
          />
        </div>
        <div
          className='flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2 relative'
          ref={rowRef}
        >
          {movies?.map((movie) => (
            <MovieThumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <div className='absolute top-0 bottom-0 right-0 pl-3 bg-[#141414]/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition overflow-hidden'>
          <ChevronRightIcon
            onClick={() => onClickHandler("right")}
            className='z-40 h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 mr-1'
          />
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
