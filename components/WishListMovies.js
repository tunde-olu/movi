import Image from 'next/image';
import {useEffect, useState} from 'react';
import {auth, db} from '../firebase';
import {collection, deleteDoc, getDocs, onSnapshot, query, where} from 'firebase/firestore';
import {ArrowLeftIcon, MagnifyingGlassIcon} from '@heroicons/react/24/solid';
import LikedMovie from './LikedMovie';
import {useRouter} from 'next/router';
import {useAuthState} from 'react-firebase-hooks/auth';

const WishListMovies = (props) => {
  const {wishList} = props;
  const [user] = useAuthState(auth);
  const [input, setInput] = useState('');
  const [isEditing, setisEditing] = useState(false);

  const router = useRouter();

  const parsedWishList = JSON.parse(wishList);

  const [likes, setLikes] = useState(parsedWishList);

  const q = collection(db, 'users', user.uid, 'likes');

  const [initialLikes, setInitialLikes] = useState(wishList);

  const deleteLikedMovie = async (id) => {
    const q = query(collection(db, 'users', user.uid, 'likes'), where('id', '==', id));

    const docsSnap = await getDocs(q);

    docsSnap.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };

  const searchWishlistHandler = (e) => {
    const initialState = [...likes];
    const input = e.target.value;
    setInput(e.target.value);
    const searchLikes = initialLikes.filter((movie) => movie.title.toLowerCase().includes(input.toLowerCase()));

    setLikes(searchLikes);
    if (input === '') {
      setisEditing(false);
    }
  };

  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
          data.push({...doc.data(), timestamp: doc.data().timestamp.toDate()});
        });
        data?.sort((a, b) => b.timestamp - a.timestamp);
        setLikes(data);
        setInitialLikes(data);
      }),
    []
  );

  return (
    <div className='px-2'>
      <div className='flex flex-col items-center justify-center space-y-5 my-16'>
        <Image
          src={user?.photoURL}
          width={480}
          height={480}
          alt={user?.displayName}
          className='w-28 h-28 rounded-full mx-auto'
        />
        <h1 className='text-3xl'>
          Welcome <span className='text-yellow-100'>{user.displayName}</span>
        </h1>
        <p className='max-w-xs text-center text-[#c3bdbd] bg-slate-900 rounded-xl p-2'>
          Use this screen to manage your wishlist. Click on the trash icon in <span className='text-pink-600'>red</span>{' '}
          to remove any movie you wish to delete from your wishlist.
        </p>
      </div>
      <div>
        <div>
          <div className='flex items-center justify-between max-w-screen-lg mx-auto'>
            <div className='flex space-x-4'>
              <ArrowLeftIcon className='h-10 w-10  cursor-pointer' onClick={() => router.back()} />
              <h1 className='text-4xl text-gray-200'>WishList</h1>
            </div>
            {/* Optimization needed */}
            {initialLikes.length > 0 &&
              (isEditing ? (
                <input
                  type='text'
                  onChange={searchWishlistHandler}
                  className='w-28 md:w-40 bg-gray-100 text-black px-2 rounded-lg outline-none placeholder:text-gray-600 placeholder:italic'
                  placeholder='Search...'
                />
              ) : (
                <MagnifyingGlassIcon className='h-10 w-10 cursor-pointer' onClick={() => setisEditing(true)} />
              ))}
          </div>
          {likes.length > 0 ? (
            <div className='grid gap-10 wishlist-grid max-w-screen-xl px-10 mx-auto justify-center my-20  items-center py-4'>
              {likes.map((movie) => (
                <LikedMovie {...movie} key={movie.id} deleteLikedMovie={deleteLikedMovie} />
              ))}
            </div>
          ) : (
            <div className='my-8 flex flex-col items-center'>
              <p className='text-2xl'>Your wishlish is empty</p>
              <button className='bg-gray-500 p-1 px-3 my-2 text-white rounded-full' onClick={() => router.push('/')}>
                Add Movies
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default WishListMovies;
