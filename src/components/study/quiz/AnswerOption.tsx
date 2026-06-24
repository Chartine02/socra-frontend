import Button from '../../ui/Button'

interface AnswerOptionProps {
  label: string
  isSelected?: boolean
  onClick?: () => void
}

export default function AnswerOption({ isSelected = false, label, onClick }: AnswerOptionProps) {
  return (
    <Button className="w-full justify-start" variant={isSelected ? 'primary' : 'secondary'} onClick={onClick}>
      {label}
    </Button>
  )
}