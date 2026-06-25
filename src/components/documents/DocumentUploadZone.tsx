import { useCallback, useRef, useState } from 'react'
import { UploadCloud, X } from 'lucide-react'
import ProgressBar from '../ui/ProgressBar'

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/markdown',
]
const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.md']
const MAX_SIZE_BYTES = 25 * 1024 * 1024 // 25MB

interface DocumentUploadZoneProps {
  progress?: number
  isUploading?: boolean
  fileName?: string
  onFileSelect?: (file: File) => void
  onCancel?: () => void
}

export default function DocumentUploadZone({
  isUploading = false,
  progress = 0,
  fileName,
  onFileSelect,
  onCancel,
}: DocumentUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ACCEPTED_TYPES.includes(file.type) && !ACCEPTED_EXTENSIONS.includes(extension)) {
      return 'Unsupported file type. Please upload PDF, DOCX, or Markdown files.'
    }
    if (file.size > MAX_SIZE_BYTES) {
      return 'File is too large. Maximum size is 25MB.'
    }
    return null
  }

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }
      setError(null)
      onFileSelect?.(file)
    },
    [onFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
      // Reset input so the same file can be re-selected
      e.target.value = ''
    },
    [handleFile],
  )

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="group relative">
      <input
        ref={fileInputRef}
        accept=".pdf,.docx,.md"
        className="hidden"
        onChange={handleInputChange}
        type="file"
      />
      <div
        className={`relative flex min-h-[360px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-stack-lg transition-all duration-300 ${
          isDragOver
            ? 'border-primary bg-surface-container-high scale-[1.01]'
            : 'border-outline/30 bg-surface-container hover:border-primary/50 hover:bg-surface-container-high'
        }`}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-stack-md text-center">
          <div
            className={`mb-2 flex h-20 w-20 items-center justify-center rounded-full transition-colors ${
              isDragOver ? 'bg-primary-container/20 text-primary' : 'bg-primary-container/10 text-primary-container'
            }`}
          >
            <UploadCloud className="h-10 w-10" />
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {isDragOver ? 'Drop your file here' : 'Drop your first lecture notes or course PDF here.'}
          </h2>
          <p className="font-label-lg text-label-lg text-on-surface-variant/70">
            Supports PDF, DOCX, and Markdown (Max 25MB)
          </p>
          {error && <p className="font-label-lg text-label-lg text-error">{error}</p>}
          <button
            className="mt-stack-md rounded-lg border-b-4 border-[#424a2a] bg-primary-container px-stack-lg py-3 font-label-lg text-label-lg text-on-primary-container transition-all active:translate-y-[2px] active:border-b-2"
            onClick={handleBrowseClick}
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
                  <span className="truncate font-label-lg text-label-lg text-on-surface">
                    {fileName ?? 'Uploading...'}
                  </span>
                  <span className="font-label-sm text-label-sm font-bold text-primary">
                    {progress >= 100 ? 'Complete' : `${progress}%`}
                  </span>
                </div>
                <ProgressBar value={progress} />
              </div>
              {onCancel && (
                <button
                  className="text-on-surface-variant transition-colors hover:text-error"
                  onClick={onCancel}
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
