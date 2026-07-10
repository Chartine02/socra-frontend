import { BookOpen, Calendar, FileText } from 'lucide-react'
import { formatDate } from '../../utils/formatters'
import type { Document } from '../../types/document.types'

interface DocumentCardProps {
  document: Document
  isActive: boolean
  onSelect: (id: string) => void
}

function masteryTag(mastery: number) {
  if (mastery >= 80) {
    return { label: 'Mastered', className: 'bg-tertiary-container/20 text-tertiary' }
  }
  if (mastery >= 40) {
    return { label: 'In Progress', className: 'bg-secondary-container/20 text-secondary' }
  }
  return { label: 'Urgent Review', className: 'bg-error-container/20 text-error' }
}

export default function DocumentCard({ document, isActive, onSelect }: DocumentCardProps) {
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (document.overallMastery / 100) * circumference
  const tag = masteryTag(document.overallMastery)

  return (
    <button
      className={`group relative flex h-[280px] flex-col rounded-xl p-6 text-left shadow-sm transition-all ${
        isActive
          ? 'border border-primary/30 bg-white ring-2 ring-primary-container'
          : 'border border-outline-variant/40 bg-white hover:border-primary/40'
      }`}
      onClick={() => onSelect(document.id)}
      type="button"
    >
      <div className="mb-stack-md flex items-start justify-between">
        <div className={`rounded-lg p-2 ${isActive ? 'bg-surface-container' : 'bg-surface-container-high'}`}>
          <FileText className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
        </div>
        <div className="relative h-12 w-12">
          <svg className="h-full w-full -rotate-90">
            <circle
              className="text-surface-container-low"
              cx="24"
              cy="24"
              fill="transparent"
              r={radius}
              stroke="currentColor"
              strokeWidth="4"
            />
            <circle
              className="text-primary-container transition-[stroke-dashoffset] duration-500"
              cx="24"
              cy="24"
              fill="transparent"
              r={radius}
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              strokeWidth="4"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-label-sm text-label-sm text-primary">
            {document.overallMastery}%
          </span>
        </div>
      </div>

      <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-on-surface">{document.fileName}</h3>

      <div className="mt-auto flex flex-col gap-1">
        <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
          <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
          {formatDate(document.uploadedAt)}
        </span>
        <span className="flex items-center gap-1 font-label-sm text-label-sm text-primary">
          <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
          {document.knowledgeUnits?.length ?? 0} Knowledge Units
        </span>
      </div>

      <div className="mt-stack-md flex flex-wrap gap-2">
        <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${tag.className}`}>
          {tag.label}
        </span>
        {document.summary && (
          <span className="rounded bg-primary-container/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            Study Notes
          </span>
        )}
      </div>
    </button>
  )
}
