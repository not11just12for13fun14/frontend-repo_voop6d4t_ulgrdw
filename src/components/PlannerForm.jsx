import React, { useState } from 'react'

export default function PlannerForm({ token, onPlan }) {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [destination, setDestination] = useState('Tokyo')
  const [start, setStart] = useState('2025-12-01')
  const [end, setEnd] = useState('2025-12-07')
  const [budget, setBudget] = useState(2000)
  const [preferences, setPreferences] = useState('food, culture, photography')
  const [premium, setPremium] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${base}/itineraries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ destination, start_date: start, end_date: end, budget: Number(budget), preferences: { interests: preferences }, premium })
      })
      const data = await res.json()
      if (res.ok) onPlan(data)
      else alert(data.detail || 'Failed to generate')
    } catch (e) { alert('Network error') }
    finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="bg-white/80 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg border border-white/40">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input className="px-3 py-2 rounded bg-white border" placeholder="Destination" value={destination} onChange={e=>setDestination(e.target.value)} />
        <input className="px-3 py-2 rounded bg-white border" type="date" value={start} onChange={e=>setStart(e.target.value)} />
        <input className="px-3 py-2 rounded bg-white border" type="date" value={end} onChange={e=>setEnd(e.target.value)} />
        <input className="px-3 py-2 rounded bg-white border" type="number" min="0" placeholder="Budget" value={budget} onChange={e=>setBudget(e.target.value)} />
        <input className="px-3 py-2 rounded bg-white border" placeholder="Preferences (comma separated)" value={preferences} onChange={e=>setPreferences(e.target.value)} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sky-900">
          <input type="checkbox" checked={premium} onChange={e=>setPremium(e.target.checked)} />
          Enable premium itinerary (PDF, advanced picks)
        </label>
        <button disabled={loading} className="px-4 py-2 rounded bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-60">{loading ? 'Generating...' : 'Generate itinerary'}</button>
      </div>
    </form>
  )
}
