import {atom, useRecoilState} from 'recoil';

const pageState = atom({
  key: 'pageState',
  default: 1,
});

const usePageState = () => useRecoilState(pageState);

export default usePageState;
