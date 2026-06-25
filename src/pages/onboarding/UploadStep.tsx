import { useState } from 'react'
import DocumentUploadZone from '../../components/documents/DocumentUploadZone'
import { useDocumentUpload } from '../../hooks/useDocumentUpload'
import { useDocumentStore } from '../../store/documentStore'

export default function UploadStep() {
  const { mutate: upload, reset } = useDocumentUpload()
  const { isUploading, uploadProgress } = useDocumentStore()
  const [selectedFileName, setSelectedFileName] = useState<string | undefined>()

  const handleFileSelect = (file: File) => {
    setSelectedFileName(file.name)
    upload(file)
  }

  const handleCancel = () => {
    reset()
    useDocumentStore.getState().setUploadProgress(0)
    setSelectedFileName(undefined)
  }

  return (
    <div className="space-y-stack-lg">
      {/* Hero / Intro */}
      <div className="mb-stack-lg text-center">
        <h1 className="mb-stack-sm font-headline-lg text-headline-lg text-on-surface">Nourish your knowledge base</h1>
        <p className="mx-auto max-w-[500px] font-body-lg text-body-lg text-on-surface-variant">
          SOCRA will read your materials and build your first study session.
        </p>
      </div>

      {/* Upload Canvas */}
      <DocumentUploadZone
        fileName={selectedFileName}
        isUploading={isUploading}
        onCancel={handleCancel}
        onFileSelect={handleFileSelect}
        progress={uploadProgress}
      />

      {/* Feature Highlights */}
      <div className="mt-stack-lg grid grid-cols-1 gap-stack-md md:grid-cols-2">
        <div className="flex items-start gap-stack-sm rounded-xl border border-outline/10 bg-surface-container-low p-stack-md">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          <div>
            <h4 className="mb-1 font-label-lg text-label-lg text-on-surface">Socratic Synthesis</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant/80">
              Our AI identifies core concepts and creates personalized inquiry paths.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-stack-sm rounded-xl border border-outline/10 bg-surface-container-low p-stack-md">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
            security
          </span>
          <div>
            <h4 className="mb-1 font-label-lg text-label-lg text-on-surface">Academic Privacy</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant/80">
              Documents are encrypted and used only to power your learning journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
