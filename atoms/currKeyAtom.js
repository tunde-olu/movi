import {atom, useRecoilState} from 'recoil';

const currKeyAtom = atom({
  key: 'currKeyState',
  default: '',
});

const useCurrKeyState = () => useRecoilState(currKeyAtom);

export default useCurrKeyState;
