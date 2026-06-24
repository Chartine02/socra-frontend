import { useParams } from 'react-router-dom'
import BottomNav from '../../components/layout/BottomNav'
import Navbar from '../../components/layout/Navbar'
import PageWrapper from '../../components/layout/PageWrapper'
import SocraticSession from '../../components/study/socratic/SocraticSession'
import type { DialogueTurn } from '../../types/study.types'

const sampleTurns: DialogueTurn[] = [
  {
    id: 'turn-1',
    role: 'ai',
    content: 'Explain how a G-protein-coupled receptor converts an extracellular signal into intracellular action.',
    bloomLevel: 'understand',
    timestamp: new Date(),
  },
  {
    id: 'turn-2',
    role: 'student',
    content: 'The receptor changes shape when a ligand binds, then activates the G-protein which triggers downstream messengers.',
    bloomLevel: 'understand',
    timestamp: new Date(),
  },
]

export default function SocraticPage() {
  const { documentId } = useParams<{ documentId: string }>()

  return (
    <div className="socra-shell min-h-screen">
      <Navbar />
      <PageWrapper title="Socratic session" subtitle={`Live retrieval dialogue for document ${documentId ?? 'unknown'}.`}>
        <SocraticSession currentBloomLevel="apply" turns={sampleTurns} />
      </PageWrapper>
      <BottomNav />
    </div>
  )
}
