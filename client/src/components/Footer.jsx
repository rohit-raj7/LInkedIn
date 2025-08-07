import React from 'react';

const footerLinks = {
  general: [
    { name: 'Sign Up', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'About', href: '#' },
  ],
  business: [
    { name: 'Talent', href: '#' },
    { name: 'Marketing', href: '#' },
    { name: 'Sales', href: '#' },
  ],
  directories: [
    { name: 'Members', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Companies', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'User Agreement', href: '#' },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-100 to-blue-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-base font-semibold text-gray-800 capitalize">{section}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-700 transition duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-300 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <img
              className="h-7 w-auto"
              src="https://placehold.co/120x40?text=ConnectHub"
              alt="ConnectHub logo"
            />
            <span className="ml-3 text-sm text-gray-500">&copy; {currentYear} ConnectHub</span>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/rohit-raj7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition duration-200"
            >
              <span className="sr-only">GitHub</span>
              <i className="fab fa-github text-xl"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/rohit-raj7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition duration-200"
            >
              <span className="sr-only">LinkedIn</span>
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a
              href="https://rohit-raj.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-600 transition duration-200"
            >
              <span className="sr-only">Portfolio</span>
              <i className="fas fa-globe text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
