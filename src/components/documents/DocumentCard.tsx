import { BookOpenCheck, Clock3 } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import { formatDate } from '../../utils/formatters'
import type { Document } from '../../types/document.types'

interface DocumentCardProps {
  document: Document
}

export default function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Card className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Course material</p>
          <h2 className="mt-2 text-2xl font-semibold text-socra-stone">{document.fileName}</h2>
        </div>
        <Badge masteryState={document.overallMastery >= 80 ? 'mastered' : document.overallMastery >= 50 ? 'shaky' : 'forgotten'} />
      </div>
      <ProgressBar label="Overall mastery" value={document.overallMastery} />
      <div className="grid gap-3 text-sm text-socra-tan sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4" />
          Uploaded {formatDate(document.uploadedAt)}
        </div>
        <div className="flex items-center gap-2">
          <BookOpenCheck className="h-4 w-4" />
          {document.knowledgeUnits.length} extracted knowledge units
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>Study now</Button>
        <Button variant="secondary">Open topic view</Button>
      </div>
    </Card>
  )
}
