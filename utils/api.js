const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = "https://api.themoviedb.org/3";

const requests = {
  getTrending: `${API_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  getNetflixOriginals: `${API_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  getTopRated: `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  getActionMovies: `${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  getComedyMovies: `${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  getHorrorMovies: `${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  getRomanceMovies: `${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  getDocumentaries: `${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
};

export default requests;
