import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMovie, setModalClose } from "../redux/modalSlice";
import ReactPlayer from "react-player/lazy";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import toast, { Toaster } from "react-hot-toast";

const Modal = () => {
  const { currentMovie } = useSelector((state) => state.modal);
  const [trailer, setTrailer] = useState("");
  const [muted, setMuted] = useState(true);
  const [genres, setGenres] = useState([]);
  const [addedToList, setAddedToList] = useState(false);
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  const dispatch = useDispatch();

  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  const handleClose = () => {
    dispatch(setModalClose());
    dispatch(setCurrentMovie(null));
    toast.dismiss();
  };

  const fetchMovie = async () => {
    const res = await axios(
      `https://api.themoviedb.org/3/${
        currentMovie?.media_type === "tv" ? "tv" : "movie"
      }/${currentMovie?.id}?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&append_to_response=videos`
    );

    if (res.data?.videos) {
      const index = res.data.videos.results.findIndex(
        (element) => element.type === "Trailer"
      );
      setTrailer(res.data.videos?.results[index]?.key);
    }
    if (res.data?.genres) {
      setGenres(res.data.genres);
    }
  };

  useEffect(() => {
    if (!currentMovie) return;

    fetchMovie();
  }, [currentMovie]);

  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => setMovies(snapshot.docs)
      );
    }
  }, [db, currentMovie?.id]);

  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === currentMovie?.id) !==
          -1
      ),
    [movies]
  );

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "customers", user?.uid, "myList", currentMovie?.id.toString())
      );

      toast(
        `${
          currentMovie?.title || currentMovie?.original_name
        } has been removed from My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    } else {
      await setDoc(
        doc(db, "customers", user?.uid, "myList", currentMovie?.id.toString()),
        {
          ...currentMovie,
        }
      );

      toast(
        `${
          currentMovie?.title || currentMovie?.original_name
        } has been added to My List.`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    }
  };

  return (
    <div className='!z-50 fixed top-0 left-0 right-0 bottom-0 bg-black/50'>
      <div className='!z-50 mx-auto !top-7 w-full max-w-[850px] overflow-hidden overflow-y-scroll rounded-md scrollbar-hide relative'>
        <Toaster position='bottom-center' />
        <button
          onClick={handleClose}
          className='absolute right-5 top-5 !z-50 h-9 w-9 border-none rounded-full bg-[#181818]'
        >
          <XIcon className='h-6 w-6 mx-auto' />
        </button>
        <div className='relative pt-[56.25%]'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width='100%'
            height='100%'
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
            <div className='flex space-x-2'>
              <button className='flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                <FaPlay className='h-7 w-7 text-black' />
                Play
              </button>
              <button onClick={handleList} className='modalButton'>
                {addedToList ? (
                  <CheckIcon className='h-7 w-7' />
                ) : (
                  <PlusIcon className='h-7 w-7' />
                )}
              </button>
              <button className='modalButton'>
                <ThumbUpIcon className='h-6 w-6' />
              </button>
            </div>
            <button className='modalButton' onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className='h-6 w-6' />
              ) : (
                <VolumeUpIcon className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
        <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
          <div className='space-y-6 text-lg'>
            <div className='flex items-center space-x-2 text-sm'>
              <p className='font-semibold text-green-400'>
                {currentMovie?.vote_average * 10}% Match
              </p>
              <p className='font-light'>
                {currentMovie?.release_date || currentMovie?.first_air_date}
              </p>
              <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>
                HD
              </div>
            </div>
            <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
              <p className='w-5/6'>{currentMovie?.overview}</p>
              <div className='flex flex-col space-y-3 text-sm'>
                <div>
                  <span className='text-[gray]'>Genres:</span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className='text-[gray]'>Original language:</span>{" "}
                  {currentMovie?.original_language}
                </div>

                <div>
                  <span className='text-[gray]'>Total votes:</span>{" "}
                  {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
