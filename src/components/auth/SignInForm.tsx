import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'
import Spinner from '../ui/Spinner'
import type { LoginCredentials } from '../../types/auth.types'

const signInSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export default function SignInForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setToken, setUser } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginCredentials>({
    resolver: zodResolver(signInSchema),
  })

  const mutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (response) => {
      setUser(response.user)
      setToken(response.token)
      const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard'
      navigate(redirectTo, { replace: true })
    },
  })

  return (
    <div className="w-full max-w-md">
      <div className="socra-card rounded-xl p-stack-lg shadow-2xl">
        <div className="mb-stack-lg text-center">
          <Link to="/" className="mb-2 inline-block font-headline-lg text-headline-lg text-primary">
            SOCRA
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant">Welcome back, Scholar.</p>
        </div>

        <form className="space-y-stack-md" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
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
            <div className="flex items-center justify-between px-1">
              <label className="font-label-lg text-label-lg text-on-surface-variant">Password</label>
              <Link className="font-label-sm text-tertiary hover:underline" to="/forgot-password">
                Forgot password?
              </Link>
            </div>
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
            Sign In
          </button>
        </form>

        <div className="mt-stack-lg text-center">
          <p className="font-body-md text-on-surface-variant">
            Don't have an account?{' '}
            <Link className="font-bold text-tertiary hover:underline" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
