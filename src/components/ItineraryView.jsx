import React from 'react'
import { MapPin, Hotel, Utensils, Landmark, FileDown, Share2 } from 'lucide-react'

export default function ItineraryView({ plan, onShare }) {
  if (!plan) return null

  return (
    <section className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{plan.destination}</h2>
          <p className="text-slate-600">{plan.start_date} → {plan.end_date} • Budget ${plan.budget}</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={plan.map_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded bg-sky-50 text-sky-700 border border-sky-200"><MapPin size={16}/> Map</a>
          <button onClick={onShare} className="inline-flex items-center gap-2 px-3 py-2 rounded bg-sky-600 text-white"><Share2 size={16}/> Share</button>
          <a href="#" onClick={(e)=>{e.preventDefault(); alert('PDF is a premium feature.')}} className="inline-flex items-center gap-2 px-3 py-2 rounded bg-slate-800 text-white"><FileDown size={16}/> PDF</a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Hotels" icon={<Hotel size={18}/>}> 
          {plan.hotels?.map((h, i)=> (
            <a key={i} className="block p-3 rounded border hover:bg-sky-50" href={h.link} target="_blank" rel="noreferrer">
              <div className="font-medium">{h.name}</div>
              <div className="text-sm text-slate-600">${Math.round(h.price_per_night)} / night • ⭐ {h.rating}</div>
            </a>
          ))}
        </Card>
        <Card title="Restaurants" icon={<Utensils size={18}/>}> 
          {plan.restaurants?.map((r, i)=> (
            <a key={i} className="block p-3 rounded border hover:bg-sky-50" href={r.link} target="_blank" rel="noreferrer">
              <div className="font-medium">{r.name}</div>
              <div className="text-sm text-slate-600">{r.type} • {r.price}</div>
            </a>
          ))}
        </Card>
        <Card title="Attractions" icon={<Landmark size={18}/>}> 
          {plan.attractions?.map((a, i)=> (
            <a key={i} className="block p-3 rounded border hover:bg-sky-50" href={a.link} target="_blank" rel="noreferrer">
              <div className="font-medium">{a.name}</div>
              <div className="text-sm text-slate-600">{a.duration}</div>
            </a>
          ))}
        </Card>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Daily Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.days?.map((d, i)=> (
            <div key={i} className="rounded border p-4">
              <div className="font-medium">{d.date}</div>
              <div className="text-slate-600 text-sm mb-2">{d.summary}</div>
              <ul className="space-y-1 text-sm">
                {d.activities?.map((ac, j)=> (
                  <li key={j} className="flex items-center gap-2"><span className="text-slate-500 w-14">{ac.time}</span> <span>{ac.title}</span> <span className="text-slate-500">• {ac.location}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Local Tips</h3>
        <ul className="list-disc pl-6 text-slate-700">
          {plan.tips?.map((t, i)=> <li key={i}>{t}</li>)}
        </ul>
      </div>
    </section>
  )
}

function Card({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold">{icon} {title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}
