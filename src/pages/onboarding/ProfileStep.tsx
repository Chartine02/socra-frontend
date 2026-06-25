import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../../components/ui/Input'
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
    <div className="space-y-stack-lg">
      <div className="text-center">
        <h1 className="mb-stack-sm font-headline-lg text-headline-lg text-on-surface">Set your academic profile</h1>
        <p className="mx-auto max-w-[500px] font-body-lg text-body-lg text-on-surface-variant">
          Help us personalize your learning journey.
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-stack-md rounded-xl border border-outline/10 bg-surface-container p-stack-lg">
        <Input error={errors.fullName?.message} label="Full name" {...register('fullName')} />
        <Input error={errors.courseOfStudy?.message} label="Course of study" {...register('courseOfStudy')} />
        <label className="flex flex-col gap-2 font-label-lg text-label-lg text-on-surface">
          <span>University</span>
          <select
            className="rounded-lg border border-outline/30 bg-surface-container-lowest px-4 py-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            {...register('university')}
          >
            {RWANDAN_UNIVERSITIES.map((university) => (
              <option key={university} value={university}>
                {university}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
