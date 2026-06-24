import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import PageWrapper from '../components/layout/PageWrapper'
import DocumentCard from '../components/documents/DocumentCard'
import DocumentTopicPanel from '../components/documents/DocumentTopicPanel'
import DocumentUploadZone from '../components/documents/DocumentUploadZone'
import type { Document } from '../types/document.types'

const sampleDocuments: Document[] = [
  {
    id: 'doc-1',
    fileName: 'BIO201 Cellular Signalling.pdf',
    uploadedAt: new Date(),
    knowledgeUnits: [
      {
        id: 'ku-1',
        topic: 'Signal transduction',
        concept: 'Second messenger cascades and receptor activation',
        bloomLevel: 'understand',
        masteryState: 'shaky',
        lastReviewed: new Date(),
        masteryPercentage: 62,
      },
    ],
    overallMastery: 62,
    lastStudied: new Date(),
    processingStatus: 'ready',
  },
]

export default function DocumentLibraryPage() {
  return (
    <div className="socra-shell min-h-screen">
      <Navbar />
      <PageWrapper title="Document library" subtitle="Manage uploaded course material and inspect extracted knowledge units before launching practice.">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <DocumentUploadZone />
            {sampleDocuments.map((document) => (
              <DocumentCard document={document} key={document.id} />
            ))}
          </div>
          <DocumentTopicPanel topics={sampleDocuments[0].knowledgeUnits} />
        </div>
      </PageWrapper>
      <BottomNav />
    </div>
  )
}