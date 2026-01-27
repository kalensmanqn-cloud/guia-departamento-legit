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
  Mail
} from "lucide-react"
import { cn } from "@/lib/utils"

// --- Data ---

type CategoryId = "rules" | "checkin" | "wifi" | "host" | "emergency" | "guide"

interface Category {
  id: CategoryId
  title: string
  icon: React.ElementType
  color: string
}

const categories: Category[] = [
  { id: "rules", title: "Reglas de convivencia", icon: BookOpen, color: "bg-orange-100 text-orange-600" },
  { id: "checkin", title: "Check-in / Check-out", icon: Clock, color: "bg-blue-100 text-blue-600" },
  { id: "wifi", title: "Wifi", icon: Wifi, color: "bg-emerald-100 text-emerald-600" },
  { id: "host", title: "Tu Anfitrión", icon: User, color: "bg-violet-100 text-violet-600" },
  { id: "emergency", title: "Emergencias", icon: Siren, color: "bg-red-100 text-red-600" },
  { id: "guide", title: "Guía Turística", icon: MapIcon, color: "bg-pink-100 text-pink-600" },
]

// --- Components ---

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  // Lock body scroll when modal is open (optional improvement, omitted for simplicity)
  
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

function CopyButton({ text }: { text: string }) {
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
      title="Copiar"
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  )
}

// --- Content Components ---

const ContentRules = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold mb-4">Reglas de la casa</h2>
    <ul className="space-y-3 text-neutral-600">
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>No está permitido fumar/vapear.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>No se permiten fiestas ni eventos.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>Por favor, respetar el horario de silencio (23 a 7).</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>Cuidar utensilios y vajilla, en caso de faltantes y/o roturas, deberán ser abonados o repuestos.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>La limpieza de la cabaña no incluye el lavado de vajilla.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>El cambio de toallas y toallones se realizará cada 4 noches de estadía.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>El cambio de sábanas se realizará una vez a la semana (7 noches de estadía).</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>La limpieza general se realizará una vez a la semana, quedando a cargo del huésped el mantenimiento diario, con los elementos disponibles en la cabaña.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>No desconectar el router del wifi.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>No deslizar la traba de la cerradura electrónica. En caso de requerir asistencia para desbloquearla, el huésped deberá abonar un cargo adicional.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>No modificar la posición de las llaves de paso del baño.</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
        <span>Se ruega cuidar los recursos, como el agua y la luz.</span>
      </li>
    </ul>
  </div>
)

const ContentCheckin = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Check-in / Check-out</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-blue-50 rounded-xl text-center">
        <div className="text-sm text-blue-600 font-medium mb-1">Check-in</div>
        <div className="text-2xl font-bold text-blue-900">13:00</div>
        <div className="text-xs text-blue-500 mt-1">En adelante</div>
      </div>
      <div className="p-4 bg-orange-50 rounded-xl text-center">
        <div className="text-sm text-orange-600 font-medium mb-1">Check-out</div>
        <div className="text-2xl font-bold text-orange-900">10:00</div>
        <div className="text-xs text-orange-500 mt-1">Máximo</div>
      </div>
    </div>
    <div className="bg-neutral-50 p-4 rounded-xl">
      <h3 className="font-semibold mb-2">Instrucciones de salida</h3>
      <p className="text-neutral-600 text-sm">
        El egreso es autónomo. Dejar las <strong>llaves de ingreso</strong> al edificio sobre la mesa.
        Dejar <strong>toallas y toallones</strong> en el cesto de lavandería.
        No olvidar <strong>sacar la basura</strong> y dejarla en el cesto ubicado en la vereda.
      </p>
    </div>
  </div>
)

const ContentWifi = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Conexión Wifi</h2>
    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
      <div className="space-y-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">Red (Network)</div>
          <div className="flex items-center text-xl font-bold text-emerald-900">
            <span>MiDepartamento_5G</span>
            <CopyButton text="MiDepartamento_5G" />
          </div>
        </div>
        <div className="w-full h-px bg-emerald-200" />
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">Contraseña (Password)</div>
          <div className="flex items-center text-xl font-bold text-emerald-900">
            <span>WifiSeguro2024</span>
            <CopyButton text="WifiSeguro2024" />
          </div>
        </div>
      </div>
    </div>
    <p className="text-center text-sm text-neutral-500">
      Escanea el código QR que se encuentra en la mesa del comedor para conectar automáticamente.
    </p>
  </div>
)

const ContentHost = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Tus Anfitrionas</h2>
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
        <User size={32} />
      </div>
      <div>
        <h3 className="text-lg font-bold">Marcela y Natalia</h3>
        <p className="text-neutral-500 text-sm">Superhosts</p>
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
         <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider pl-1 mb-1">Email del Departamento</p>
         <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
           <Mail size={20} className="text-neutral-400" />
           <span className="font-medium text-neutral-700 text-sm break-all">kalen.sma.nqn@gmail.com</span>
           <CopyButton text="kalen.sma.nqn@gmail.com" />
         </div>
      </div>

      <p className="text-sm text-neutral-500 px-2 text-center mt-4">
        Disponible de 08:00 a 22:00 para consultas generales.
        <br />
        24hs para urgencias del departamento.
      </p>
    </div>
  </div>
)

const ContentEmergency = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-red-600">Números de Emergencia</h2>
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
      <h3 className="font-semibold text-sm mb-1">Dirección del departamento</h3>
      <p className="text-neutral-600">Av. Libertador 1234, Piso 5, Depto B.<br/>Buenos Aires, Argentina.</p>
    </div>
  </div>
)

const ContentGuide = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
    <div className="p-4 bg-pink-100 text-pink-600 rounded-full">
      <Clock size={48} />
    </div>
    <div>
      <h2 className="text-2xl font-bold text-neutral-900">Guía Turística</h2>
      <p className="text-neutral-500 mt-2">Disponible próximamente</p>
    </div>
  </div>
)

// --- Main Page ---

export default function Home() {
  const [activeId, setActiveId] = useState<CategoryId | null>(null)

  const renderContent = (id: CategoryId) => {
    switch (id) {
      case "rules": return <ContentRules />
      case "checkin": return <ContentCheckin />
      case "wifi": return <ContentWifi />
      case "host": return <ContentHost />
      case "emergency": return <ContentEmergency />
      case "guide": return <ContentGuide />
      default: return null
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      {/* Hero Section */}
      <div className="relative h-64 bg-slate-900 overflow-hidden">
         {/* Placeholder for background image */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-2 tracking-tight">Bienvenidos a Departamento KALEN</h1>
            <p className="text-lg text-slate-200">Esperamos que disfruten su estadía</p>
          </motion.div>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
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
              <span className="font-semibold text-neutral-800">{category.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-neutral-400 text-sm p-6">
        <p>© 2024 Guía de Alojamiento</p>
      </footer>

      {/* Detail Modal */}
      <Modal isOpen={!!activeId} onClose={() => setActiveId(null)}>
        {activeId && renderContent(activeId)}
      </Modal>
    </main>
  )
}
