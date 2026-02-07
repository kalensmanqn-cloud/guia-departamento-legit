"use client"

import type { Translations } from "@/lib/types"

interface ContentRulesProps {
  t: Translations
}

export const ContentRules = ({ t }: ContentRulesProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold mb-4 dark:text-white">{t.rules.title}</h2>
    <ul className="space-y-3 text-neutral-600 dark:text-neutral-300">
      {t.rules.items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)
