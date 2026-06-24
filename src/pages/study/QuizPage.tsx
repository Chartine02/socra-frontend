import { useParams } from 'react-router-dom'
import BottomNav from '../../components/layout/BottomNav'
import Navbar from '../../components/layout/Navbar'
import PageWrapper from '../../components/layout/PageWrapper'
import QuizSession from '../../components/study/quiz/QuizSession'
import type { QuizQuestion } from '../../types/study.types'

const sampleQuestions: QuizQuestion[] = [
  {
    id: 'qq-1',
    questionText: 'Which messenger is directly produced by adenylate cyclase?',
    options: ['cAMP', 'ATP', 'IP3', 'DAG'],
    correctOptionIndex: 0,
    bloomLevel: 'remember',
    explanation: 'Adenylate cyclase converts ATP into cyclic AMP during GPCR signalling.',
    sourceExcerpt: 'Lecture notes, page 12: Adenylate cyclase catalyses the conversion of ATP to cAMP.',
  },
]

export default function QuizPage() {
  const { documentId } = useParams<{ documentId: string }>()

  return (
    <div className="socra-shell min-h-screen">
      <Navbar />
      <PageWrapper title="Quiz session" subtitle={`Assessment flow for document ${documentId ?? 'unknown'}.`}>
        <QuizSession questions={sampleQuestions} />
      </PageWrapper>
      <BottomNav />
    </div>
  )
}
