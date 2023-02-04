import {useRouter} from 'next/router';
import {useAuthState} from 'react-firebase-hooks/auth';
import useCurrKeyState from '../atoms/currKeyAtom';
import useIsLoading from '../atoms/isLoading';
import usePageState from '../atoms/pageAtom';
import useQuery from '../atoms/searchInputAtom';
import {auth} from '../firebase';

const HeaderItem = ({title, Icon}) => {
  const [query, setQuery] = useQuery();
  const router = useRouter();
  const [page, setPage] = usePageState();
  const [currKey, setCurrKey] = useCurrKeyState();
  const [isLoading, setIsLoading] = useIsLoading();

  const [user] = useAuthState(auth);

  const searchHandler = (e) => {
    if (!e.currentTarget.classList.contains('SEARCH')) return;
    const text = prompt('Enter a movie name');
    if (text === null) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setCurrKey('search');
    // revisit
    localStorage.setItem('genre', 'search');
    setQuery('');
    setQuery(text);
    localStorage.setItem('query', text);
    router.push('/?genre=search');
    setPage(1);
  };

  const profileHandler = (e) => {
    if (!e.currentTarget.classList.contains('ACCOUNT')) return;
    if (user) {
      router.push(`/account/profile/${user.uid}`);
    } else {
      router.push('/login');
    }
  };

  const gotoTrending = (e) => {
    if (!e.currentTarget.classList.contains('TRENDING')) return;
    localStorage.setItem('genre', 'fetchTrending');
    router.push('/?genre=fetchTrending');
  };
  const gotoHome = (e) => {
    if (!e.currentTarget.classList.contains('HOME')) return;
    localStorage.setItem('genre', 'fetchTopRated');
    router.push('/?genre=fetchTopRated');
  };

  const handlers = (e) => {
    localStorage.setItem('genre', null);
    setIsLoading(true);
    searchHandler(e);
    profileHandler(e);
    gotoTrending(e);
    gotoHome(e);
  };

  return (
    <div
      className={`group flex flex-col items-center w-12 cursor-pointer sm:w-20 hover:text-white ${title}`}
      onClick={handlers}>
      <Icon className='h-8 mb-1 hover:animate-bounce hover:animation-delay-1' />
      <p className='tracking-widest opacity-0 group-hover:opacity-100'>{title}</p>
    </div>
  );
};
export default HeaderItem;
