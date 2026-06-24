import { Eye, EyeOff, UserCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'
import { RWANDAN_UNIVERSITIES } from '../../utils/constants'
import Spinner from '../ui/Spinner'
import type { SignUpPayload } from '../../types/auth.types'

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  university: z.string().min(2, 'Select a university'),
})

export default function SignUpForm() {
  const navigate = useNavigate()
  const { setToken, setUser } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpPayload>({
    defaultValues: {
      university: RWANDAN_UNIVERSITIES[0],
    },
    resolver: zodResolver(signUpSchema),
  })

  const mutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: (response) => {
      setUser(response.user)
      setToken(response.token)
      navigate('/onboarding/profile', { replace: true })
    },
  })

  return (
    <div className="w-full max-w-md">
      <div className="socra-card rounded-xl p-stack-lg shadow-2xl">
        <div className="mb-stack-lg text-center">
          <Link to="/" className="mb-2 inline-block font-headline-lg text-headline-lg text-primary">
            SOCRA
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant">Stop re-reading. Start remembering.</p>
        </div>

        <form className="space-y-stack-md" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <div className="space-y-1">
            <label className="px-1 font-label-lg text-label-lg text-on-surface-variant">Full Name</label>
            <input
              className="input-field w-full rounded-lg px-4 py-3 font-body-md"
              placeholder="Emmanuel Gatete"
              type="text"
              {...register('fullName')}
            />
            {errors.fullName?.message ? <p className="px-1 text-label-sm text-error">{errors.fullName.message}</p> : null}
          </div>

          <div className="space-y-1">
            <label className="px-1 font-label-lg text-label-lg text-on-surface-variant">University</label>
            <select
              className="input-field w-full appearance-none rounded-lg px-4 py-3 font-body-md"
              {...register('university')}
            >
              {RWANDAN_UNIVERSITIES.map((university) => (
                <option className="bg-surface-container" key={university} value={university}>
                  {university}
                </option>
              ))}
            </select>
            {errors.university?.message ? <p className="px-1 text-label-sm text-error">{errors.university.message}</p> : null}
          </div>

          <div className="space-y-1">
            <label className="px-1 font-label-lg text-label-lg text-on-surface-variant">Email Address</label>
            <input
              className="input-field w-full rounded-lg px-4 py-3 font-body-md"
              placeholder="student@university.ac.rw"
              type="email"
              {...register('email')}
            />
            {errors.email?.message ? <p className="px-1 text-label-sm text-error">{errors.email.message}</p> : null}
          </div>

          <div className="space-y-1">
            <label className="px-1 font-label-lg text-label-lg text-on-surface-variant">Password</label>
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
            {errors.password?.message ? <p className="px-1 text-label-sm text-error">{errors.password.message}</p> : null}
          </div>

          {mutation.error ? <p className="px-1 text-label-sm text-error">{mutation.error.message}</p> : null}

          <button
            className="btn-primary mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-4 font-label-lg uppercase tracking-wider"
            disabled={mutation.isPending}
            type="submit"
          >
            {mutation.isPending ? <Spinner size="sm" /> : null}
            Create Account
          </button>

          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30" />
            </div>
            <span className="relative bg-[#414833] px-4 font-label-sm uppercase text-on-surface-variant">or</span>
          </div>

          <button
            className="btn-secondary flex w-full items-center justify-center gap-2 rounded-lg py-3 font-label-lg transition-colors hover:bg-white/5"
            type="button"
          >
            <UserCircle2 size={20} />
            Continue with Google
          </button>
        </form>

        <div className="mt-stack-lg text-center">
          <p className="font-body-md text-on-surface-variant">
            Already have an account?{' '}
            <Link className="font-bold text-tertiary hover:underline" to="/signin">
              Sign In
            </Link>
          </p>
          <p className="mt-6 font-label-sm text-[10px] leading-relaxed text-on-surface-variant/60">
            By continuing, you acknowledge that your data is processed in accordance with the Rwanda Data Protection and
            Privacy Law (N° 058/2021).
          </p>
        </div>
      </div>
    </div>
  )
}
