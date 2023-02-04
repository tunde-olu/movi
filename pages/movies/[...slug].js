import {getAuth} from 'firebase/auth';
import {collection, getDocs} from 'firebase/firestore';
import Error from 'next/error';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import SingleMovie from '../../components/SingleMovie';
import {auth, db} from '../../firebase';

const SingleMoviePage = (props) => {
  const {movieData, preFetchedLikes} = props;
  const [movieNotFound, setMovieNotFound] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (movieData?.status_code === 34) {
      // router.push('/');
      setMovieNotFound(true);
    }
  }, []);

  if (movieNotFound) return <Error statusCode={404} title='Page Not Found' />;

  return (
    <>
      <Head>
        <title>{movieData.title && movieData.original_title}</title>
      </Head>
      <Header />
      <Nav />
      <SingleMovie movieData={movieData} preFetchedLikes={preFetchedLikes} />
      <Footer />
    </>
  );
};
export default SingleMoviePage;

export const getServerSideProps = async (context) => {
  const slug = context.params.slug;
  const id = slug.length === 2 ? context.params.slug[1] : context.params.slug[0];

  const uid = slug.length === 2 && slug[0];

  const searchURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;

  const res = await fetch(searchURL);
  const data = await res.json();

  let preFetchedLikes = [];

  if (uid) {
    try {
      const likesRef = collection(db, 'users', uid, 'likes');

      const querySnapshot = await getDocs(likesRef);

      querySnapshot?.forEach((doc) => {
        preFetchedLikes.push(doc.data());
      });
    } catch (error) {}
  }

  if (!id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {movieData: data, preFetchedLikes: JSON.stringify(preFetchedLikes)},
  };
};
