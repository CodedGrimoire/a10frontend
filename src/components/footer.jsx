const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content py-6 mt-12 border-t border-gray-300">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-xl font-bold text-primary mb-2">📚 The Book Haven</h2>
        <p className="text-sm text-gray-600 mb-3">
          Your digital escape into worlds of imagination, adventure, and knowledge.
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            X
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Instagram
          </a>
        </div>
        <p className="text-xs text-gray-500">
          © {currentYear} The Book Haven. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
