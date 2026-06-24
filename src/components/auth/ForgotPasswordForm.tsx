import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../../services/authService'
import { Button, Card, Input } from '../ui'

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
    <Card className="w-full max-w-xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.26em] text-socra-sand">Reset access</p>
        <h1 className="text-3xl font-semibold text-socra-stone">Request a password reset link.</h1>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <Input error={errors.email?.message} label="Email" type="email" {...register('email')} />
        {mutation.isSuccess ? <p className="text-sm text-socra-sage">{mutation.data.message}</p> : null}
        {mutation.error ? <p className="text-sm text-socra-richbrown">{mutation.error.message}</p> : null}
        <Button className="w-full" isLoading={mutation.isPending} type="submit">
          Send reset link
        </Button>
      </form>
    </Card>
  )
}
