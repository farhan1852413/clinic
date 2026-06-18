'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(212,175,55,0.2)] py-0'
          : 'bg-white border-b border-primary-gold/10 py-0'
      }`}
    >
      {/* Top gold line accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div
          className={`flex justify-between items-center transition-all duration-500 ${
            scrolled ? 'h-16' : 'h-24'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Emblem */}
            <motion.div
              animate={{ scale: scrolled ? 0.85 : 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative flex-shrink-0"
            >
              <div className="w-9 h-9 border border-primary-gold/60 rounded-full flex items-center justify-center group-hover:border-primary-gold transition-colors duration-300">
                <span className="font-heading text-primary-gold text-sm">W</span>
              </div>
              <div className="absolute inset-0 rounded-full border border-primary-gold/20 scale-[1.35]" />
            </motion.div>

            {/* Name */}
            <div className="flex flex-col leading-none">
              <motion.span
                animate={{
                  fontSize: scrolled ? '1.1rem' : '1.5rem',
                  letterSpacing: scrolled ? '0.05em' : '0.08em',
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="font-heading text-black block"
                style={{ fontSize: '1.5rem', letterSpacing: '0.08em' }}
              >
                WhitePearl
              </motion.span>
              <motion.span
                animate={{ opacity: scrolled ? 0 : 1, height: scrolled ? 0 : 'auto' }}
                transition={{ duration: 0.3 }}
                className="font-ui text-[9px] tracking-[0.3em] uppercase text-primary-gold overflow-hidden"
              >
                Beverly Hills
              </motion.span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-ui text-xs tracking-[0.18em] uppercase text-black/70 hover:text-black transition-colors duration-300 group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            <Link
              href="/appointment"
              className="ml-4 font-ui text-xs tracking-[0.18em] uppercase px-6 py-3 border border-primary-gold text-black hover:bg-primary-gold transition-all duration-300 rounded-full relative overflow-hidden group"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Book Appointment
              </span>
            </Link>
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full border border-primary-gold/30 hover:border-primary-gold transition-colors duration-300"
            >
              {isOpen ? (
                <RiCloseLine className="w-5 h-5 text-primary-gold" />
              ) : (
                <RiMenu4Line className="w-5 h-5 text-primary-gold" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden bg-white border-t border-primary-gold/10"
      >
        <div className="px-6 pt-4 pb-8 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: isOpen ? 0 : -10, opacity: isOpen ? 1 : 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-4 font-ui text-xs tracking-[0.2em] uppercase text-black/70 hover:text-black border-b border-black/5 group transition-colors duration-300"
              >
                {link.label}
                <span className="text-primary-gold/40 group-hover:text-primary-gold transition-colors duration-300 text-xs">→</span>
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ delay: 0.35 }}
            className="mt-6"
          >
            <Link
              href="/appointment"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center font-ui text-xs tracking-[0.2em] uppercase px-6 py-4 bg-black text-white hover:bg-primary-gold hover:text-black transition-all duration-300 rounded-full"
            >
              Book Appointment
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}