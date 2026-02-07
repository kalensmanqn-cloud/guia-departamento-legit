# Plan de Refactorización: Modularización de Modales

## Resumen

El archivo `src/app/page.tsx` actualmente contiene **1017 líneas** con todo el código de la aplicación en un solo archivo. Este plan propone extraer los **7 modales/componentes de contenido** a archivos separados para mejorar la mantenibilidad, legibilidad y organización del código.

---

## Estado Actual

### Componentes de contenido identificados (7 modales):

| # | Componente | Líneas | Descripción |
|---|------------|--------|-------------|
| 1 | `ContentRules` | 397-409 (~13 líneas) | Reglas de convivencia |
| 2 | `ContentCheckin` | 411-437 (~27 líneas) | Check-in / Check-out |
| 3 | `ContentWifi` | 439-479 (~41 líneas) | Conexión WiFi |
| 4 | `ContentHost` | 481-524 (~44 líneas) | Información del anfitrión |
| 5 | `ContentEmergency` | 526-553 (~28 líneas) | Números de emergencia |
| 6 | `ContentParking` | 555-587 (~33 líneas) | Estacionamiento medido |
| 7 | `ContentGuide` | 589-867 (~279 líneas) | Guía turística (con sub-vistas) |

### Otros elementos a modularizar:

| Elemento | Líneas | Descripción |
|----------|--------|-------------|
| `translations` | 40-319 (~280 líneas) | Textos en español e inglés |
| `Modal` | 343-373 (~31 líneas) | Componente modal base |
| `CopyButton` | 375-393 (~19 líneas) | Botón para copiar texto |
| `categoriesData` | 332-339 (~8 líneas) | Datos de categorías |
| Tipos | 38, 323-330 | `Language`, `CategoryId`, `Category` |

---

## Nueva Estructura de Carpetas Propuesta

```
src/
├── app/
│   └── page.tsx                    # Componente principal (reducido)
├── components/
│   ├── ui/
│   │   ├── Modal.tsx               # Componente modal base
│   │   └── CopyButton.tsx          # Botón para copiar
│   └── modals/
│       ├── ContentRules.tsx        # Modal: Reglas
│       ├── ContentCheckin.tsx      # Modal: Check-in/out
│       ├── ContentWifi.tsx         # Modal: WiFi
│       ├── ContentHost.tsx         # Modal: Anfitrión
│       ├── ContentEmergency.tsx    # Modal: Emergencias
│       ├── ContentParking.tsx      # Modal: Estacionamiento
│       ├── ContentGuide.tsx        # Modal: Guía turística
│       └── index.ts                # Re-exportaciones
├── lib/
│   ├── translations.ts             # Traducciones ES/EN
│   ├── types.ts                    # Tipos TypeScript
│   └── constants.ts                # Constantes y datos
└── ...
```

---

## Plan de Implementación

### Fase 1: Crear estructura base

1. **Crear directorio `src/components/ui/`**
2. **Crear directorio `src/components/modals/`**

### Fase 2: Extraer tipos y constantes

1. **Crear `src/lib/types.ts`**
   - Mover tipo `Language`
   - Mover tipo `CategoryId`
   - Mover interfaz `Category`
   - Crear tipo para las traducciones

2. **Crear `src/lib/translations.ts`**
   - Mover el objeto `translations` completo
   - Exportar como constante

3. **Crear `src/lib/constants.ts`**
   - Mover `categoriesData`

### Fase 3: Extraer componentes UI base

1. **Crear `src/components/ui/Modal.tsx`**
   - Mover componente `Modal`
   - Agregar imports necesarios (framer-motion, lucide-react)

2. **Crear `src/components/ui/CopyButton.tsx`**
   - Mover componente `CopyButton`

### Fase 4: Extraer componentes de modales

