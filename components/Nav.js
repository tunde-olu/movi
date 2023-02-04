import {useRouter} from 'next/router';
import useCurrKeyState from '../atoms/currKeyAtom';
import useIsLoading from '../atoms/isLoading';
import useMoviesState from '../atoms/moviesState';
import usePageState from '../atoms/pageAtom';
import useQuery from '../atoms/searchInputAtom';
import requests from '../utils/requests';

const Nav = () => {
  const router = useRouter();
  const [query, setQuery] = useQuery();
  const [isLoading, setIsLoading] = useIsLoading();
  const [page, setPage] = usePageState();
  const [currKey, setCurrKey] = useCurrKeyState();

  const genre = typeof localStorage !== 'undefined' && localStorage.getItem('genre');

  const handleClick = async (key) => {
    if (key === genre) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setCurrKey(key);
    localStorage.setItem('genre', key);
    setQuery('');
    router.push(`/?genre=${key}`);
    setPage(1);
  };

  return (
    <nav className='relative max-w-full'>
      <div className='pr-16 flex px-5 sm:px-10 sm:px20 text-xl sm:text-2xl whitespace-nowrap space-x-6 sm:space-x-16 overflow-x-scroll scrollbar-hide mx-auto w-full max-w-screen-2xl'>
        {Object.entries(requests).map(([key, {title, url}]) => (
          <button
            key={key}
            className={`cursor-pointer transition duration-100 transform  rounded-full border border-black hover:animation-delay-1 px-4 hover:animate-bounce mt-3  ${
              genre === key ? 'bg-gray-200 text-black animate-pulse' : 'bg-gray-900 text-gray-300'
            }`}
            onClick={() => {
              handleClick(key);
            }}>
            {title}
          </button>
        ))}
      </div>
      <div className='absolute top-2  right-0  bg-gradient-to-l  from-[#111] h-full w-1/12' />
    </nav>
  );
};
export default Nav;
