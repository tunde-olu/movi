import {onAuthStateChanged, signInWithPopup} from 'firebase/auth';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';
import {auth, provider} from '../firebase';

const LoginPage = () => {
  const [user, setUser] = useState('');
  const router = useRouter();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // ...
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace(`/account/profile/${user.uid}`);
        setUser(user);
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, [user]);

  return (
    <div>
      <Header />
      <Nav />
      <div className='min-h-[60vh]'>
        <div className='flex items-center justify-center min-h-[40vh]'>
          <button className='rounded-lg bg-blue-900 px-6 py-2 text-2xl tracking-wider' onClick={signIn}>
            Sign in with Google
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default LoginPage;
