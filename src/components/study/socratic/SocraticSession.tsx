import { useState } from 'react'
import { Send } from 'lucide-react'
import Card from '../../ui/Card'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import BloomLevelPill from './BloomLevelPill'
import DialogueTurn from './DialogueTurn'
import HintButton from './HintButton'
import type { DialogueTurn as DialogueTurnType, BloomLevel } from '../../../types/study.types'

interface SocraticSessionProps {
  turns: DialogueTurnType[]
  currentBloomLevel: BloomLevel
}

export default function SocraticSession({ currentBloomLevel, turns }: SocraticSessionProps) {
  const [draft, setDraft] = useState('')

  return (
    <Card className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Socratic dialogue</p>
          <h2 className="mt-2 text-2xl font-semibold text-socra-stone">Push the concept one step deeper.</h2>
        </div>
        <BloomLevelPill level={currentBloomLevel} />
      </div>
      <div className="space-y-4">
        {turns.map((turn) => (
          <DialogueTurn key={turn.id} turn={turn} />
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
        <Input placeholder="Respond to the prompt and make your reasoning explicit." value={draft} onChange={(event) => setDraft(event.target.value)} />
        <HintButton />
        <Button iconRight={<Send className="h-4 w-4" />}>Send</Button>
      </div>
    </Card>
  )
}
