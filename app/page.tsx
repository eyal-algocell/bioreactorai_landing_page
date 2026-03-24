import Header from '@/components/Header'
import LogoCarousel from '@/components/LogoCarousel'
import Hero from '@/components/Hero'
import BioreactorShowcase from '@/components/BioreactorShowcase'
import HowItWorks from '@/components/HowItWorks'
import Architecture from '@/components/Architecture'
import InteractiveDemo from '@/components/demo/InteractiveDemo'
import WhatThisIsnt from '@/components/WhatThisIsnt'
import ValidationCTA from '@/components/ValidationCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <LogoCarousel />
      <BioreactorShowcase />
      <HowItWorks />
      <InteractiveDemo />
      <Architecture />
      <WhatThisIsnt />
      <ValidationCTA />
      <Footer />
    </main>
  )
}
