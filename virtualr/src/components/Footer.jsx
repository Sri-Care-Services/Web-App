const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-6 mt-10 w-full">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <a href="#" className="hover:text-orange-500 transition">About Us</a>
          <a href="#" className="hover:text-orange-500 transition">Services</a>
          <a href="#" className="hover:text-orange-500 transition">Contact</a>
          <a href="#" className="hover:text-orange-500 transition">Privacy Policy</a>
        </div>

        <p className="mt-4 text-sm text-gray-400">© {new Date().getFullYear()} SRI Care. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
