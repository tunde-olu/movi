const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default {
  fetchTrending: {
    title: 'Trending',
    url: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchTopRated: {
    title: 'Top Rated',
    url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  fetchPopularMovies: {
    title: 'Popular',
    url: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  },
  fetchAction: {
    title: 'Action',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  },
  fetchComedyMovies: {
    title: 'Comedy',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  },
  fetchHorrorMovies: {
    title: 'Horror',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  },
  fetchRomanceMovies: {
    title: 'Romance',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  },
  fetchMysteryMovies: {
    title: 'Mystery',
    url: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchSciFiMovies: {
    title: 'Sci-Fi',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=878`,
  },
  fetchAdventureMovies: {
    title: 'Adventure',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=12`,
  },
  fetchCrimeMovies: {
    title: 'Crime',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=80`,
  },
  fetchWesternMovies: {
    title: 'Western',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=37`,
  },
  fetchAnimationMovies: {
    title: 'Animation',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=16`,
  },
  fetchHistoryMovies: {
    title: 'History',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=36`,
  },
  fetchThrillerMovies: {
    title: 'Thriller',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=53`,
  },
  fetchDramaMovies: {
    title: 'Drama',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=18`,
  },
  fetchWarMovies: {
    title: 'War',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10752`,
  },
  fetchTVMovies: {
    title: 'TV Movie',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10770`,
  },
  fetchUpcomingMovies: {
    title: 'Upcoming Movies',
    url: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
  },
};
