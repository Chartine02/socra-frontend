import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../../services/authService'
import Spinner from '../ui/Spinner'

const forgotPasswordSchema = z.object({
  email: z.email('Enter a valid email address'),
})

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const mutation = useMutation({
    mutationFn: authService.forgotPassword,
  })

  return (
    <div className="w-full max-w-md">
      <div className="socra-card rounded-xl p-stack-lg shadow-2xl">
        <Link
          className="mb-stack-md flex items-center gap-2 text-on-surface-variant transition-colors hover:text-primary"
          to="/signin"
        >
          <ArrowLeft size={20} />
          <span className="font-label-lg">Back to Sign In</span>
        </Link>

        <div className="mb-stack-lg text-center">
          <h2 className="mb-2 font-headline-md text-headline-md text-on-surface">Reset Password</h2>
          <p className="font-body-md text-on-surface-variant">
            Enter your email and we'll send you a link to get back into your account.
          </p>
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

          {mutation.isSuccess ? <p className="px-1 text-label-sm text-primary">Reset link sent! Check your email.</p> : null}
          {mutation.error ? <p className="px-1 text-label-sm text-error">{mutation.error.message}</p> : null}

          <button
            className="btn-primary mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-4 font-label-lg uppercase tracking-wider"
            disabled={mutation.isPending}
            type="submit"
          >
            {mutation.isPending ? <Spinner size="sm" /> : null}
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  )
}
