"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Clock,
  Wifi,
  User,
  Siren,
  Map as MapIcon,
  X,
  Copy,
  Check,
  PhoneCall,
  Phone,
  Mail,
  Languages
} from "lucide-react"
import { cn } from "@/lib/utils"

// --- Translations ---

type Language = "es" | "en"

const translations = {
  es: {
    hero: {
      title: "Bienvenidos a Departamento KALEN",
      subtitle: "Esperamos que disfruten su estadía"
    },
    categories: {
      rules: "Reglas de convivencia",
      checkin: "Check-in / Check-out",
      wifi: "Wifi",
      host: "Tu Anfitrión",
      emergency: "Emergencias",
      guide: "Guía Turística"
    },
    footer: "© 2026 Guía de Alojamiento",
    comingSoon: "Disponible próximamente",
    copy: "Copiar",
    rules: {
      title: "Reglas de la casa",
      items: [
        "No está permitido fumar/vapear.",
        "No se permiten fiestas ni eventos.",
        "Por favor, respetar el horario de silencio (23 a 7).",
        "Cuidar utensilios y vajilla, en caso de faltantes y/o roturas, deberán ser abonados o repuestos.",
        "La limpieza de la cabaña no incluye el lavado de vajilla.",
        "El cambio de toallas y toallones se realizará cada 4 noches de estadía.",
        "El cambio de sábanas se realizará una vez a la semana (7 noches de estadía).",
        "La limpieza general se realizará una vez a la semana, quedando a cargo del huésped el mantenimiento diario, con los elementos disponibles en la cabaña.",
        "No desconectar el router del wifi.",
        "No deslizar la traba de la cerradura electrónica. En caso de requerir asistencia para desbloquearla, el huésped deberá abonar un cargo adicional.",
        "No modificar la posición de las llaves de paso del baño.",
        "Se ruega cuidar los recursos, como el agua y la luz."
      ]
    },
    checkin: {
      title: "Check-in / Check-out",
      checkinTitle: "Check-in",
      checkinSub: "En adelante",
      checkoutTitle: "Check-out",
      checkoutSub: "Máximo",
      instructionsTitle: "Instrucciones de salida",
      instructions: [
        "El egreso es autónomo. Dejar las **llaves de ingreso** al edificio sobre la mesa.",
        "Dejar **toallas y toallones** en el cesto de lavandería.",
        "No olvidar **sacar la basura** y dejarla en el cesto ubicado en la vereda."
      ]
    },
    wifi: {
      title: "Conexión Wifi",
      network: "Red (Network)",
      password: "Contraseña (Password)",
      scan: "Escanea el código QR que se encuentra en la mesa del comedor para conectar automáticamente."
    },
    host: {
      title: "Tus Anfitrionas",
      superhost: "Superhosts",
      email: "Email del Departamento",
      availability: "Disponible de 08:00 a 22:00 para consultas generales.\n24hs para urgencias del departamento."
    },
    emergency: {
      title: "Números de Emergencia",
      addressTitle: "Dirección del departamento",
      address: "Tte. Gral. Roca 938, piso 3, departamento 302\nEdificio Pequeña Comarca (entre calles Elordi y Belgrano)\nSan Martín de los Andes, Neuquén"
    },
    guide: {
      title: "Guía Turística"
    }
  },
  en: {
    hero: {
      title: "Welcome to KALEN Apartment",
      subtitle: "We hope you enjoy your stay"
    },
    categories: {
      rules: "House Rules",
      checkin: "Check-in / Check-out",
      wifi: "Wifi",
      host: "Your Host",
      emergency: "Emergency",
      guide: "Tourist Guide"
    },
    footer: "© 2026 Accommodation Guide",
    comingSoon: "Coming soon",
    copy: "Copy",
    rules: {
      title: "House Rules",
      items: [
        "Smoking/vaping is not allowed.",
        "No parties or events allowed.",
        "Please respect quiet hours (11 PM to 7 AM).",
        "Take care of utensils and dishes; missing or broken items must be paid for or replaced.",
        "Cabin cleaning does not include dishwashing.",
        "Towels and bath towels will be changed every 4 nights of stay.",
        "Bed sheets will be changed once a week (7 nights of stay).",
        "General cleaning is done once a week; daily maintenance is the guest's responsibility using available supplies.",
        "Do not disconnect the Wi-Fi router.",
        "Do not slide the electronic lock latch. If assistance is required to unlock it, an additional charge will apply.",
        "Do not modify the bathroom water valve positions.",
        "Please be mindful of resources like water and electricity."
      ]
    },
    checkin: {
      title: "Check-in / Check-out",
      checkinTitle: "Check-in",
      checkinSub: "Onwards",
      checkoutTitle: "Check-out",
      checkoutSub: "Maximum",
      instructionsTitle: "Departure Instructions",
      instructions: [
        "Self-checkout. Leave **building keys** on the table.",
        "Leave **towels and bath towels** in the laundry basket.",
        "Do not forget to **take out the trash** and leave it in the bin on the sidewalk."
      ]
    },
    wifi: {
      title: "Wifi Connection",
      network: "Network",
      password: "Password",
      scan: "Scan the QR code on the dining table to connect automatically."
    },
    host: {
      title: "Your Hosts",
      superhost: "Superhosts",
      email: "Apartment Email",
      availability: "Available from 08:00 to 22:00 for general inquiries.\n24h for apartment emergencies."
    },
    emergency: {
      title: "Emergency Numbers",
      addressTitle: "Apartment Address",
      address: "Tte. Gral. Roca 938, Floor 3, Apt 302\nEdificio Pequeña Comarca (between Elordi and Belgrano)\nSan Martín de los Andes, Neuquén"
    },
    guide: {
      title: "Tourist Guide"
    }
  }
}

