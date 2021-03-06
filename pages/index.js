import { getProducts } from "@stripe/firestore-stripe-payments";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Modal from "../components/Modal";
import MovieRow from "../components/MovieRow";
import Plans from "../components/Plans";
import Showcase from "../components/Showcase";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import useSubscription from "../hooks/useSubscription";
import payments from "../lib/stripe";
import requests from "../utils/api";

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products,
}) => {
  const { user, loading } = useAuth();
  const list = useList(user?.uid);
  const { modalOpen } = useSelector((state) => state.modal);
  const subscription = useSubscription(user);
  const [scrollStyle, setScrollStyle] = useState("");

  useEffect(() => {
    if (modalOpen) {
      setScrollStyle("!overflow-hidden");
    }
    if (!modalOpen) {
      setScrollStyle("");
    }
  }, [modalOpen]);

  if (!user || loading || subscription === null) return null;

  if (!subscription) return <Plans products={products} />;

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${scrollStyle}`}
    >
      <Head>
        <title>Netflix Clone</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-10'>
        <Showcase netflixOriginals={netflixOriginals} />

        <section className='md:space-y-24'>
          <MovieRow title='Trending Now' movies={trendingNow} />
          <MovieRow title='Top Rated' movies={topRated} />
          <MovieRow title='Action Thrillers' movies={actionMovies} />

          {list.length > 0 && <MovieRow title='My List' movies={list} />}

          <MovieRow title='Comedies' movies={comedyMovies} />
          <MovieRow title='Scary Movies' movies={horrorMovies} />
          <MovieRow title='Romance Movies' movies={romanceMovies} />
          <MovieRow title='Documentaries' movies={documentaries} />
        </section>
      </main>

      <AnimatePresence>{modalOpen && <Modal />}</AnimatePresence>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    axios(requests.getNetflixOriginals).then((res) => res.data),
    axios(requests.getTrending).then((res) => res.data),
    axios(requests.getTopRated).then((res) => res.data),
    axios(requests.getActionMovies).then((res) => res.data),
    axios(requests.getComedyMovies).then((res) => res.data),
    axios(requests.getHorrorMovies).then((res) => res.data),
    axios(requests.getRomanceMovies).then((res) => res.data),
    axios(requests.getDocumentaries).then((res) => res.data),
  ]);

  return {
    props: {
      products,
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
