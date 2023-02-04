import {atom, useRecoilState} from 'recoil';

const isLoading = atom({
  key: 'isLoading',
  default: false,
});

const useIsLoading = () => {
  return useRecoilState(isLoading);
};

export default useIsLoading;
