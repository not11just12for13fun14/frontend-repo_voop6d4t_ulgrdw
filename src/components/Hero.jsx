import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-[#0b1220]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/g5OaHmrKTDxRI7Ig/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">Skyline Explorer</h1>
          <p className="mt-4 text-sky-100/90 max-w-2xl">Plan smarter trips with AI. Craft personalized itineraries with hotels, food, attractions, maps and local tips—all in minutes.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b1220]" />
    </section>
  )
}
