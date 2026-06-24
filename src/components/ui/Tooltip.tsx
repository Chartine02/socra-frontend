import type { ReactNode } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
}

export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg border border-socra-forest/30 bg-socra-dark px-3 py-2 text-xs text-socra-stone shadow-lg group-hover:block">
        {content}
      </span>
    </span>
  )
}
