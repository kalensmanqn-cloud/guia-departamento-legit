import {
  BookOpen,
  Clock,
  Wifi,
  User,
  Siren,
  Map as MapIcon,
} from "lucide-react"
import { Category } from "@/lib/types"

export const categoriesData: Category[] = [
  { id: "rules", icon: BookOpen, color: "bg-orange-100 text-orange-600", darkColor: "dark:bg-orange-950/50 dark:text-orange-400" },
  { id: "checkin", icon: Clock, color: "bg-blue-100 text-blue-600", darkColor: "dark:bg-blue-950/50 dark:text-blue-400" },
  { id: "wifi", icon: Wifi, color: "bg-emerald-100 text-emerald-600", darkColor: "dark:bg-emerald-950/50 dark:text-emerald-400" },
  { id: "host", icon: User, color: "bg-violet-100 text-violet-600", darkColor: "dark:bg-violet-950/50 dark:text-violet-400" },
  { id: "emergency", icon: Siren, color: "bg-red-100 text-red-600", darkColor: "dark:bg-red-950/50 dark:text-red-400" },
  { id: "guide", icon: MapIcon, color: "bg-pink-100 text-pink-600", darkColor: "dark:bg-pink-950/50 dark:text-pink-400" },
]
