import {Audio, ThreeDots} from 'react-loader-spinner';
// import {Audio, BallTriangle, Bars, Dna, ThreeDots} from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='flex absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
      <Audio
        height='280'
        width='280'
        color='#aaa'
        ariaLabel='bars-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </div>
  );
};

export default Loader;

export const FetchLoader = () => {
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <ThreeDots
        height='100'
        width='100'
        radius='9'
        color='#bbb'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClassName='hidden'
      />
    </div>
  );
};
