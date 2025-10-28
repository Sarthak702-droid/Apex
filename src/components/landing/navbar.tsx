'use client';

import Link from 'next/link';
import { Mountain, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2 mr-6">
          <Mountain className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold text-foreground">
            Apex
          </span>
        </Link>
        <div className="hidden md:flex flex-1 items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeToggle />
          <Button asChild className="hidden md:flex group relative">
            <Link href="/login">
              Explore / Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-foreground transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4"
          >
            <nav className="grid gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="font-medium text-lg text-muted-foreground transition-colors hover:text-primary text-center py-2"
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="w-full mt-4">
                <Link href="/login">Explore / Login</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
