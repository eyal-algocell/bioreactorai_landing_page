'use client'

const logos = [
  { name: 'Sartorius', src: '/logos/sartorius.svg' },
  { name: 'Thermo Fisher Scientific', src: '/logos/thermofisher.svg' },
  { name: 'Eppendorf', src: '/logos/eppendorf.svg' },
  { name: 'Cytiva', src: '/logos/cytiva.png' },
  { name: 'Merck', src: '/logos/merck.svg' },
  { name: 'Danaher', src: '/logos/danaher.svg' },
]

export default function LogoCarousel() {
  return (
    <section className="bg-white py-12 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-500 text-xs uppercase tracking-wider mb-8 font-medium">
          Compatible with systems from
        </p>
        <div className="relative overflow-hidden">
          <div
            className="flex gap-24 items-center"
            style={{
              width: 'max-content',
              animation: 'scroll 28s linear infinite',
            }}
          >
            {/* Original set */}
            {logos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.name}
                className="h-12 opacity-40 hover:opacity-100 transition-opacity duration-300 flex-shrink-0 grayscale hover:grayscale-0"
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, i) => (
              <img
                key={`dup-${i}`}
                src={logo.src}
                alt={logo.name}
                className="h-12 opacity-40 hover:opacity-100 transition-opacity duration-300 flex-shrink-0 grayscale hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  )
}
