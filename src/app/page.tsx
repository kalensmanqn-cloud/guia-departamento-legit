"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Moon,
  Sun,
  Languages,
  AlertTriangle,
} from "lucide-react"

import { cn } from "@/lib/utils"
// Imports modularizados
import { translations } from "@/lib/translations"
import { categoriesData } from "@/lib/constants"
import { Language, CategoryId } from "@/lib/types"

import { Modal } from "@/components/ui/Modal"
import {
  ContentRules,
  ContentCheckin,
  ContentWifi,
  ContentHost,
  ContentEmergency,
  ContentGuide,
  ContentParking
} from "@/components/modals"

// --- Main Page ---

export default function Home() {
  const [activeId, setActiveId] = useState<CategoryId | null>(null)
  const [lang, setLang] = useState<Language>("es")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const t = translations[lang]

  useEffect(() => {
    // Check system preference for Theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      document.documentElement.classList.add("light")
    }

    // Check system preference for Language
    const userLang = navigator.language.toLowerCase()
    if (userLang.startsWith("es")) {
      setLang("es")
    } else {
      setLang("en")
    }
  }, [])

  const toggleLanguage = () => {
    setLang(current => current === "es" ? "en" : "es")
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(newTheme)
  }

  const renderContent = (id: CategoryId) => {
    switch (id) {
      case "rules": return <ContentRules t={t} />
      case "checkin": return <ContentCheckin t={t} />
      case "wifi": return <ContentWifi t={t} />
      case "host": return <ContentHost t={t} />
      case "emergency": return <ContentEmergency t={t} />
      case "guide": return <ContentGuide t={t} />
      case "parking": return <ContentParking t={t} />
      default: return null
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pb-20 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-slate-900 overflow-hidden">
        {/* Background Image */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/hero-bg.png)',
            }} 
        />
        {/* Gradient Overlay for Text Readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Top Controls */}
        <div className="absolute top-4 right-4 z-30 flex gap-2">
            
            <button 
                onClick={toggleTheme}
                className="flex items-center justify-center w-9 h-9 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-white/30 transition-colors"
                title={theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
            >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full text-white font-medium hover:bg-white/30 transition-colors"
            >
                <Languages size={18} />
                <span>{lang === 'es' ? 'ES 🇦🇷' : 'EN 🇺🇸'}</span>
            </button>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 text-white mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-2 tracking-tight drop-shadow-md">{t.hero.title}</h1>
            <p className="text-lg text-slate-100 font-medium drop-shadow-md">{t.hero.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {categoriesData.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveId(category.id)}
              className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-neutral-900/50 transition-all flex flex-col items-center justify-center gap-4 text-center aspect-square md:aspect-auto md:h-48 group cursor-pointer"
            >
              <div className={cn("p-4 rounded-full transition-transform group-hover:scale-110 duration-300", 
                category.color,
                category.darkColor
              )}>
                <category.icon size={32} />
              </div>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{t.categories[category.id]}</span>
            </motion.button>
          ))}
        </div>

        {/* Parking Info Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => setActiveId("parking")}
          className="w-full mt-6 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 p-4 rounded-xl flex items-center justify-center gap-3 text-orange-800 dark:text-orange-200 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-all cursor-pointer group shadow-sm hover:shadow-md"
        >
          <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-full group-hover:scale-110 transition-transform">
            <AlertTriangle size={20} className="text-orange-600 dark:text-orange-400" />
          </div>
          <span className="font-semibold text-lg">{t.categories.parking}</span>
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-neutral-400 text-sm p-6">
        <p>{t.footer}</p>
      </footer>

      {/* Detail Modal */}
      <Modal isOpen={!!activeId} onClose={() => setActiveId(null)}>
        {activeId && renderContent(activeId)}
      </Modal>
    </main>
  )
}
