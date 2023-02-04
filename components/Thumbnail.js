import {HandThumbUpIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {auth} from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import '@animxyz/core';
import {XyzTransition} from '@animxyz/react';

const noImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const Thumbnail = (props) => {
  const {
    id,
    poster_path,
    backdrop_path,
    title,
    original_title,
    overview,
    media_type,
    release_date,
    first_air_date,
    vote_count,
    name,
    original_name,
  } = props;

  const router = useRouter();

  const baseURL = 'https://image.tmdb.org/t/p/w500';
  const imgSrc = `${baseURL}${poster_path || backdrop_path}`;

  const [user] = useAuthState(auth);

  const initYear = new Date(release_date).getFullYear();

  const year = isNaN(initYear) ? null : initYear;

  const linkToSingleMovie = () => {
    if (user) {
      return router.push(`/movies/${user.uid}/${id}`);
    }
    return router.push(`/movies/${id}`);
  };

  return (
    <XyzTransition
      appearVisible
      xyz='fade up small delay-1 out-down out-rotate-right'
      className='shadow-lg  shadow-black bg-[#222636] rounded-xl'>
      <div
        className='group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50  w-full max-w-[400px] md:max-w-[350px] 3xl:max-w-[300px] '
        onClick={linkToSingleMovie}>
        <div className='w-full h-[480px] sm:h-[400px] relative'>
          <Image
            priority
            src={poster_path || backdrop_path ? imgSrc : noImgUrl}
            fill
            sizes='(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw'
            alt={title || original_name || original_title}
            className=' rounded-lg rounded-b-none bg-[#111] outline-none border-none shadow-none'
          />
        </div>
        <div className='p-2'>
          <p className='max-w-md truncate text-gray-400'>{overview}</p>
          <h2 className='mt-1 text-2xl  transition-all duration-100 ease-in-out group-hover:font-bold '>
            {title || original_title || name || original_name}
          </h2>
          <p className='thumb-year text-gray-400 group-hover:hidden'>{year}</p>
          <p className='hidden text-gray-400 items-center md:group-hover:flex '>
            {media_type && `${media_type} •`} {release_date || first_air_date} •{' '}
            <HandThumbUpIcon className='h-5 mx-2' /> {vote_count}
          </p>
        </div>
      </div>
    </XyzTransition>
  );
};
export default Thumbnail;
