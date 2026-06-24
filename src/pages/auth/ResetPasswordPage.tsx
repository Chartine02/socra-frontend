import { CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { authService } from '../../services/authService'
import Spinner from '../../components/ui/Spinner'
import { zodResolver } from '@hookform/resolvers/zod'

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm your password'),
}).refine((values) => values.password === values.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
})

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

function getStrength(value: string) {
  let score = 0
  if (value.length > 5) score += 25
  if (value.length > 8) score += 25
  if (/[A-Z]/.test(value)) score += 25
  if (/[0-9]/.test(value)) score += 25
  return score
}

function strengthColor(score: number) {
  if (score <= 25) return '#582f0e'
  if (score <= 75) return '#936639'
  return '#656d4a'
}

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const passwordValue = useWatch({ control, name: 'password' })
  const strength = getStrength(passwordValue ?? '')

  const onSubmit = handleSubmit(async (values) => {
    try {
      await authService.resetPassword({ token, password: values.password })
      setSuccess(true)
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Unable to reset password.',
      })
    }
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-socra-darkest p-gutter">
      <div className="w-full max-w-md">
        <div className="socra-card rounded-xl p-stack-lg shadow-2xl">
          <div className="mb-stack-lg text-center">
            <h2 className="mb-2 font-headline-md text-headline-md text-on-surface">New Password</h2>
            <p className="font-body-md text-on-surface-variant">
              Ensure your new password is at least 8 characters long.
            </p>
          </div>

          {success ? (
            <div className="rounded-lg border border-primary/20 bg-secondary-container/30 p-4 text-center">
              <div className="flex items-center justify-center gap-2 font-bold text-primary">
                <CheckCircle2 size={20} />
                <span>Password updated.</span>
              </div>
              <button
                className="mt-4 text-label-lg text-tertiary underline"
                onClick={() => navigate('/signin', { replace: true })}
                type="button"
              >
                Proceed to Sign In
              </button>
            </div>
          ) : (
            <form className="space-y-stack-md" onSubmit={onSubmit}>
              <div className="space-y-1">
                <label className="px-1 font-label-lg text-label-lg text-on-surface-variant">New Password</label>
                <div className="relative">
                  <input
                    className="input-field w-full rounded-lg px-4 py-3 pr-12 font-body-md"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-primary"
                    onClick={() => setShowPassword((value) => !value)}
                    type="button"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-container">
                  <div
                    className="strength-bar"
                    style={{ width: `${strength}%`, backgroundColor: strengthColor(strength) }}
                  />
                </div>
                {errors.password?.message ? <p className="px-1 text-label-sm text-error">{errors.password.message}</p> : null}
              </div>

              <div className="space-y-1">
                <label className="px-1 font-label-lg text-label-lg text-on-surface-variant">Confirm Password</label>
                <input
                  className="input-field w-full rounded-lg px-4 py-3 font-body-md"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword?.message ? (
                  <p className="px-1 text-label-sm text-error">{errors.confirmPassword.message}</p>
                ) : null}
              </div>

              {errors.root?.message ? <p className="px-1 text-label-sm text-error">{errors.root.message}</p> : null}

              <button
                className="btn-primary mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-4 font-label-lg uppercase tracking-wider"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? <Spinner size="sm" /> : null}
                Set New Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}