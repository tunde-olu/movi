import {atom, useRecoilState} from 'recoil';

const searchInputState = atom({
  key: 'searchInputState',
  default: '',
});

const useQuery = () => {
  return useRecoilState(searchInputState);
};

// export default searchInputState;
export default useQuery;
