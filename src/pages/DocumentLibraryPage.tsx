import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import DocumentCard from '../components/documents/DocumentCard'
import DocumentCardSkeleton from '../components/documents/DocumentCardSkeleton'
import DocumentTopicPanel from '../components/documents/DocumentTopicPanel'
import { useDocumentUpload } from '../hooks/useDocumentUpload'
import { documentService } from '../services/documentService'
import { useDocumentStore } from '../store/documentStore'
import type { Document } from '../types/document.types'

export default function DocumentLibraryPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { mutate: upload } = useDocumentUpload()
  const uploadingDocs = useDocumentStore((state) => state.uploadingDocs)

  const { data: documents = [], isLoading } = useQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: documentService.fetchDocuments,
    refetchInterval: (query) => {
      const docs = query.state.data
      const hasProcessing = docs?.some((d) => d.processingStatus === 'PROCESSING')
      return hasProcessing ? 5000 : false
    },
  })

  const [activeId, setActiveId] = useState<string | null>(null)
  const activeDocument = documents.find((doc) => doc.id === activeId) ?? null

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      upload(file)
    }
    e.target.value = ''
  }

  return (
    <div className="min-h-screen bg-surface pb-24 md:pb-0">
      <Navbar />
      <input
        ref={fileInputRef}
        accept=".pdf,.docx,.md"
        className="hidden"
        onChange={handleFileChange}
        type="file"
      />
      <main className="relative mx-auto flex max-w-7xl flex-col gap-stack-lg px-container-margin py-stack-lg md:flex-row">
        <div className="flex-1 transition-all duration-300">
          <header className="mb-stack-lg flex items-end justify-between gap-4">
            <div>
              <h1 className="mb-1 font-headline-lg text-headline-lg text-on-surface">Knowledge Repository</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Manage your academic sources and track unit mastery.
              </p>
            </div>
            <button
              className="flex items-center gap-2 rounded-xl border-b-4 border-on-secondary-fixed-variant bg-primary-container px-6 py-3 font-label-lg text-label-lg text-on-primary-container shadow-xl transition-all hover:brightness-110 active:scale-95"
              onClick={handleUploadClick}
              type="button"
            >
              <PlusCircle className="h-5 w-5" />
              Upload Document
            </button>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-stack-lg">
              {Array.from({ length: 4 }).map((_, i) => (
                <DocumentCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-stack-lg">
              {uploadingDocs.map((uploading) => (
                <DocumentCardSkeleton fileName={uploading.fileName} key={uploading.tempId} />
              ))}
              {documents.map((document) =>
                document.processingStatus === 'PROCESSING' ? (
                  <DocumentCardSkeleton fileName={document.fileName} key={document.id} processing />
                ) : (
                  <DocumentCard
                    document={document}
                    isActive={document.id === activeId}
                    key={document.id}
                    onSelect={setActiveId}
                  />
                ),
              )}
            </div>
          )}
        </div>

        {activeDocument && <DocumentTopicPanel document={activeDocument} onClose={() => setActiveId(null)} />}
      </main>
      <BottomNav />
    </div>
  )
}