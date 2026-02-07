import type { ReactNode, ElementType } from "react"

export type Language = "es" | "en"

export type CategoryId = "rules" | "checkin" | "wifi" | "host" | "emergency" | "guide" | "parking"

export interface Category {
  id: CategoryId
  icon: ElementType
  color: string
  darkColor: string
}

// Tipo para las traducciones (inferido del objeto)
import { translations } from "@/lib/translations"
export type Translations = typeof translations.es
