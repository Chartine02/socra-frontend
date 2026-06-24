import { Lightbulb } from 'lucide-react'
import Button from '../../ui/Button'

interface HintButtonProps {
  onClick?: () => void
}

export default function HintButton({ onClick }: HintButtonProps) {
  return (
    <Button iconLeft={<Lightbulb className="h-4 w-4" />} variant="secondary" onClick={onClick}>
      Need a hint?
    </Button>
  )
}
