import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'
import { RWANDAN_UNIVERSITIES } from '../../utils/constants'
import { Button, Card, Input } from '../ui'
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
    <Card className="w-full max-w-xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.26em] text-socra-sand">Create account</p>
        <h1 className="text-3xl font-semibold text-socra-stone">Build your adaptive study system.</h1>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <Input error={errors.fullName?.message} label="Full name" {...register('fullName')} />
        <Input error={errors.email?.message} label="Email" type="email" {...register('email')} />
        <Input error={errors.password?.message} label="Password" type="password" {...register('password')} />
        <label className="flex flex-col gap-2 text-sm text-socra-stone">
          <span className="font-medium">University</span>
          <select
            className="rounded-lg border border-socra-forest/30 bg-socra-dark px-4 py-3 text-socra-stone focus:border-socra-forest focus:outline-none focus:ring-1 focus:ring-socra-forest"
            {...register('university')}
          >
            {RWANDAN_UNIVERSITIES.map((university) => (
              <option className="bg-socra-darkest" key={university} value={university}>
                {university}
              </option>
            ))}
          </select>
          {errors.university?.message ? <span className="text-sm text-socra-richbrown">{errors.university.message}</span> : null}
        </label>
        {mutation.error ? <p className="text-sm text-socra-richbrown">{mutation.error.message}</p> : null}
        <Button className="w-full" isLoading={mutation.isPending} type="submit">
          Create account
        </Button>
      </form>
    </Card>
  )
}