// --- Data ---

type CategoryId = "rules" | "checkin" | "wifi" | "host" | "emergency" | "guide"

interface Category {
  id: CategoryId
  icon: React.ElementType
  color: string
}

const categoriesData: Category[] = [
  { id: "rules", icon: BookOpen, color: "bg-orange-100 text-orange-600" },
  { id: "checkin", icon: Clock, color: "bg-blue-100 text-blue-600" },
  { id: "wifi", icon: Wifi, color: "bg-emerald-100 text-emerald-600" },
  { id: "host", icon: User, color: "bg-violet-100 text-violet-600" },
  { id: "emergency", icon: Siren, color: "bg-red-100 text-red-600" },
  { id: "guide", icon: MapIcon, color: "bg-pink-100 text-pink-600" },
]

// --- Components ---

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl md:h-auto max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl z-50 p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
            >
              <X size={20} className="text-neutral-600" />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function CopyButton({ text, label }: { text: string, label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1.5 rounded-md hover:bg-neutral-100 transition-colors text-neutral-500"
      title={label || "Copiar"}
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  )
}

// --- Content Components ---

const ContentRules = ({ t }: { t: typeof translations.es }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold mb-4">{t.rules.title}</h2>
    <ul className="space-y-3 text-neutral-600">
      {t.rules.items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)

const ContentCheckin = ({ t }: { t: typeof translations.es }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">{t.checkin.title}</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-blue-50 rounded-xl text-center">
        <div className="text-sm text-blue-600 font-medium mb-1">{t.checkin.checkinTitle}</div>
        <div className="text-2xl font-bold text-blue-900">13:00</div>
        <div className="text-xs text-blue-500 mt-1">{t.checkin.checkinSub}</div>
      </div>
      <div className="p-4 bg-orange-50 rounded-xl text-center">
        <div className="text-sm text-orange-600 font-medium mb-1">{t.checkin.checkoutTitle}</div>
        <div className="text-2xl font-bold text-orange-900">10:00</div>
        <div className="text-xs text-orange-500 mt-1">{t.checkin.checkoutSub}</div>
      </div>
    </div>
    <div className="bg-neutral-50 p-4 rounded-xl">
      <h3 className="font-semibold mb-2">{t.checkin.instructionsTitle}</h3>
      <ul className="text-neutral-600 text-sm list-none space-y-1">
        {t.checkin.instructions.map((inst, i) => (
          <li key={i} dangerouslySetInnerHTML={{ 
            __html: inst.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
          }} />
        ))}
      </ul>
    </div>
  </div>
)

const ContentWifi = ({ t }: { t: typeof translations.es }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">{t.wifi.title}</h2>
    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
      <div className="space-y-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">{t.wifi.network}</div>
          <div className="flex items-center text-xl font-bold text-emerald-900">
            <span>MiDepartamento_5G</span>
            <CopyButton text="MiDepartamento_5G" label={t.copy} />
          </div>
        </div>
        <div className="w-full h-px bg-emerald-200" />
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">{t.wifi.password}</div>
          <div className="flex items-center text-xl font-bold text-emerald-900">
            <span>WifiSeguro2024</span>
            <CopyButton text="WifiSeguro2024" label={t.copy} />
          </div>
        </div>
      </div>
    </div>
    <p className="text-center text-sm text-neutral-500">
      {t.wifi.scan}
    </p>
  </div>
)

const ContentHost = ({ t }: { t: typeof translations.es }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">{t.host.title}</h2>
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
        <User size={32} />
      </div>
      <div>
        <h3 className="text-lg font-bold">Marcela y Natalia</h3>
        <p className="text-neutral-500 text-sm">{t.host.superhost}</p>
      </div>
    </div>
    <div className="space-y-3">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider pl-1">Marcela</p>
        <a href="tel:+5491149288359" className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
          <PhoneCall size={20} className="text-neutral-400" />
          <span className="font-medium text-neutral-700">+54 9 11 4928-8359</span>
        </a>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider pl-1">Natalia</p>
        <a href="tel:+5491121546599" className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
          <PhoneCall size={20} className="text-neutral-400" />
          <span className="font-medium text-neutral-700">+54 9 11 2154-6599</span>
        </a>
      </div>

      <div className="pt-2">
         <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider pl-1 mb-1">{t.host.email}</p>
         <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
           <Mail size={20} className="text-neutral-400" />
           <span className="font-medium text-neutral-700 text-sm break-all">kalen.sma.nqn@gmail.com</span>
           <CopyButton text="kalen.sma.nqn@gmail.com" label={t.copy} />
         </div>
      </div>

      <p className="text-sm text-neutral-500 px-2 text-center mt-4 whitespace-pre-line">
        {t.host.availability}
      </p>
    </div>
  </div>
)

const ContentEmergency = ({ t }: { t: typeof translations.es }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-red-600">{t.emergency.title}</h2>
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
        <div key={item.name} className="flex items-center justify-between p-4 border border-red-100 bg-red-50 rounded-xl">
          <span className="font-medium text-red-900 text-sm max-w-[60%]">{item.name}</span>
          <a href={`tel:${item.number.replace(/\s/g, '')}`} className="flex items-center gap-2 font-bold text-red-600 bg-white px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap">
            <Phone size={14} />
            {item.number}
          </a>
        </div>
      ))}
    </div>
    <div className="mt-4 p-4 bg-neutral-100 rounded-xl">
      <h3 className="font-semibold text-sm mb-1">{t.emergency.addressTitle}</h3>
      <p className="text-neutral-600 whitespace-pre-line">{t.emergency.address}</p>
    </div>
  </div>
)

