import { ShieldCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import Navbar from '../../components/layout/Navbar'
import PageWrapper from '../../components/layout/PageWrapper'
import { authService } from '../../services/authService'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import { zodResolver } from '@hookform/resolvers/zod'

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm your password'),
}).refine((values) => values.password === values.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
})

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await authService.resetPassword({ token, password: values.password })
      navigate('/signin', { replace: true })
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Unable to reset password.',
      })
    }
  })

  return (
    <div className="socra-shell min-h-screen">
      <Navbar />
      <PageWrapper>
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <h1 className="text-2xl">Choose a new password</h1>
                <p className="text-sm text-socra-tan">Create a secure password to continue your study session.</p>
              </div>
              <Input label="New Password" type="password" error={errors.password?.message} {...register('password')} />
              <Input label="Confirm Password" type="password" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
              {errors.root?.message ? <p className="text-sm text-socra-richbrown">{errors.root.message}</p> : null}
              <Button type="submit" className="w-full" isLoading={isSubmitting} iconLeft={<ShieldCheck size={16} />}>
                Reset Password
              </Button>
            </form>
          </Card>
        </div>
      </PageWrapper>
    </div>
  )
}