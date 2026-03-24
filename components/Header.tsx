'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-white font-bold text-xl tracking-tight">
            bioreactor<span className="text-teal-400">.ai</span>
          </span>
          <span className="text-slate-300 text-sm">by</span>
          <img src="/logos/algocell.png" alt="Algocell" className="h-5 w-auto brightness-0 invert opacity-70" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#demo" className="hover:text-white transition-colors">Live Demo</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          <a href="#waitlist" className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-5 py-2 rounded-lg transition-colors">
            Get Started
          </a>
        </nav>
      </div>
    </header>
  )
}
