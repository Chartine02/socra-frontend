import { UploadCloud } from 'lucide-react'
import ProgressBar from '../ui/ProgressBar'

interface DocumentUploadZoneProps {
  progress?: number
  isUploading?: boolean
}

export default function DocumentUploadZone({ isUploading = false, progress = 0 }: DocumentUploadZoneProps) {
  return (
    <div className="group relative">
      <div className="relative flex min-h-[360px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-outline/30 bg-surface-container p-stack-lg transition-all duration-300 hover:border-primary/50 hover:bg-surface-container-high">
        <div className="flex flex-col items-center space-y-stack-md text-center">
          <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-primary-container/10 text-primary-container">
            <UploadCloud className="h-10 w-10" />
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Drop your first lecture notes or course PDF here.
          </h2>
          <p className="font-label-lg text-label-lg text-on-surface-variant/70">
            Supports PDF, DOCX, and Markdown (Max 25MB)
          </p>
          <button
            className="mt-stack-md rounded-lg border-b-4 border-[#424a2a] bg-primary-container px-stack-lg py-3 font-label-lg text-label-lg text-on-primary-container transition-all active:translate-y-[2px] active:border-b-2"
            type="button"
          >
            Browse Files
          </button>
        </div>

        {isUploading && (
          <div className="mt-stack-lg w-full max-w-md">
            <div className="flex items-center gap-stack-md rounded-lg border border-outline/20 bg-surface-container-lowest p-stack-md shadow-sm">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-tertiary-container/40 text-tertiary">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div className="min-w-0 flex-grow">
                <div className="mb-1 flex items-end justify-between">
                  <span className="truncate font-label-lg text-label-lg text-on-surface">Uploading...</span>
                  <span className="font-label-sm text-label-sm font-bold text-primary">{progress}%</span>
                </div>
                <ProgressBar value={progress} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
