import { Lightbulb } from 'lucide-react'

interface HintButtonProps {
  onClick?: () => void
}

export default function HintButton({ onClick }: HintButtonProps) {
  return (
    <button
      className="group flex items-center gap-2 rounded-full border border-outline-variant px-6 py-2 font-label-lg text-label-lg text-outline transition-all hover:border-primary hover:text-primary"
      onClick={onClick}
      type="button"
    >
      <Lightbulb className="transition-transform group-hover:rotate-12" size={18} />
      I'm stuck — give me a hint
    </button>
  )
}
