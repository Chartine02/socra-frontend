import { FileText, Loader2 } from 'lucide-react'

interface DocumentCardSkeletonProps {
  fileName?: string
  processing?: boolean
}

export default function DocumentCardSkeleton({ fileName, processing }: DocumentCardSkeletonProps) {
  return (
    <div className="relative flex flex-col rounded-xl border border-outline-variant/40 bg-white p-6 shadow-sm">
      <div className="mb-stack-md flex items-start justify-between">
        <div className="rounded-lg bg-surface-container-high p-2">
          <FileText className="h-6 w-6 text-on-surface-variant opacity-40" />
        </div>
        <div className="relative h-12 w-12">
          <Loader2 className="h-full w-full animate-spin text-primary/40" />
        </div>
      </div>

      {fileName ? (
        <h3 className="mb-2 font-headline-md text-headline-md text-on-surface">{fileName}</h3>
      ) : (
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-surface-container-high" />
      )}

      <div className="mb-stack-md flex flex-col gap-1">
        {processing ? (
          <span className="flex items-center gap-1 font-label-sm text-label-sm text-primary/70">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Processing document...
          </span>
        ) : (
          <>
            <div className="h-4 w-1/2 animate-pulse rounded bg-surface-container-high" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-surface-container-high" />
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="rounded bg-surface-container-high px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/50">
          {processing ? 'Processing' : 'Loading...'}
        </span>
      </div>
    </div>
  )
}
