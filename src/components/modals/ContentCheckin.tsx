"use client"

import type { Translations } from "@/lib/types"

interface ContentCheckinProps {
  t: Translations
}

export const ContentCheckin = ({ t }: ContentCheckinProps) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold dark:text-white">{t.checkin.title}</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-center">
        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{t.checkin.checkinTitle}</div>
        <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">13:00</div>
        <div className="text-xs text-blue-500 dark:text-blue-400 mt-1">{t.checkin.checkinSub}</div>
      </div>
      <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-xl text-center">
        <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">{t.checkin.checkoutTitle}</div>
        <div className="text-2xl font-bold text-orange-900 dark:text-orange-200">10:00</div>
        <div className="text-xs text-orange-500 dark:text-orange-400 mt-1">{t.checkin.checkoutSub}</div>
      </div>
    </div>
    <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
      <h3 className="font-semibold mb-2 dark:text-white">{t.checkin.instructionsTitle}</h3>
      <ul className="text-neutral-600 dark:text-neutral-300 text-sm list-none space-y-1">
        {t.checkin.instructions.map((inst, i) => (
          <li key={i} dangerouslySetInnerHTML={{ 
            __html: inst.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
          }} />
        ))}
      </ul>
    </div>
  </div>
)
