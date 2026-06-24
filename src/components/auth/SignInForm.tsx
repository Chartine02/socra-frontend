import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'
import { Button, Card, Input } from '../ui'
import type { LoginCredentials } from '../../types/auth.types'

const signInSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export default function SignInForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setToken, setUser } = useAuth()
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
    <Card className="w-full max-w-xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.26em] text-socra-sand">Welcome back</p>
        <h1 className="text-3xl font-semibold text-socra-stone">Continue your retrieval practice.</h1>
        <p className="text-sm text-socra-tan">Sign in to resume your personalised formative assessments.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <Input error={errors.email?.message} label="Email" placeholder="name@university.edu" {...register('email')} />
        <Input error={errors.password?.message} label="Password" placeholder="••••••••" type="password" {...register('password')} />
        {mutation.error ? <p className="text-sm text-socra-richbrown">{mutation.error.message}</p> : null}
        <Button className="w-full" isLoading={mutation.isPending} type="submit">
          Sign in
        </Button>
      </form>
    </Card>
  )
}
