import {
    FaPinterestSquare,
    FaInstagram,
    FaTwitter,
    FaFacebookSquare,
  } from 'react-icons/fa'

import './index.css'

const Footer = () => <footer className='footer'>
    <FaPinterestSquare
        className="footer-icon" size={30}
      />
      <FaInstagram className="footer-icon" size={30}/>
      <FaTwitter className="footer-icon" size={30}/>
      <FaFacebookSquare className="footer-icon" size={30}/>
</footer>


export default Footer