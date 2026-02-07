"use client"

import { User, MessageCircle, Mail } from "lucide-react"
import type { Translations } from "@/lib/types"
import { CopyButton } from "@/components/ui/CopyButton"

interface ContentHostProps {
  t: Translations
}

export const ContentHost = ({ t }: ContentHostProps) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold dark:text-white">{t.host.title}</h2>
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center text-violet-600 dark:text-violet-400">
        <User size={32} />
      </div>
      <div>
        <h3 className="text-lg font-bold dark:text-white">Marcela y Natalia</h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">{t.host.superhost}</p>
      </div>
    </div>
    <div className="space-y-3">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider pl-1">Marcela</p>
        <a href="https://wa.me/5491149288359" className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
          <MessageCircle size={20} className="text-neutral-400" />
          <span className="font-medium text-neutral-700 dark:text-neutral-200">+54 9 11 4928-8359</span>
        </a>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider pl-1">Natalia</p>
        <a href="https://wa.me/5491121546599" className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
          <MessageCircle size={20} className="text-neutral-400" />
          <span className="font-medium text-neutral-700 dark:text-neutral-200">+54 9 11 2154-6599</span>
        </a>
      </div>

      <div className="pt-2">
         <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider pl-1 mb-1">{t.host.email}</p>
         <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
           <Mail size={20} className="text-neutral-400" />
           <span className="font-medium text-neutral-700 dark:text-neutral-200 text-sm break-all">kalen.sma.nqn@gmail.com</span>
           <CopyButton text="kalen.sma.nqn@gmail.com" label={t.copy} />
         </div>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-400 px-2 text-center mt-4 whitespace-pre-line">
        {t.host.availability}
      </p>
    </div>
  </div>
)
