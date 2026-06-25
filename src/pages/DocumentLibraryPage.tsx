import { useRef, useState } from 'react'
import { PlusCircle } from 'lucide-react'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import DocumentCard from '../components/documents/DocumentCard'
import DocumentTopicPanel from '../components/documents/DocumentTopicPanel'
import { useDocumentUpload } from '../hooks/useDocumentUpload'
import type { Document } from '../types/document.types'

const sampleDocuments: Document[] = [
  {
    id: 'doc-microbiology',
    fileName: 'Microbiology Fundamentals',
    uploadedAt: new Date('2023-10-12'),
    overallMastery: 75,
    lastStudied: new Date(),
    processingStatus: 'ready',
    knowledgeUnits: [
      {
        id: 'ku-1',
        topic: 'Cell Structure & Function',
        concept: 'Organelles, membranes, and cellular transport mechanisms',
        bloomLevel: 'understand',
        masteryState: 'mastered',
        lastReviewed: new Date(),
        masteryPercentage: 98,
      },
      {
        id: 'ku-2',
        topic: 'Metabolic Pathways',
        concept: 'Glycolysis, Krebs cycle, and electron transport',
        bloomLevel: 'analyse',
        masteryState: 'mastered',
        lastReviewed: new Date(),
        masteryPercentage: 82,
      },
      {
        id: 'ku-3',
        topic: 'Viral Replication',
        concept: 'Lytic and lysogenic cycles of viral reproduction',
        bloomLevel: 'apply',
        masteryState: 'shaky',
        lastReviewed: new Date(),
        masteryPercentage: 45,
      },
      {
        id: 'ku-4',
        topic: 'Immunology Basics',
        concept: 'Innate and adaptive immune responses',
        bloomLevel: 'remember',
        masteryState: 'forgotten',
        lastReviewed: null,
        masteryPercentage: 0,
      },
    ],
  },
  {
    id: 'doc-organic-chem',
    fileName: 'Organic Chemistry II',
    uploadedAt: new Date('2023-11-04'),
    overallMastery: 30,
    lastStudied: new Date(),
    processingStatus: 'ready',
    knowledgeUnits: [
      {
        id: 'ku-5',
        topic: 'Reaction Mechanisms',
        concept: 'Nucleophilic substitution and elimination',
        bloomLevel: 'analyse',
        masteryState: 'shaky',
        lastReviewed: new Date(),
        masteryPercentage: 40,
      },
      {
        id: 'ku-6',
        topic: 'Stereochemistry',
        concept: 'Chirality, enantiomers, and optical activity',
        bloomLevel: 'understand',
        masteryState: 'forgotten',
        lastReviewed: null,
        masteryPercentage: 20,
      },
    ],
  },
  {
    id: 'doc-rwanda-history',
    fileName: 'Rwanda History Vol. 1',
    uploadedAt: new Date('2023-12-01'),
    overallMastery: 90,
    lastStudied: new Date(),
    processingStatus: 'ready',
    knowledgeUnits: [
      {
        id: 'ku-7',
        topic: 'Pre-Colonial Kingdoms',
        concept: 'Social structures and governance of early Rwanda',
        bloomLevel: 'understand',
        masteryState: 'mastered',
        lastReviewed: new Date(),
        masteryPercentage: 92,
      },
      {
        id: 'ku-8',
        topic: 'Independence Movement',
        concept: 'Path to self-governance in the 20th century',
        bloomLevel: 'remember',
        masteryState: 'mastered',
        lastReviewed: new Date(),
        masteryPercentage: 88,
      },
    ],
  },
  {
    id: 'doc-economics',
    fileName: 'Principles of Economics',
    uploadedAt: new Date('2024-01-15'),
    overallMastery: 10,
    lastStudied: null,
    processingStatus: 'ready',
    knowledgeUnits: [
      {
        id: 'ku-9',
        topic: 'Supply & Demand',
        concept: 'Market equilibrium and price determination',
        bloomLevel: 'understand',
        masteryState: 'forgotten',
        lastReviewed: null,
        masteryPercentage: 12,
      },
      {
        id: 'ku-10',
        topic: 'Elasticity',
        concept: 'Responsiveness of quantity to price changes',
        bloomLevel: 'apply',
        masteryState: 'forgotten',
        lastReviewed: null,
        masteryPercentage: 8,
      },
    ],
  },
]

export default function DocumentLibraryPage() {
  const [activeId, setActiveId] = useState<string | null>(sampleDocuments[0].id)
  const activeDocument = sampleDocuments.find((document) => document.id === activeId) ?? null
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { mutate: upload } = useDocumentUpload()

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

          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-stack-lg">
            {sampleDocuments.map((document) => (
              <DocumentCard
                document={document}
                isActive={document.id === activeId}
                key={document.id}
                onSelect={setActiveId}
              />
            ))}
          </div>
        </div>

        {activeDocument && <DocumentTopicPanel document={activeDocument} onClose={() => setActiveId(null)} />}
      </main>
      <BottomNav />
    </div>
  )
}