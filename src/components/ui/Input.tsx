import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ className = '', error, id, label, ...props }: InputProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm text-socra-stone" htmlFor={id}>
      {label ? <span className="font-medium text-socra-stone">{label}</span> : null}
      <input
        id={id}
        className={`w-full rounded-lg border border-socra-forest/30 bg-socra-dark px-4 py-3 text-socra-stone placeholder:text-socra-sand focus:border-socra-forest focus:outline-none focus:ring-1 focus:ring-socra-forest ${className}`}
        {...props}
      />
      {error ? <span className="text-sm text-socra-richbrown">{error}</span> : null}
    </label>
  )
}