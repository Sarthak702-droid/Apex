import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-7 w-7 text-primary" />
              <span className="font-headline text-2xl font-bold">
                Tel-Samriddhi
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering agriculture through technology and collaboration.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <div>
              <h4 className="font-semibold font-headline text-sm tracking-wider uppercase">Quick Links</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="#about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="#features" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="/login" className="text-sm text-muted-foreground hover:text-primary">Login</Link></li>
                <li><Link href="#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold font-headline text-sm tracking-wider uppercase">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold font-headline text-sm tracking-wider uppercase">Follow Us</h4>
              <div className="flex mt-4 space-x-4">
                <Link href="#"><FaTwitter className="text-muted-foreground hover:text-primary h-5 w-5" /></Link>
                <Link href="#"><FaFacebook className="text-muted-foreground hover:text-primary h-5 w-5" /></Link>
                <Link href="#"><FaLinkedin className="text-muted-foreground hover:text-primary h-5 w-5" /></Link>
                <Link href="#"><FaInstagram className="text-muted-foreground hover:text-primary h-5 w-5" /></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tel-Samriddhi. A Government of India Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
