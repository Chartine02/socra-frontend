interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-6 w-6 border-[3px]',
}

export default function Spinner({ size = 'md' }: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block animate-spin rounded-full border-socra-stone/20 border-t-socra-stone ${sizeClasses[size]}`}
    />
  )
}