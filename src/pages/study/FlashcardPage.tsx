import { useParams } from 'react-router-dom'
import BottomNav from '../../components/layout/BottomNav'
import Navbar from '../../components/layout/Navbar'
import PageWrapper from '../../components/layout/PageWrapper'
import FlashcardSession from '../../components/study/flashcard/FlashcardSession'
import type { Flashcard } from '../../types/study.types'

const sampleFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    front: 'What role does cAMP play in signal transduction?',
    back: 'It acts as a second messenger that activates protein kinase A and propagates the original extracellular signal.',
    sourceExcerpt: 'BIO201 notes: cAMP amplifies receptor signals through kinase activation.',
    interval: 3,
    easeFactor: 2.5,
    nextReviewDate: new Date(),
    masteryState: 'shaky',
  },
]

export default function FlashcardPage() {
  const { documentId } = useParams<{ documentId: string }>()

  return (
    <div className="socra-shell min-h-screen">
      <Navbar />
      <PageWrapper title="Flashcard session" subtitle={`Spaced repetition queue for document ${documentId ?? 'unknown'}.`}>
        <FlashcardSession flashcards={sampleFlashcards} />
      </PageWrapper>
      <BottomNav />
    </div>
  )
}
