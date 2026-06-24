import { Link } from 'react-router-dom'
import DocumentUploadZone from '../../components/documents/DocumentUploadZone'
import Button from '../../components/ui/Button'

export default function UploadStep() {
  return (
    <div className="space-y-6">
      <DocumentUploadZone />
      <Link to="/onboarding/mode">
        <Button>Continue</Button>
      </Link>
    </div>
  )
}
