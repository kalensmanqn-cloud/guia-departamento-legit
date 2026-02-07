"use client"

import { useState, useEffect } from "react"
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
  Utensils,
  Ticket,
  Mountain,
  Info,
  ArrowLeft,
  Star,

  Phone,
  MessageCircle,
  Mail,
  Languages,
  Moon,
  Sun,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Eye,
  EyeOff
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
      guide: "Guía Turística",
      parking: "Estacionamiento Medido"
    },
    footer: "© 2026 Guía de Alojamiento",
    comingSoon: "Disponible próximamente",
    copy: "Copiar",
    parking: {
      title: "Estacionamiento Medido",
      description: "La ciudad cuenta con sistema de estacionamiento medido.",
      schedule: [
        "Lunes a Viernes: 8 hs a 20 hs",
        "Sábados: 8 hs a 13 hs"
      ],
      moreInfo: "Para mayor información ingresar a:",
      link: "https://saemsmandes.com.ar/"
    },
    rules: {
      title: "Reglas de la casa",
      items: [
        "No está permitido fumar/vapear.",
        "No se permiten fiestas ni eventos.",
        "Por favor, respetar el horario de silencio (23 a 7).",
        "Cuidar utensilios y vajilla, en caso de faltantes y/o roturas, deberán ser abonados o repuestos.",
        "La limpieza de la cabaña no incluye el lavado de vajilla.",
        "El recambio de sábanas, toallas y toallones se realizará una vez a la semana, a solicitud del huésped, en estadías superiores a 7 noches.",
        "La limpieza general se realizará una vez a la semana a solicitud del huésped -en estadías mayores a 7 noches. El mantenimiento diario queda a cargo del huésped, con los elementos disponibles en el departamento.",
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
        "Dejar **toallas y toallones usados** en la bañera.",
        "No olvidar **sacar la basura** y dejarla en el cesto ubicado en la vereda."
      ]
    },
    wifi: {
      title: "Conexión Wifi",
      network: "Red (Network)",
      password: "Contraseña (Password)",
      //scan: "Escanea el código QR que se encuentra en la mesa del comedor para conectar automáticamente."
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
      title: "Guía Turística",
      back: "Volver",
      menu: {
        benefits: "Beneficios",
        gastronomy: "Gastronomía",
        activities: "Actividades",
        info: "Información útil"
      },
      benefits: {
        title: "Beneficios",
        items: []
      },
      gastronomy: {
        title: "Gastronomía",
        items: [
          { name: "Próspero", type: "Restaurante", link: "https://maps.app.goo.gl/od3RoZE9LrfUbAPZ9", rating: "5.0", recommended: true },
          { name: "Vieja Deli", type: "Restaurante • Café", link: "https://maps.app.goo.gl/qUJk5ppyGcVuYn54A", rating: "4.4", recommended: true },
          { name: "Unser Traum", type: "Café", rating: "3.8", recommended: true, branches: [
            { name: "Suc. San Martín", link: "https://maps.app.goo.gl/zEU6d2VRagr13GUh6" },
            { name: "Suc. Roca", link: "https://maps.app.goo.gl/yinYKqgcAzVXYkgKA" }
          ]},
          { name: "La Costa del Pueblo", type: "Restaurante", link: "https://maps.app.goo.gl/TZ5jZ99n7a6Vf3Jn6", rating: "3.9" },
          { name: "Pantera Bar Bistro", type: "Bar • Restaurante • Sushi", link: "https://maps.app.goo.gl/n1NfFaQxvWFLXuwL6", rating: "4.7" },
          { name: "Dublin South Pub", type: "Bar • Café • Restaurante", link: "https://maps.app.goo.gl/emeAhms196HWYyu29", rating: "3.5" },
          { name: "Ulises", type: "Restaurante", link: "https://maps.app.goo.gl/P1g7iWjiTw79Tm6m9", rating: "4.6" },
          { name: "Piscis Parrilla", type: "Parrilla", rating: "4.1", recommended: true, branches: [
            { name: "Suc. Mariano Moreno", link: "https://maps.app.goo.gl/6NCQBK8nLynEvKiL7" },
            { name: "Suc. Belgrano", link: "https://maps.app.goo.gl/4dtidiWw2TEPbw3w7" }
          ]},
          { name: "La Vieja Aldea", type: "Chocolatería", link: "https://maps.app.goo.gl/BPJ7QcuvU8HHWbNv6", rating: "4.8", recommended: true },
          { name: "Mamuschka", type: "Chocolatería • Heladería", link: "https://maps.app.goo.gl/xZom5UJynhuuySuT7", rating: "4.7" },
          { name: "DELTURISTA", type: "Chocolatería • Heladería", link: "https://maps.app.goo.gl/NN158AZY5wz9ZJeEA", rating: "4.4" },
          { name: "Pata Negra", type: "Chocolatería • Heladería", link: "https://maps.app.goo.gl/xkVBrrgz3ac5bvCGA", rating: "4.6" },
          { name: "Riche", type: "Chocolatería • Heladería", link: "https://maps.app.goo.gl/M7crnZHtFCanuaTD8", rating: "4.3" },
          { name: "Mamusia", type: "Chocolatería • Heladería", link: "https://maps.app.goo.gl/aACSwvDrruNzUWaw9", rating: "4.5" },
          { name: "Grido", type: "Heladería", link: "https://maps.app.goo.gl/bcnxLZAnbNfV3hBx5", rating: "4.2" },
          { name: "Heladería San Martín", type: "Heladería", link: "https://maps.app.goo.gl/gQFMm54HDXA8qzwe7", rating: "4.5" },
          { name: "Pizza Cala", type: "Pizzería", link: "https://maps.app.goo.gl/NmgTeax3D138rvcw8", rating: "4.4" },
          { name: "Genaro Pizza", type: "Pizzería", link: "https://maps.app.goo.gl/H2P7YkbPHVCmd7aK6", rating: "4.4" },
          { name: "Gina Pizzeria", type: "Pizzería", link: "https://maps.app.goo.gl/wiyf5ZhwaWmgperx7", rating: "4.6" },
          { name: "Forastera Café", type: "Café", link: "https://maps.app.goo.gl/E8vgZg28ncK5j2yJ9", rating: "4.8" },
          { name: "Abolengo", type: "Café", link: "https://maps.app.goo.gl/DYuwzUmKrw3uD3Fa7", rating: "4.3" },
          { name: "Fiora Café", type: "Café", link: "https://maps.app.goo.gl/TEMHySoe9hYgC26S8", rating: "4.4" },
          { name: "Fassbier Cervecería", type: "Cervecería", link: "https://maps.app.goo.gl/HcWP9zVN1w9fdDj87", rating: "4.6" },
          { name: "Cervecería Piedra Buena", type: "Cervecería", link: "https://maps.app.goo.gl/shPZobj7JEoAzQnS6", rating: "4.3" },
          { name: "Jabalí", type: "Cervecería • Bar", link: "https://maps.app.goo.gl/Tg7Qd2rwpo6E5vvC8", rating: "4.1" },
          { name: "Parador Slonjah", type: "Cervecería • Bar", link: "https://maps.app.goo.gl/UPHwZ4XhHmxnM2C2A", rating: "4.3" }
        ]
      },
      activities: {
        title: "Actividades",
        items: [
          { name: "Trekking al Mirador", difficulty: "Media", duration: "2 hs" },
          { name: "Lago Lácar", difficulty: "Baja", duration: "Libre" }
        ]
      },
      info: {
        title: "Información útil",
        items: [
          { name: "Farmacia de Turno", desc: "Consultar cartelera en el centro" },
          { name: "Supermercado", desc: "Abierto hasta las 21:00 hs" }
        ]
      }
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
      guide: "Tourist Guide",
      parking: "Measured Parking"
    },
    footer: "© 2026 Accommodation Guide",
    comingSoon: "Coming soon",
    copy: "Copy",
    parking: {
      title: "Measured Parking",
      description: "The city has a measured parking system.",
      schedule: [
        "Monday to Friday: 8 AM to 8 PM",
        "Saturdays: 8 AM to 1 PM"
      ],
      moreInfo: "For more information visit:",
      link: "https://saemsmandes.com.ar/"
    },
    rules: {
      title: "House Rules",
      items: [
        "Smoking/vaping is not allowed.",
        "No parties or events allowed.",
        "Please respect quiet hours (11 PM to 7 AM).",
        "Take care of utensils and dishes; missing or broken items must be paid for or replaced.",
        "Cabin cleaning does not include dishwashing.",
        "Sheets, towels and bath towels will be changed once a week, upon guest request, for stays longer than 7 nights.",
        "General cleaning is done once a week upon guest request -for stays longer than 7 nights. Daily maintenance is the guest's responsibility using available supplies in the apartment.",
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
        "Leave **used towels and bath towels** in the bathtub.",
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
      title: "Tourist Guide",
      back: "Back",
      menu: {
        benefits: "Benefits",
        gastronomy: "Gastronomy",
        activities: "Activities",
        info: "Useful Info"
      },
      benefits: {
        title: "Benefits",
        items: []
      },
      gastronomy: {
        title: "Gastronomy",
        items: [
          { name: "Próspero", type: "Restaurant", link: "https://maps.app.goo.gl/od3RoZE9LrfUbAPZ9", rating: "5.0", recommended: true },
          { name: "Vieja Deli", type: "Restaurant • Cafe", link: "https://maps.app.goo.gl/qUJk5ppyGcVuYn54A", rating: "4.4", recommended: true },
          { name: "Unser Traum", type: "Cafe", rating: "3.8", recommended: true, branches: [
            { name: "Br. San Martín", link: "https://maps.app.goo.gl/zEU6d2VRagr13GUh6" },
            { name: "Br. Roca", link: "https://maps.app.goo.gl/yinYKqgcAzVXYkgKA" }
          ]},
          { name: "La Costa del Pueblo", type: "Restaurant", link: "https://maps.app.goo.gl/TZ5jZ99n7a6Vf3Jn6", rating: "3.9" },
          { name: "Pantera Bar Bistro", type: "Bar • Restaurant • Sushi", link: "https://maps.app.goo.gl/n1NfFaQxvWFLXuwL6", rating: "4.7" },
          { name: "Dublin South Pub", type: "Bar • Cafe • Restaurant", link: "https://maps.app.goo.gl/emeAhms196HWYyu29", rating: "3.5" },
          { name: "Ulises", type: "Restaurant", link: "https://maps.app.goo.gl/P1g7iWjiTw79Tm6m9", rating: "4.6" },
          { name: "Piscis Parrilla", type: "Grill", rating: "4.1", recommended: true, branches: [
            { name: "Br. Mariano Moreno", link: "https://maps.app.goo.gl/6NCQBK8nLynEvKiL7" },
            { name: "Br. Belgrano", link: "https://maps.app.goo.gl/4dtidiWw2TEPbw3w7" }
          ]},
          { name: "La Vieja Aldea", type: "Chocolate Shop", link: "https://maps.app.goo.gl/BPJ7QcuvU8HHWbNv6", rating: "4.8", recommended: true },
          { name: "Mamuschka", type: "Chocolate Shop • Ice Cream Shop", link: "https://maps.app.goo.gl/xZom5UJynhuuySuT7", rating: "4.7" },
          { name: "DELTURISTA", type: "Chocolate Shop • Ice Cream Shop", link: "https://maps.app.goo.gl/NN158AZY5wz9ZJeEA", rating: "4.4" },
          { name: "Pata Negra", type: "Chocolate Shop • Ice Cream Shop", link: "https://maps.app.goo.gl/xkVBrrgz3ac5bvCGA", rating: "4.6" },
          { name: "Riche", type: "Chocolate Shop • Ice Cream Shop", link: "https://maps.app.goo.gl/M7crnZHtFCanuaTD8", rating: "4.3" },
          { name: "Mamusia", type: "Chocolate Shop • Ice Cream Shop", link: "https://maps.app.goo.gl/aACSwvDrruNzUWaw9", rating: "4.5" },
          { name: "Grido", type: "Ice Cream Shop", link: "https://maps.app.goo.gl/bcnxLZAnbNfV3hBx5", rating: "4.2" },
          { name: "Heladería San Martín", type: "Ice Cream Shop", link: "https://maps.app.goo.gl/gQFMm54HDXA8qzwe7", rating: "4.5" },
          { name: "Pizza Cala", type: "Pizzeria", link: "https://maps.app.goo.gl/NmgTeax3D138rvcw8", rating: "4.4" },
          { name: "Genaro Pizza", type: "Pizzeria", link: "https://maps.app.goo.gl/H2P7YkbPHVCmd7aK6", rating: "4.4" },
          { name: "Gina Pizzeria", type: "Pizzeria", link: "https://maps.app.goo.gl/wiyf5ZhwaWmgperx7", rating: "4.6" },
          { name: "Forastera Café", type: "Cafe", link: "https://maps.app.goo.gl/E8vgZg28ncK5j2yJ9", rating: "4.8" },
          { name: "Abolengo", type: "Cafe", link: "https://maps.app.goo.gl/DYuwzUmKrw3uD3Fa7", rating: "4.3" },
          { name: "Fiora Café", type: "Cafe", link: "https://maps.app.goo.gl/TEMHySoe9hYgC26S8", rating: "4.4" },
          { name: "Fassbier Cervecería", type: "Brewery", link: "https://maps.app.goo.gl/HcWP9zVN1w9fdDj87", rating: "4.6" },
          { name: "Cervecería Piedra Buena", type: "Brewery", link: "https://maps.app.goo.gl/shPZobj7JEoAzQnS6", rating: "4.3" },
          { name: "Jabalí", type: "Brewery • Bar", link: "https://maps.app.goo.gl/Tg7Qd2rwpo6E5vvC8", rating: "4.1" },
          { name: "Parador Slonjah", type: "Brewery • Bar", link: "https://maps.app.goo.gl/UPHwZ4XhHmxnM2C2A", rating: "4.3" }
        ]
      },
      activities: {
        title: "Activities",
        items: [
          { name: "Viewpoint Trekking", difficulty: "Medium", duration: "2 hrs" },
          { name: "Lácar Lake", difficulty: "Easy", duration: "Free" }
        ]
      },
      info: {
        title: "Useful Info",
        items: [
          { name: "Duty Pharmacy", desc: "Check billboard in downtown" },
          { name: "Supermarket", desc: "Open until 9:00 PM" }
        ]
      }
    }
  }
}

