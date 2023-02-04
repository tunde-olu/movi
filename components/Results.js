import Thumbnail from './Thumbnail';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import requests from '../utils/requests';
import useQuery from '../atoms/searchInputAtom';
import useIsLoading from '../atoms/isLoading';
import usePageState from '../atoms/pageAtom';
import useMoviesState from '../atoms/moviesState';
import Loader, {FetchLoader} from './Loader';
import Footer from './Footer';

const Results = ({serverData: newServerData}) => {
  const router = useRouter();

  const serverData = JSON.parse(newServerData);

  const [query, setQuery] = useQuery();

  const [data, setData] = useMoviesState();

  const [totalPages, setTotalPages] = useState();

  const mounted = useRef(false);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const genre = router.query.genre;

  const [isLoading, setIsLoading] = useIsLoading();

  const [fetchLoading, setFetchLoading] = useState(false);

  const [page, setPage] = usePageState();

  const [newMovies, setNewMovies] = useState(false);

  const [showFooter, setShowFooter] = useState(false);

  const [emptyData, setEmptyData] = useState(false);

  let url;

  const localQuery =
    typeof localStorage !== 'undefined' && localStorage.getItem('query') ? localStorage.getItem('query') : query;

  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${localQuery}&page=${page}&include_adult=false`;

  const fetchURL = () => {
    switch (genre) {
      case 'fetchUpcomingMovies':
        url = `https://api.themoviedb.org/3${requests[genre]?.url}&page=${page}`;

        break;
      case 'fetchTopRated':
        url = `https://api.themoviedb.org/3${requests[genre]?.url}&page=${page}`;

        break;
      case 'fetchPopularMovies':
        url = `https://api.themoviedb.org/3${requests[genre]?.url}&page=${page}`;
        break;

      case 'search':
        url = searchURL;
        break;

      default:
        url = `https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchTrending.url}&page=${page}`;
    }
  };

  const fetchMovies = async () => {
    setFetchLoading(true);
    fetchURL();

    setShowFooter(false);

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data?.results?.length === 0) {
        setEmptyData(true);
      }

      setData((oldMovies) => {
        if (page === 1) {
          return data.results;
        } else {
          return [...oldMovies, ...data.results];
        }
      });
      setTotalPages(data.total_pages);
      setNewMovies(false);
      setFetchLoading(false);
      setIsLoading(false);
    } catch (error) {
      setNewMovies(false);
      setIsLoading(false);
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    setEmptyData(false);
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (localStorage.getItem('genre') !== genre) return;

    fetchMovies();
  }, [page, query]);

  useEffect(() => {
    setEmptyData(false);
    if (query) {
      fetchMovies();
      return;
    }
    setData(serverData);
    setIsLoading(false);
  }, [genre]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newMovies) return;
    if (isLoading) return;

    if (page >= 500 || page >= totalPages) {
      setShowFooter(true);
      return;
    }

    setPage((oldPage) => oldPage + 1);
  }, [newMovies]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5) {
      setNewMovies(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', event);

    return () => window.removeEventListener('scroll', event);
  }, []);

  return (
    <div>
      <div className='min-h-[60vh] mx-auto'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data.length !== 0 && (
              <>
                <div className='p-5 xl:px-10 mx-auto my-10 sm:grid  3xl:grid-cols-5 max-w-[2000px] justify-center  w-fit space-y-5 sm:space-y-0  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8'>
                  {data.map((result, index) => {
                    let editedID = `${result.id}${index}${result.original_name}`;
                    editedID = String(editedID);

                    return <Thumbnail key={editedID} {...result} />;
                  })}
                </div>
                {fetchLoading && <FetchLoader />}
              </>
            )}
            {emptyData && (
              <div className='flex justify-center items-center pt-48 px-4 text-center'>
                <p className='text-2xl text-gray-300'>There are no results that match your search</p>
              </div>
            )}
          </>
        )}
      </div>
      {showFooter && <Footer />}
    </div>
  );
};
export default Results;
