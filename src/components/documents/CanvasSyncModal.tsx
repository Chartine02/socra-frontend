import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, ChevronRight, GraduationCap, Loader2, XCircle } from 'lucide-react'
import Modal from '../ui/Modal'
import {
  type CanvasCourse,
  type CanvasModule,
  type SyncResponse,
  type SyncStatus,
  fetchCanvasCourses,
  fetchCanvasModules,
  getCanvasTokenStatus,
  getSyncStatus,
  triggerSync,
} from '../../services/canvasService'

interface CanvasSyncModalProps {
  isOpen: boolean
  onClose: () => void
  onSyncComplete?: () => void
}

type Step = 'courses' | 'modules' | 'result'

export default function CanvasSyncModal({ isOpen, onClose, onSyncComplete }: CanvasSyncModalProps) {
  const [step, setStep] = useState<Step>('courses')
  const [courses, setCourses] = useState<CanvasCourse[]>([])
  const [modules, setModules] = useState<CanvasModule[]>([])
  const [syncedStatus, setSyncedStatus] = useState<SyncStatus | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<CanvasCourse | null>(null)
  const [selectedModuleIds, setSelectedModuleIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [needsConnect, setNeedsConnect] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<SyncResponse | null>(null)
  const [error, setError] = useState('')

  // Load courses on open
  useEffect(() => {
    if (!isOpen) return
    resetState()
    setLoading(true)

    getCanvasTokenStatus()
      .then((status) => {
        if (!status.connected) {
          setNeedsConnect(true)
          setLoading(false)
          return
        }
        setNeedsConnect(false)
        return fetchCanvasCourses().then(setCourses)
      })
      .catch((err: Error) => {
        if (err.message.includes('token') || err.message.includes('401')) {
          setNeedsConnect(true)
        } else {
          setError(err.message)
        }
      })
      .finally(() => setLoading(false))
  }, [isOpen])

  function resetState() {
    setStep('courses')
    setCourses([])
    setModules([])
    setSyncedStatus(null)
    setSelectedCourse(null)
    setSelectedModuleIds(new Set())
    setSyncing(false)
    setSyncResult(null)
    setError('')
  }

  const handleSelectCourse = async (course: CanvasCourse) => {
    setSelectedCourse(course)
    setError('')
    setLoading(true)

    try {
      const [mods, status] = await Promise.all([
        fetchCanvasModules(String(course.id)),
        getSyncStatus(String(course.id)).catch(() => null),
      ])
      setModules(mods)
      setSyncedStatus(status)
      setStep('modules')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load modules')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleModule = (moduleId: string) => {
    setSelectedModuleIds((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) next.delete(moduleId)
      else next.add(moduleId)
      return next
    })
  }

  const handleSelectAll = () => {
    const unsyncedIds = modules
      .filter((m) => !isModuleSynced(String(m.id)))
      .map((m) => String(m.id))
    if (selectedModuleIds.size === unsyncedIds.length) {
      setSelectedModuleIds(new Set())
    } else {
      setSelectedModuleIds(new Set(unsyncedIds))
    }
  }

  const isModuleSynced = (moduleId: string) => {
    return syncedStatus?.modules.some((m) => m.moduleId === moduleId && m.synced) ?? false
  }

  const handleSync = async () => {
    if (!selectedCourse || selectedModuleIds.size === 0) return
    setSyncing(true)
    setError('')

    try {
      const result = await triggerSync(String(selectedCourse.id), Array.from(selectedModuleIds))
      setSyncResult(result)
      setStep('result')
      onSyncComplete?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sync failed')
    } finally {
      setSyncing(false)
    }
  }

  const handleBack = () => {
    if (step === 'modules') {
      setStep('courses')
      setSelectedCourse(null)
      setModules([])
      setSyncedStatus(null)
      setSelectedModuleIds(new Set())
      setError('')
    } else if (step === 'result') {
      setStep('courses')
      setSelectedCourse(null)
      setModules([])
      setSyncedStatus(null)
      setSelectedModuleIds(new Set())
      setSyncResult(null)
      setError('')
    }
  }

  const title =
    step === 'courses'
      ? 'Import from Canvas'
      : step === 'modules'
        ? selectedCourse?.name ?? 'Select Modules'
        : 'Sync Complete'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {/* Back button for steps 2 & 3 */}
      {step !== 'courses' && !syncing && (
        <button
          onClick={handleBack}
          className="mb-3 flex items-center gap-1 text-label-sm text-on-surface-variant transition-colors hover:text-on-surface"
          type="button"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to courses
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {/* Needs Canvas connection */}
      {needsConnect && !loading && (
        <div className="py-4 text-center">
          <GraduationCap className="mx-auto mb-3 h-10 w-10 text-on-surface-variant/50" />
          <p className="mb-4 font-body-md text-on-surface-variant">
            Connect your Canvas account first to import course content.
          </p>
          <Link
            to="/settings"
            onClick={onClose}
            className="inline-block rounded-lg bg-primary px-5 py-2.5 font-label-md text-on-primary transition-colors hover:bg-primary/90"
          >
            Go to Settings
          </Link>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <p className="mb-3 rounded-lg bg-error/10 px-3 py-2 text-center text-label-sm text-error">{error}</p>
      )}

      {/* Step 1: Course list */}
      {step === 'courses' && !loading && !needsConnect && (
        <div className="max-h-[60vh] space-y-2 overflow-y-auto">
          {courses.length === 0 && !error && (
            <p className="py-4 text-center font-body-md text-on-surface-variant">
              No courses found in your Canvas account.
            </p>
          )}
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleSelectCourse(course)}
              className="flex w-full items-center justify-between rounded-lg border border-outline-variant/10 bg-surface-container-low px-4 py-3 text-left transition-colors hover:border-primary/30 hover:bg-surface-container"
              type="button"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-label-md text-on-surface">{course.name}</p>
                {course.course_code && (
                  <p className="truncate text-label-sm text-on-surface-variant">{course.course_code}</p>
                )}
              </div>
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-on-surface-variant" />
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Module picker */}
      {step === 'modules' && !loading && (
        <div className="max-h-[60vh] overflow-y-auto">
          {modules.length === 0 && !error && (
            <p className="py-4 text-center font-body-md text-on-surface-variant">
              No modules found in this course.
            </p>
          )}
          {modules.length > 0 && (
            <>
              {/* Select all */}
              <label className="mb-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-surface-container">
                <input
                  type="checkbox"
                  checked={
                    selectedModuleIds.size > 0 &&
                    selectedModuleIds.size === modules.filter((m) => !isModuleSynced(String(m.id))).length
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-outline-variant accent-primary"
                />
                <span className="font-label-md text-on-surface">Select All</span>
              </label>

              <div className="space-y-1">
                {modules.map((mod) => {
                  const id = String(mod.id)
                  const synced = isModuleSynced(id)

                  return (
                    <label
                      key={mod.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
                        synced
                          ? 'border-primary/20 bg-primary-container/10'
                          : selectedModuleIds.has(id)
                            ? 'border-primary/40 bg-surface-container'
                            : 'border-outline-variant/10 bg-surface-container-low hover:bg-surface-container'
                      }`}
                    >
                      {synced ? (
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                      ) : (
                        <input
                          type="checkbox"
                          checked={selectedModuleIds.has(id)}
                          onChange={() => handleToggleModule(id)}
                          className="h-4 w-4 rounded border-outline-variant accent-primary"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-label-md text-on-surface">{mod.name}</p>
                        <p className="text-label-sm text-on-surface-variant">
                          {mod.itemsCount} items{synced ? ' · Synced' : ''}
                        </p>
                      </div>
                      {synced && (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            handleToggleModule(id)
                          }}
                          className="flex-shrink-0 text-label-sm text-primary hover:underline"
                          type="button"
                        >
                          Re-sync
                        </button>
                      )}
                    </label>
                  )
                })}
              </div>

              {/* Sync button */}
              <button
                onClick={handleSync}
                disabled={selectedModuleIds.size === 0 || syncing}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-label-lg text-on-primary transition-colors hover:bg-primary/90 disabled:opacity-50"
                type="button"
              >
                {syncing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Syncing…
                  </>
                ) : (
                  `Sync Selected (${selectedModuleIds.size})`
                )}
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 3: Result */}
      {step === 'result' && syncResult && (
        <div className="py-4 text-center">
          <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-primary" />
          <p className="mb-2 font-headline-md text-headline-md text-on-surface">
            {syncResult.modules} modules synced
          </p>
          <p className="mb-4 font-body-md text-on-surface-variant">
            {syncResult.documents} documents created
          </p>

          {syncResult.errors.length > 0 && (
            <div className="mb-4 rounded-lg bg-error/10 px-4 py-3 text-left">
              <p className="mb-1 font-label-sm text-error">Some modules had issues:</p>
              {syncResult.errors.map((err) => (
                <p key={err} className="flex items-start gap-1 text-label-sm text-error/80">
                  <XCircle className="mt-0.5 h-3 w-3 flex-shrink-0" />
                  {err}
                </p>
              ))}
            </div>
          )}

          <Link
            to="/documents"
            onClick={onClose}
            className="inline-block rounded-lg bg-primary px-5 py-2.5 font-label-md text-on-primary transition-colors hover:bg-primary/90"
          >
            View Documents
          </Link>
        </div>
      )}
    </Modal>
  )
}