// --- Data ---

type CategoryId = "rules" | "checkin" | "wifi" | "host" | "emergency" | "guide" | "parking"

interface Category {
  id: CategoryId
  icon: React.ElementType
  color: string
  darkColor: string
}

const categoriesData: Category[] = [
  { id: "rules", icon: BookOpen, color: "bg-orange-100 text-orange-600", darkColor: "dark:bg-orange-950/50 dark:text-orange-400" },
  { id: "checkin", icon: Clock, color: "bg-blue-100 text-blue-600", darkColor: "dark:bg-blue-950/50 dark:text-blue-400" },
  { id: "wifi", icon: Wifi, color: "bg-emerald-100 text-emerald-600", darkColor: "dark:bg-emerald-950/50 dark:text-emerald-400" },
  { id: "host", icon: User, color: "bg-violet-100 text-violet-600", darkColor: "dark:bg-violet-950/50 dark:text-violet-400" },
  { id: "emergency", icon: Siren, color: "bg-red-100 text-red-600", darkColor: "dark:bg-red-950/50 dark:text-red-400" },
  { id: "guide", icon: MapIcon, color: "bg-pink-100 text-pink-600", darkColor: "dark:bg-pink-950/50 dark:text-pink-400" },
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
            className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl md:h-auto max-h-[85vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl z-50 p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <X size={20} className="text-neutral-600 dark:text-neutral-300" />
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
      className="ml-2 p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500 dark:text-neutral-400"
      title={label || "Copiar"}
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  )
}

// --- Content Components ---

const ContentRules = ({ t }: { t: typeof translations.es }) => (
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

const ContentCheckin = ({ t }: { t: typeof translations.es }) => (
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

const ContentWifi = ({ t }: { t: typeof translations.es }) => {
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

const ContentHost = ({ t }: { t: typeof translations.es }) => (
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

const ContentEmergency = ({ t }: { t: typeof translations.es }) => (
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

const ContentParking = ({ t }: { t: typeof translations.es }) => (
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

const ContentGuide = ({ t }: { t: typeof translations.es }) => {
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
  )).sort()

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
    <div className="h-full pt-6"> {/* Added pt-6 for close button space */}
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
