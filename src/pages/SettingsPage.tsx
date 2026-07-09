import { useEffect, useState } from 'react'
import {
  Accessibility,
  Check,
  CheckCircle2,
  Download,
  GraduationCap,
  Pencil,
  RefreshCw,
  SlidersHorizontal,
  XCircle,
} from 'lucide-react'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import { useAuth } from '../hooks/useAuth'
import { connectCanvasToken, disconnectCanvas, getCanvasTokenStatus } from '../services/canvasService'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

function Toggle({ checked, label, onChange }: ToggleProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={checked}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 ${
        checked ? 'bg-socra-forest' : 'bg-surface-container'
      }`}
      onClick={() => onChange(!checked)}
      type="button"
    >
      <span
        className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-on-surface transition-transform duration-200 ${
          checked ? 'translate-x-[23px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  )
}

export default function SettingsPage() {
  const { signOut, user } = useAuth()
  const [studyReminders, setStudyReminders] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [fontSize, setFontSize] = useState(50)

  // Canvas integration state
  const [canvasConnected, setCanvasConnected] = useState<boolean | null>(null)
  const [canvasToken, setCanvasToken] = useState('')
  const [canvasLoading, setCanvasLoading] = useState(false)
  const [canvasError, setCanvasError] = useState('')

  useEffect(() => {
    getCanvasTokenStatus()
      .then((s) => setCanvasConnected(s.connected))
      .catch(() => setCanvasConnected(false))
  }, [])

  const handleCanvasConnect = async () => {
    if (!canvasToken.trim()) return
    setCanvasLoading(true)
    setCanvasError('')
    try {
      await connectCanvasToken(canvasToken.trim())
      setCanvasConnected(true)
      setCanvasToken('')
    } catch (err) {
      setCanvasError(err instanceof Error ? err.message : 'Invalid token')
    } finally {
      setCanvasLoading(false)
    }
  }

  const handleCanvasDisconnect = async () => {
    setCanvasLoading(true)
    try {
      await disconnectCanvas()
      setCanvasConnected(false)
    } catch {
      // ignore
    } finally {
      setCanvasLoading(false)
    }
  }

  const avatarUrl = user?.avatarUrl
  const initials =
    user?.fullName
      ?.split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() ?? 'S'

  return (
    <div className="min-h-screen bg-socra-darkest pb-24 text-on-surface md:pb-0">
      <Navbar />

      <main className="mx-auto max-w-[720px] px-container-margin py-stack-lg">
        {/* Profile header */}
        <section className="mb-section-gap flex flex-col items-center">
          <div className="group relative">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-primary-container p-1 shadow-2xl">
              {avatarUrl ? (
                <img
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                  src={avatarUrl}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-container font-headline-lg text-headline-lg text-on-primary-container">
                  {initials}
                </div>
              )}
            </div>
            <button
              aria-label="Edit profile photo"
              className="absolute bottom-1 right-1 rounded-full bg-primary p-2 text-on-primary shadow-lg transition-transform hover:scale-105"
              type="button"
            >
              <Pencil size={18} />
            </button>
          </div>
          <div className="mt-stack-md text-center">
            <h1 className="font-headline-lg text-headline-lg text-primary">{user?.fullName ?? 'Your Name'}</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {user?.university ?? 'Your Institution'}
            </p>
          </div>
        </section>

        {/* Settings grid */}
        <div className="space-y-stack-md">
          {/* Integrations — Canvas */}
          <div className="rounded-xl bg-socra-dark p-stack-md">
            <h2 className="mb-stack-sm flex items-center gap-2 font-label-lg text-label-lg text-primary">
              <RefreshCw className="text-primary" size={20} />
              Integrations
            </h2>
            <div className="rounded-lg border border-outline-variant/10 bg-surface-container-low p-stack-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-[#e74c3c]/10">
                  <GraduationCap className="text-[#e74c3c]" size={20} />
                </div>
                <div>
                  <p className="font-label-lg text-label-lg">Canvas LMS</p>
                  <p className="text-label-sm text-on-surface-variant">Learning Management System</p>
                </div>
              </div>

              {canvasConnected === null ? (
                <p className="mt-3 text-label-sm text-on-surface-variant">Checking connection…</p>
              ) : canvasConnected ? (
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1 rounded-full bg-primary-container px-3 py-1 font-label-sm text-label-sm text-on-primary-container">
                    <CheckCircle2 size={14} />
                    Connected
                  </span>
                  <button
                    className="flex items-center gap-1 rounded-lg border border-error/30 px-3 py-1.5 font-label-sm text-error transition-colors hover:bg-error/10 disabled:opacity-50"
                    disabled={canvasLoading}
                    onClick={handleCanvasDisconnect}
                    type="button"
                  >
                    <XCircle size={14} />
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <p className="text-label-sm text-on-surface-variant">
                    Go to Canvas → Account → Settings → <strong>+ New Access Token</strong> → copy and paste here.
                  </p>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 rounded-lg border border-outline-variant/20 bg-surface-container px-3 py-2 font-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none"
                      onChange={(e) => {
                        setCanvasToken(e.target.value)
                        setCanvasError('')
                      }}
                      placeholder="Paste your Canvas access token"
                      type="password"
                      value={canvasToken}
                    />
                    <button
                      className="rounded-lg bg-primary px-4 py-2 font-label-md text-on-primary transition-colors hover:bg-primary/90 disabled:opacity-50"
                      disabled={canvasLoading || !canvasToken.trim()}
                      onClick={handleCanvasConnect}
                      type="button"
                    >
                      {canvasLoading ? 'Connecting…' : 'Connect'}
                    </button>
                  </div>
                  {canvasError && (
                    <p className="text-label-sm text-error">{canvasError}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="rounded-xl bg-socra-dark p-stack-md">
            <h2 className="mb-stack-md flex items-center gap-2 font-label-lg text-label-lg text-primary">
              <SlidersHorizontal className="text-primary" size={20} />
              Preferences
            </h2>
            <div className="space-y-stack-md">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md">Study reminders</span>
                  <span className="text-label-sm text-on-surface-variant">Daily nudges to keep your streak</span>
                </div>
                <Toggle checked={studyReminders} label="Study reminders" onChange={setStudyReminders} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md">Reduced motion</span>
                  <span className="text-label-sm text-on-surface-variant">
                    Minimize animations across the platform
                  </span>
                </div>
                <Toggle checked={reducedMotion} label="Reduced motion" onChange={setReducedMotion} />
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div className="rounded-xl bg-socra-dark p-stack-md">
            <h2 className="mb-stack-md flex items-center gap-2 font-label-lg text-label-lg text-primary">
              <Accessibility className="text-primary" size={20} />
              Accessibility
            </h2>
            <div className="space-y-stack-sm">
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>Small</span>
                <span>Standard</span>
                <span>Large</span>
              </div>
              <input
                aria-label="Font size adjustment"
                className="settings-slider"
                max={100}
                min={0}
                onChange={(event) => setFontSize(Number(event.target.value))}
                type="range"
                value={fontSize}
              />
              <p className="pt-2 text-center font-label-sm text-label-sm text-on-surface-variant">
                Font size adjustment
              </p>
            </div>
          </div>

          {/* Data / actions */}
          <div className="flex flex-col items-center gap-stack-sm pt-stack-md">
            <button
              className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant opacity-70 transition-colors hover:text-primary hover:opacity-100"
              type="button"
            >
              <Download size={16} />
              Download my data
            </button>
            <button
              className="tactile-button mt-stack-md flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container py-4 font-label-lg text-label-lg text-on-primary-container transition-all"
              type="button"
            >
              <Check size={18} />
              Save Changes
            </button>
            <button
              className="mt-stack-sm font-label-sm text-label-sm text-error/60 transition-colors hover:text-error"
              onClick={signOut}
              type="button"
            >
              Sign out of SOCRA
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}