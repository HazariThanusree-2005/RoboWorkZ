import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Products', path: '/products' },
      { name: 'Contact', path: '/contact' },
    ],
    Services: [
      { name: 'Business Robots', path: '/services' },
      { name: 'Event Robots', path: '/services' },
      { name: 'Robot Rentals', path: '/rentals' },
      { name: 'Student Projects', path: '/services' },
    ],
    Support: [
      { name: 'Book a Demo', path: '/contact' },
      { name: 'FAQ', path: '/about' },
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
    ],
  };

  const socialLinks = [
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-dark-900 border-t border-white/5">
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-extrabold" style={{ fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.04em' }}>
                <span className="text-white">Robo</span>
                <span 
                  style={{ 
                    background: 'linear-gradient(135deg, #7b39fc, #ae82ff, #ccb3ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
<<<<<<< HEAD
                >WorkZ</span>
=======
                >Workz</span>
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
              </span>
            </Link>
            <p className="text-gray-400 font-inter text-sm leading-relaxed mb-6 max-w-sm">
              India's next generation robotics startup, creating smart solutions for businesses, 
              events, students, and the future of automation.
            </p>
            <div className="space-y-3">
              <a href="mailto:hello@roboworkz.in" className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors text-sm">
                <HiMail className="text-primary-500" size={16} />
                hello@roboworkz.in
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors text-sm">
                <HiPhone className="text-primary-500" size={16} />
                +91 98765 43210
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <HiLocationMarker className="text-primary-500 flex-shrink-0" size={16} />
                Hyderabad, India
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-manrope font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-inter"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-inter">
<<<<<<< HEAD
            © {currentYear} RoboWorkZ. All rights reserved.
=======
            © {currentYear} RoboWorkz. All rights reserved.
>>>>>>> cd29dd68eba5b55581778bfcbe115cd7bf860897
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-primary-500/20 hover:text-primary-400 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
