import {TrashIcon} from '@heroicons/react/24/solid';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useAuthState} from 'react-firebase-hooks/auth';
import TimeAgo from 'timeago-react';
import {auth} from '../firebase';

const LikedMovie = (props) => {
  const {id, image, timestamp, title, deleteLikedMovie} = props;

  const router = useRouter();

  const [user] = useAuthState(auth);

  const year1 = 2020;

  const time = new Date(timestamp).getFullYear();

  return (
    <div className='group flex  justify-between space-x-2 bg-[#ababba] text-black hover:text-white max-w-sm hover:bg-[#222] hover:scale-105 md:hover:scale-110 transition-all duration-1000 p-2 rounded-xl shadow-md shadow-gray-900'>
      <div className='relative rounded-full w-1/3 max-w-[300px] h-[180px]'>
        <Image priority src={image} alt={title} fill className='rounded-lg' />
      </div>

      <div className='flex-1'>
        <p className='text-xl'>{title}</p>
        <p className='text-xs'>{year1}</p>
        <div className='text-xs text-gray-800 group-hover:text-gray-400'>
          <p>
            Added
            <TimeAgo datetime={timestamp} className='pl-2' />
          </p>
        </div>
      </div>

      <div className='flex flex-col justify-between items-center'>
        <TrashIcon className='h-8 w-8 cursor-pointer text-pink-600' onClick={() => deleteLikedMovie(id)} />
        <button
          className='bg-blue-900 text-white rounded-lg px-3 py-1'
          onClick={() => router.push(`/movies/${user.uid}/${id}`)}>
          Info
        </button>
      </div>
    </div>
  );
};
export default LikedMovie;
