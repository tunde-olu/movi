import {auth, db} from '../../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useRouter} from 'next/router';
import {onAuthStateChanged} from 'firebase/auth';
import {useState} from 'react';
import Head from 'next/head';
import Header from '../../../components/Header';
import Nav from '../../../components/Nav';
import WishListMovies from '../../../components/WishListMovies';
import {collection, getDocs} from 'firebase/firestore';
import Footer from '../../../components/Footer';

const ProfilePage = (props) => {
  const {wishList} = props;

  const [sessionUser, setSessionUser] = useState('');

  const [user] = useAuthState(auth);

  const router = useRouter();

  const firstName = user?.displayName.split(' ')[0];

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSessionUser(user);
      const uid = user.uid;
      // ...
    } else {
      router.push('/login');
      setSessionUser('');
    }
  });

  if (!sessionUser) return;

  return (
    <>
      <Head>
        <title>Welcome, {user.displayName}</title>
      </Head>
      <div>
        <Header />
        <Nav />
        <div className='flex justify-between px-10 text-xl my-10'>
          <div className='animate-pulse text-black '>
            <h1 className='opacity-0'>
              Hello, <span className='font-mono'> {user.displayName}</span>
            </h1>
          </div>
          <button
            className='bg-gray-600 px-5 py-2 rounded-3xl text-white animate-bounce hover:animate-none'
            onClick={() => {
              router.push('/');
              auth.signOut();
            }}>
            Sign out
          </button>
        </div>
        <WishListMovies wishList={wishList} />
      </div>
      <Footer />
    </>
  );
};
export default ProfilePage;

export const getServerSideProps = async (context) => {
  const uid = context.params.uid;

  const likesRef = collection(db, 'users', uid, 'likes');

  let wishList = [];

  const docSnap = await getDocs(likesRef);

  docSnap.forEach((doc) => {
    wishList.push({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
    });
  });

  wishList = wishList?.sort((a, b) => b.timestamp - a.timestamp);

  return {
    props: {wishList: JSON.stringify(wishList)},
  };
};
