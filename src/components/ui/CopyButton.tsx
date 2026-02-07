"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CopyButtonProps {
  text: string
  label?: string
}

export function CopyButton({ text, label }: CopyButtonProps) {
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
