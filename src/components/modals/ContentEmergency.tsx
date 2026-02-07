"use client"

import { Phone } from "lucide-react"
import type { Translations } from "@/lib/types"

interface ContentEmergencyProps {
  t: Translations
}

export const ContentEmergency = ({ t }: ContentEmergencyProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-red-600 dark:text-red-500">{t.emergency.title}</h2>
    <div className="grid gap-3">
      {[
        { name: "Central Emergencias Regional", number: "911" },
        { name: "Bomberos", number: "100" },
        { name: "Policía", number: "101" },
        { name: "Protección Civil", number: "103" },
        { name: "SIEN (Sistema Integrado de Emergencias Neuquén)", number: "107" },
        { name: "Hospital Ramón Carrillo", number: "2972 426033" },
        { name: "Clínica Chapelco", number: "2972 429132" },
      ].map((item) => (
        <div key={item.name} className="flex items-center justify-between p-4 border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 rounded-xl">
          <span className="font-medium text-red-900 dark:text-red-200 text-sm max-w-[60%]">{item.name}</span>
          <a href={`tel:${item.number.replace(/\s/g, '')}`} className="flex items-center gap-2 font-bold text-red-600 dark:text-red-400 bg-white dark:bg-neutral-900 px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap">
            <Phone size={14} />
            {item.number}
          </a>
        </div>
      ))}
    </div>
    <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
      <h3 className="font-semibold text-sm mb-1 dark:text-white">{t.emergency.addressTitle}</h3>
      <p className="text-neutral-600 dark:text-neutral-300 whitespace-pre-line">{t.emergency.address}</p>
    </div>
  </div>
)
