import {HeartIcon} from '@heroicons/react/24/outline';
import {HeartIcon as HeartIconFilled} from '@heroicons/react/24/solid';
import {addDoc, collection, deleteDoc, getDocs, onSnapshot, query, serverTimestamp, where} from 'firebase/firestore';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, db} from '../firebase';
import {durationConvert, isoLanguageConvert} from '../utils/functions';

const noImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const SingleMovie = (props) => {
  const {movieData, preFetchedLikes} = props;

  const serverLikes = JSON.parse(preFetchedLikes);

  const id = movieData.id;
  const title = movieData.title || movieData.original_title;
  const release_date = movieData.release_date;
  const tagline = movieData.tagline;
  const production_countries = movieData.production_countries;
  const production_companies = movieData.production_companies;
  const runtime = movieData.runtime;
  const genres = movieData.genres;
  const homepage = movieData.homepage;
  const overview = movieData.overview;
  const original_language = movieData.original_language;
  const poster_path = movieData.poster_path;
  const backdrop_path = movieData.backdrop_path;
  const year = release_date && new Date(release_date).getFullYear();

  const baseURL = 'https://image.tmdb.org/t/p/w500';

  const language = original_language && isoLanguageConvert(original_language);

  const duration = durationConvert(runtime);

  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState(serverLikes);

  const [hasLiked, setHasLiked] = useState(false);

  const imgToDisplay = poster_path ? `${baseURL}${poster_path}` : noImgUrl;

  const addToFavorite = async () => {
    if (!user) return;

    if (hasLiked) {
      const q = query(collection(db, 'users', user.uid, 'likes'), where('id', '==', id));
      const docSnap = await getDocs(q);

      docSnap.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } else {
      await addDoc(collection(db, 'users', user.uid, 'likes'), {
        title: title,
        id,
        user: user.email,
        image: imgToDisplay,
        timestamp: serverTimestamp(),
        uid: user.uid,
        userImg: user.photoURL,
      });
    }
  };

  useEffect(() => {
    if (!user) return;

    const unsubsribe = onSnapshot(collection(db, 'users', user.uid, 'likes'), (snapshot) => {
      setLikes(snapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      unsubsribe();
    };
  }, [user]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === id) !== -1);
  }, [likes, db]);

  return (
    <div>
      <div className='w-full max-w-5xl p-4 mx-auto items-center flex flex-col md:flex-row justify-center  md:space-x-16 md:items-start my-10 '>
        <div className='w-full max-w-xl mx-auto'>
          <h1 className='text-white text-3xl'>{title}</h1>
          {tagline && <p className='text-gray-500 my-2'>{tagline}</p>}
          <div className='flex space-x-1'>
            <p>
              {year} {'•'}
            </p>
            {runtime && <p>{duration}</p>}
          </div>
          {user && (
            <div className='flex items-center space-x-2 mt-4'>
              {hasLiked ? (
                <>
                  <HeartIconFilled className='w-6 h-6 text-red-500' onClick={addToFavorite} />
                  <p>You liked this movie</p>
                </>
              ) : (
                <>
                  <HeartIcon className='w-6 h-6' onClick={addToFavorite} />
                  <p>Add to favorites list</p>
                </>
              )}
            </div>
          )}
          <div className='my-6 flex flex-col  items-start gap-4'>
            <Image
              priority
              src={imgToDisplay}
              width={1080}
              height={1920}
              className='max-w-sm h-[500px] w-full rounded-sm'
              alt={title}
            />

            {backdrop_path && (
              <Image
                priority
                src={`${baseURL}${backdrop_path}`}
                width={1920}
                height={1080}
                className='max-h-[368px] max-w-[600px] w-full rounded-sm'
                alt={title}
              />
            )}
          </div>
        </div>

        <div className='mt-16 md:mt-24'>
          {genres && (
            <div className='flex space-x-4 items-center flex-wrap gap-2'>
              {genres.map((genre) => (
                <button key={genre.id} className='bg-gray-700 rounded-lg px-3 py-1 text-white'>
                  {genre.name}
                </button>
              ))}
            </div>
          )}
          <div>
            <div className='mt-6 flex items-center space-x-2'>
              <div className='w-1 h-8  bg-yellow-300 rounded-md' />
              <h1 className='text-white text-4xl my-10'>Storyline</h1>
            </div>
            <p className='max-w-sm py-2'>{overview}</p>
          </div>
          <div className='w-full max-w-3xl mt-16 md:mt-24'>
            <div className='my-6 flex items-center space-x-2'>
              <div className='w-1 h-8  bg-yellow-300 rounded-md' />
              <h1 className='text-white text-4xl my-8'>Details</h1>
            </div>
            {release_date && (
              <p className=' border-y-[0.1px] py-2'>
                Release date
                <span className='text-blue-400 pl-4'>{new Date(release_date).toDateString()}</span>
              </p>
            )}
            {production_countries && (
              <p className='flex flex-col md:flex-row  border-b-[0.1px] py-2'>
                Country of origin
                <span className='text-blue-400 md:pl-4'>
                  {production_countries.map((country, index) => {
                    if (index + 1 !== production_countries.length) {
                      return (
                        <span key={country.name}>
                          {country.name} <span>•</span>{' '}
                        </span>
                      );
                    }
                    return <span key={country.name}>{country.name}</span>;
                  })}
                </span>
              </p>
            )}
            {production_companies && (
              <p className='flex flex-col md:flex-row  border-b-[0.1px] py-2'>
                Production companies
                <span className='text-blue-400 md:pl-4'>
                  {production_companies.map((company, index) => {
                    if (index + 1 !== production_companies.length) {
                      return (
                        <span key={company.id}>
                          {company.name} <span className='text-white'>•</span>{' '}
                        </span>
                      );
                    }
                    return <span key={company.id}>{company.name}</span>;
                  })}
                </span>
              </p>
            )}
            {original_language && (
              <p className=' border-b-[0.1px] py-2'>
                Original language
                <span className='text-blue-400 pl-4'>{language}</span>{' '}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleMovie;
