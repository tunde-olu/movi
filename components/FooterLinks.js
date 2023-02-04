const FooterLinks = ({Icon, href}) => {
  return (
    <a href={href} target='_blank' rel='no-referrer'>
      <Icon className='w-9 h-9 md:w-8 md:h-8 text-gray-300' />
    </a>
  );
};
export default FooterLinks;
