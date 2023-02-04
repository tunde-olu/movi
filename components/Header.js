import HeaderItem from './HeaderItem';
import {
  CheckBadgeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  BoltIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header>
      <div className='flex flex-col items-center sm:flex-row m-5 justify-between max-w-7xl mx-auto'>
        <div className='flex flex-grow justify-evenly max-w-2xl flex-wrap w-full'>
          <HeaderItem title='HOME' Icon={HomeIcon} />
          <HeaderItem title='TRENDING' Icon={BoltIcon} />
          <HeaderItem title='VERIFIED' Icon={CheckBadgeIcon} />
          <HeaderItem title='COLLECTIONS' Icon={RectangleStackIcon} />
          <HeaderItem title='SEARCH' Icon={MagnifyingGlassIcon} />
          <HeaderItem title='ACCOUNT' Icon={UserIcon} />
        </div>
        <div>
          <h1 className='text-4xl text-gray-100 text-shadow font-serif font-bold'>Movi</h1>
        </div>
      </div>
    </header>
  );
};
export default Header;
