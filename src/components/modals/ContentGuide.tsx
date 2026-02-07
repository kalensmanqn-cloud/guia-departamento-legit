"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Ticket,
  Utensils,
  Mountain,
  Info,
  ArrowLeft,
  Clock,
  ChevronUp,
  ChevronDown,
  Star,
  Map as MapIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Translations } from "@/lib/types"

interface ContentGuideProps {
  t: Translations
}

export const ContentGuide = ({ t }: ContentGuideProps) => {
  const [view, setView] = useState<"menu" | "benefits" | "gastronomy" | "activities" | "info">("menu")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const menuItems = [
    { id: "benefits", label: t.guide.menu.benefits, icon: Ticket, color: "bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400", delay: 0 },
    { id: "gastronomy", label: t.guide.menu.gastronomy, icon: Utensils, color: "bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400", delay: 0.1 },
    { id: "activities", label: t.guide.menu.activities, icon: Mountain, color: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400", delay: 0.2 },
    { id: "info", label: t.guide.menu.info, icon: Info, color: "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400", delay: 0.3 },
  ] as const

  // Extract unique tags for gastronomy
  const gastronomyTags = Array.from(new Set(
    t.guide.gastronomy.items.flatMap((item: any) => 
      item.type.split("•").map((tag: string) => tag.trim())
    )
  )).sort() as string[]

  const filteredGastronomyItems = (() => {
    if (activeFilter) {
      return t.guide.gastronomy.items.filter((item: any) => 
        item.type.split("•").map((tag: string) => tag.trim()).includes(activeFilter)
      )
    }
    
    // Default: Show recommended items
    return t.guide.gastronomy.items.filter((item: any) => item.recommended)
  })()

  const renderSubView = () => {
    const BackButton = () => (
      <button 
        onClick={() => setView("menu")}
        className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 mb-4 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">{t.guide.back}</span>
      </button>
    )

    switch (view) {
      case "benefits":
        return (
          <div>
            <BackButton />
            <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-3">
              <span className="p-2 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-lg">
                <Ticket size={24} />
              </span>
              {t.guide.benefits.title}
            </h2>
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
               <div className="p-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-400 rounded-full">
                 <Clock size={48} />
               </div>
               <p className="text-neutral-500 dark:text-neutral-400 font-medium">{t.comingSoon}</p>
            </div>
          </div>
        )
      case "gastronomy":
        const allLabel = t.guide.back === "Volver" ? "Todos" : "All"
        return (
          <div>
            <BackButton />
            <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-3">
              <span className="p-2 bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 rounded-lg">
                <Utensils size={24} />
              </span>
              {t.guide.gastronomy.title}
            </h2>
            
            {/* Filter Dropdown */}
            <div className="relative mb-6 z-10">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-left border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                   <span className="p-1.5 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-lg">
                      <Utensils size={16} />
                   </span>
                   <span className="font-medium dark:text-white">
                      {activeFilter || (t.guide.back === "Volver" ? "Recomendados (5)" : "Recommended (5)")}
                   </span>
                </div>
                {isFilterOpen ? <ChevronUp size={20} className="text-neutral-500" /> : <ChevronDown size={20} className="text-neutral-500" />}
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden max-h-60 overflow-y-auto z-20"
                  >
                    <button
                      onClick={() => { setActiveFilter(null); setIsFilterOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors border-b border-neutral-100 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200"
                    >
                      {t.guide.back === "Volver" ? "Todos (Recomendados)" : "All (Recommended)"}
                    </button>
                    {gastronomyTags.map((tag: string) => (
                      <button
                        key={tag}
                        onClick={() => { setActiveFilter(tag); setIsFilterOpen(false); }}
                        className={cn(
                          "w-full text-left px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors",
                          activeFilter === tag ? "font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20" : "text-neutral-600 dark:text-neutral-300"
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid gap-4">
              {filteredGastronomyItems.map((item: any, i: number) => {
                if (item.branches) {
                  return (
                    <div key={i} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                       <div className="flex justify-between items-start mb-3">
                         <div>
                            <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                                {item.name}
                            </h3>
                            {item.rating && (
                                <div className="flex items-center gap-1 mt-1">
                                    <Star size={14} className="fill-amber-400 text-amber-400" />
                                    <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{item.rating}</span>
                                </div>
                            )}
                         </div>
                         <div className="flex flex-wrap gap-2 justify-end">
                            {item.type.split("•").map((tag: string, idx: number) => (
                                 <span key={idx} className="text-xs bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 px-2 py-1 rounded-full whitespace-nowrap">{tag.trim()}</span>
                            ))}
                          </div>
                       </div>
                       <div className="flex flex-col gap-2">
                          {item.branches.map((branch: any, bIdx: number) => (
                            <a
                              key={bIdx}
                              href={branch.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50 dark:hover:bg-neutral-800 transition-all group"
                            >
                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-sky-700 dark:group-hover:text-sky-400">{branch.name}</span>
                                <MapIcon size={14} className="text-neutral-400 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                            </a>
                          ))}
                       </div>
                    </div>
                  )
                }

                return (
                  <a 
                    key={i} 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-sky-50 dark:hover:bg-neutral-700 transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors flex items-center gap-2">
                           {item.name}
                           <MapIcon size={14} className="opacity-50 group-hover:opacity-100" />
                        </h3>
                        {item.rating && (
                            <div className="flex items-center gap-1 mt-1">
                                <Star size={14} className="fill-amber-400 text-amber-400" />
                                <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-sky-700 dark:group-hover:text-sky-400">{item.rating}</span>
                            </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.type.split("•").map((tag: string, idx: number) => (
                           <span key={idx} className="text-xs bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 px-2 py-1 rounded-full">{tag.trim()}</span>
                      ))}
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        )
      case "activities":
        return (
          <div>
            <BackButton />
            <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-3">
              <span className="p-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <Mountain size={24} />
              </span>
              {t.guide.activities.title}
            </h2>
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
               <div className="p-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-400 rounded-full">
                 <Clock size={48} />
               </div>
               <p className="text-neutral-500 dark:text-neutral-400 font-medium">{t.comingSoon}</p>
            </div>
          </div>
        )
      case "info":
        return (
          <div>
            <BackButton />
            <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-3">
              <span className="p-2 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-lg">
                <Info size={24} />
              </span>
              {t.guide.info.title}
            </h2>
            
            {/* Map Embed */}
            <div className="w-full h-[600px] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
              <iframe 
                src="https://www.google.com/maps/d/embed?mid=1fmuUFrdJxKfAydNX6PfSvUzDowZrXdQ&ehbc=2E312F&noprof=1" 
                width="100%" 
                height="600" 
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Mapa de Información Útil"
              ></iframe>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="h-full pt-6">
      <AnimatePresence mode="wait">
        {view === "menu" ? (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-2 gap-3 h-full"
          >
             {menuItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setView(item.id)}
                 className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-transform hover:scale-[1.02] active:scale-95 ${item.color} shadow-sm border border-black/5 dark:border-white/5 aspect-[4/3]`}
               >
                 <item.icon size={32} strokeWidth={1.5} />
                 <span className="mt-2 font-bold text-sm text-center leading-tight">{item.label}</span>
               </button>
             ))}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {renderSubView()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
