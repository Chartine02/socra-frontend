import { UploadCloud } from 'lucide-react'
import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'

interface DocumentUploadZoneProps {
  progress?: number
  isUploading?: boolean
}

export default function DocumentUploadZone({ isUploading = false, progress = 0 }: DocumentUploadZoneProps) {
  return (
    <Card className="border-dashed border-socra-sage/50 bg-socra-darkest/40 text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-10">
        <span className="rounded-full bg-socra-forest/20 p-4 text-socra-sage">
          <UploadCloud className="h-7 w-7" />
        </span>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-socra-stone">Drop PDFs, slides, or notes here.</h2>
          <p className="text-sm text-socra-tan">SOCRA will extract concepts, build mastery units, and prepare adaptive assessments.</p>
        </div>
        {isUploading ? <ProgressBar label="Uploading" value={progress} /> : <p className="text-sm text-socra-sand">Drag and drop upload area</p>}
      </div>
    </Card>
  )
}
