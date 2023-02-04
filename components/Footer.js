import {AiFillGithub, AiFillLinkedin, AiFillTwitterCircle, AiOutlineMail} from 'react-icons/ai';
import FooterLinks from './FooterLinks';

const Footer = () => {
  return (
    <footer className={`pt-[200px] my-10 `}>
      <div className='flex flex-col items-center justify-center gap-10 border-t border-gray-600 pt-5 md:flex-row md:justify-between md:px-3 max-w-screen-xl mx-auto'>
        <div className='min-w-fit text-gray-200 text-lg'>
          &copy;<span className='text-yellow-500'>Movi</span>
          {new Date().getFullYear()}
        </div>

        <div>
          <div className='flex gap-4'>
            <FooterLinks Icon={AiFillGithub} href='https://github.com/tunde-olu' />
            <FooterLinks Icon={AiFillLinkedin} href='https://linkedin.com/in/tunde-olu-68305725a' />
            <FooterLinks Icon={AiFillTwitterCircle} href='https://twitter.com/tunde0024' />
            <FooterLinks Icon={AiOutlineMail} href='mailto:tundeolu24@gmail.com' />
          </div>
        </div>

        <div className='flex flex-col'>
          <h2 className='text-center text-lg text-gray-300'>Credit: </h2>
          <p className='text-center text-gray-500 px-2'>
            This Web App uses the TMDb API but is not endorsed or certified by TMDb
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
