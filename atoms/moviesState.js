import {atom, useRecoilState} from 'recoil';

const moviesState = atom({
  key: 'moviesData',
  default: [],
});

const useMoviesState = () => useRecoilState(moviesState);

export default useMoviesState;
