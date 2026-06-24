import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'highlighted'
}

const variantClasses: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'border-socra-forest/20',
  highlighted: 'border border-socra-midbrown shadow-glow',
}

export default function Card({ children, className = '', variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border bg-socra-dark p-6 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}