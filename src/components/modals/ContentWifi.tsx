"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import type { Translations } from "@/lib/types"
import { CopyButton } from "@/components/ui/CopyButton"

interface ContentWifiProps {
  t: Translations
}

export const ContentWifi = ({ t }: ContentWifiProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">{t.wifi.title}</h2>
      <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
        <div className="space-y-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">{t.wifi.network}</div>
            <div className="flex items-center text-xl font-bold text-emerald-900 dark:text-emerald-200">
              <span>cotemax_3a1</span>
              <CopyButton text="cotemax_3a1" label={t.copy} />
            </div>
          </div>
          <div className="w-full h-px bg-emerald-200 dark:bg-emerald-900/50" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">{t.wifi.password}</div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-emerald-900 dark:text-emerald-200 min-w-[100px]">
                {showPassword ? "cote035b" : "••••••••"}
              </span>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 transition-colors"
                title={showPassword ? "Ocultar" : "Mostrar"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {showPassword && (
                <div className="ml-1">
                  <CopyButton text="cote035b" label={t.copy} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
