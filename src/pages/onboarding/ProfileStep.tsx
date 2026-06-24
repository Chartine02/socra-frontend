import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { RWANDAN_UNIVERSITIES } from '../../utils/constants'

const profileSchema = z.object({
  fullName: z.string().min(2),
  courseOfStudy: z.string().min(2),
  university: z.string().min(2),
})

type ProfileValues = z.infer<typeof profileSchema>

export default function ProfileStep() {
  const {
    formState: { errors },
    register,
  } = useForm<ProfileValues>({
    defaultValues: {
      university: RWANDAN_UNIVERSITIES[0],
    },
    resolver: zodResolver(profileSchema),
  })

  return (
    <Card className="max-w-3xl space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Step 1</p>
        <h2 className="mt-2 text-3xl font-semibold text-socra-stone">Set your academic profile.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input error={errors.fullName?.message} label="Full name" {...register('fullName')} />
        <Input error={errors.courseOfStudy?.message} label="Course of study" {...register('courseOfStudy')} />
        <label className="flex flex-col gap-2 text-sm text-socra-stone sm:col-span-2">
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
        </label>
      </div>
      <Link to="/onboarding/upload">
        <Button>Continue</Button>
      </Link>
    </Card>
  )
}