const ContentGuide = ({ t }: { t: typeof translations.es }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
    <div className="p-4 bg-pink-100 text-pink-600 rounded-full">
      <Clock size={48} />
    </div>
    <div>
      <h2 className="text-2xl font-bold text-neutral-900">{t.guide.title}</h2>
      <p className="text-neutral-500 mt-2">{t.comingSoon}</p>
    </div>
  </div>
)

// --- Main Page ---

export default function Home() {
  const [activeId, setActiveId] = useState<CategoryId | null>(null)
  const [lang, setLang] = useState<Language>("es")
  const t = translations[lang]

  const toggleLanguage = () => {
    setLang(current => current === "es" ? "en" : "es")
  }

  const renderContent = (id: CategoryId) => {
    switch (id) {
      case "rules": return <ContentRules t={t} />
      case "checkin": return <ContentCheckin t={t} />
      case "wifi": return <ContentWifi t={t} />
      case "host": return <ContentHost t={t} />
      case "emergency": return <ContentEmergency t={t} />
      case "guide": return <ContentGuide t={t} />
      default: return null
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-slate-900 overflow-hidden">
        {/* Background Image */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/hero-bg.jpg)',
            }} 
        />
        {/* Gradient Overlay for Text Readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Language Toggle */}
        <div className="absolute top-4 right-4 z-30">
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
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-4 text-center aspect-square md:aspect-auto md:h-48 group"
            >
              <div className={cn("p-4 rounded-full transition-transform group-hover:scale-110 duration-300", category.color)}>
                <category.icon size={32} />
              </div>
              <span className="font-semibold text-neutral-800">{t.categories[category.id]}</span>
            </motion.button>
          ))}
        </div>
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