1. **Crear `src/components/modals/ContentRules.tsx`**
2. **Crear `src/components/modals/ContentCheckin.tsx`**
3. **Crear `src/components/modals/ContentWifi.tsx`**
4. **Crear `src/components/modals/ContentHost.tsx`**
5. **Crear `src/components/modals/ContentEmergency.tsx`**
6. **Crear `src/components/modals/ContentParking.tsx`**
7. **Crear `src/components/modals/ContentGuide.tsx`**
   - Este es el más complejo, considerar sub-componentes internos

8. **Crear `src/components/modals/index.ts`**
   - Archivo barrel para re-exportar todos los modales

### Fase 5: Actualizar page.tsx

1. Actualizar imports para usar los nuevos módulos
2. Remover código duplicado
3. Verificar que todo funcione correctamente

---

## Detalles de Cada Módulo

### `src/lib/types.ts`

```typescript
export type Language = "es" | "en"
export type CategoryId = "rules" | "checkin" | "wifi" | "host" | "emergency" | "guide" | "parking"

export interface Category {
  id: CategoryId
  icon: React.ElementType
  color: string
  darkColor: string
}

// Tipo para las traducciones (inferido del objeto)
export type Translations = typeof import('./translations').translations
```

### `src/components/modals/ContentRules.tsx`

```typescript
"use client"
import type { Translations } from "@/lib/types"

interface ContentRulesProps {
  t: Translations["es"] | Translations["en"]
}

export const ContentRules = ({ t }: ContentRulesProps) => {
  // ... contenido del componente
}
```

### `src/components/modals/index.ts`

```typescript
export { ContentRules } from './ContentRules'
export { ContentCheckin } from './ContentCheckin'
export { ContentWifi } from './ContentWifi'
export { ContentHost } from './ContentHost'
export { ContentEmergency } from './ContentEmergency'
export { ContentParking } from './ContentParking'
export { ContentGuide } from './ContentGuide'
```

---

## Impacto Esperado

| Métrica | Antes | Después |
|---------|-------|---------|
| Líneas en `page.tsx` | ~1017 | ~200-250 |
| Archivos | 1 | ~12 |
| Mantenibilidad | Baja | Alta |
| Reutilización | Difícil | Fácil |
| Testing | Complejo | Modular |

---

## Consideraciones

### ⚠️ Puntos de atención

1. **ContentGuide.tsx** es el componente más complejo (~279 líneas) con:
   - Estado interno (`view`, `activeFilter`, `isFilterOpen`)
   - Sub-vistas (benefits, gastronomy, activities, info)
   - Lógica de filtrado para gastronomía
   - Considerar extraer sub-componentes si es necesario

2. **Traducciones**: Los datos de gastronomía y actividades dentro de las traducciones son extensos. Considerar mover estos datos a archivos separados si crecen más.

3. **Imports circulares**: Asegurarse de que los tipos y constantes estén en un lugar que no genere dependencias circulares.

### ✅ Beneficios

- Código más organizado y fácil de navegar
- Cada modal puede desarrollarse y probarse de forma independiente
- Facilita agregar nuevos modales en el futuro
- Mejor separación de responsabilidades
- Facilita la colaboración en equipo

---

## Orden de Ejecución Recomendado

1. ✅ Crear tipos y constantes primero (sin dependencias)
2. ✅ Crear componentes UI base (`Modal`, `CopyButton`)
3. ✅ Crear modales simples primero (`ContentRules`, `ContentParking`)
4. ✅ Crear modales más complejos (`ContentGuide`)
5. ✅ Actualizar `page.tsx` con nuevos imports
6. ✅ Verificar funcionamiento completo
7. ✅ Eliminar código duplicado

---

## ¿Procedemos con la implementación?

Una vez que apruebes este plan, procederé a:
1. Crear la nueva estructura de carpetas
2. Extraer cada componente a su respectivo archivo
3. Actualizar `page.tsx` para usar los nuevos módulos
4. Verificar que todo funcione correctamente
