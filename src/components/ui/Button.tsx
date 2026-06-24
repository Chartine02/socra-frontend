import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Spinner from './Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-socra-forest text-socra-darkest hover:bg-socra-sage focus-visible:ring-socra-sage',
  secondary:
    'border border-socra-sage text-socra-sage hover:bg-socra-dark focus-visible:ring-socra-sage',
  destructive:
    'bg-socra-richbrown text-socra-stone hover:bg-socra-deepbrown focus-visible:ring-socra-richbrown',
  ghost:
    'text-socra-tan hover:text-socra-stone focus-visible:ring-socra-sage',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export default function Button({
  children,
  className = '',
  disabled,
  iconLeft,
  iconRight,
  isLoading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-socra-darkest disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : iconLeft}
      <span>{children}</span>
      {!isLoading ? iconRight : null}
    </button>
  )
}