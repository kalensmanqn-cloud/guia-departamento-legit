"use client"

import { AlertTriangle, Clock, ArrowLeft } from "lucide-react"
import type { Translations } from "@/lib/types"

interface ContentParkingProps {
  t: Translations
}

export const ContentParking = ({ t }: ContentParkingProps) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold dark:text-white flex items-center gap-3">
      <AlertTriangle className="text-amber-500" size={28} />
      {t.parking.title}
    </h2>
    <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 space-y-4">
      <p className="font-medium text-amber-900 dark:text-amber-200">
        {t.parking.description}
      </p>
      <ul className="space-y-2">
        {t.parking.schedule.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
            <Clock size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="text-center">
      <p className="text-neutral-600 dark:text-neutral-400 mb-2">{t.parking.moreInfo}</p>
      <a 
        href={t.parking.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
      >
        <span>saemsmandes.com.ar</span>
        <ArrowLeft size={16} className="rotate-180" />
      </a>
    </div>
  </div>
)
