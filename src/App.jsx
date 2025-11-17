import React, { useState } from 'react'
import Hero from './components/Hero'
import AuthBar from './components/AuthBar'
import PlannerForm from './components/PlannerForm'
import ItineraryView from './components/ItineraryView'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [plan, setPlan] = useState(null)
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const sharePlan = async () => {
    if (!plan || !plan.id) return alert('Create a plan first')
    try {
      const res = await fetch(`${base}/share/${plan.id}`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } })
      const data = await res.json()
      if (data.share_url) {
        const url = `${window.location.origin}${data.share_url}`
        await navigator.clipboard.writeText(url)
        alert('Share link copied to clipboard!')
      } else { alert('Unable to create share link') }
    } catch (e) { alert('Network error') }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-100">
      <div className="absolute inset-x-0 top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-sky-50 md:text-white font-semibold tracking-tight">Skyline Explorer</div>
          <AuthBar onToken={setToken} />
        </div>
      </div>

      <Hero />

      <main className="relative z-10 max-w-6xl mx-auto px-6 -mt-16">
        <div className="bg-gradient-to-br from-white to-sky-50 border border-sky-100 rounded-2xl shadow-xl p-4 md:p-6">
          {token ? (
            <>
              <PlannerForm token={token} onPlan={setPlan} />
              <ItineraryView plan={plan} onShare={sharePlan} />
            </>
          ) : (
            <div className="text-slate-700">Log in or sign up to start planning your trip.</div>
          )}
        </div>

        <footer className="py-10 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} Skyline Explorer · Premium PDFs and affiliate links included
        </footer>
      </main>
    </div>
  )
}

export default App
