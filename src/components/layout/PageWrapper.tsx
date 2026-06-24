import type { ReactNode } from 'react'

interface PageWrapperProps {
  title?: string
  subtitle?: string
  children: ReactNode
}

export default function PageWrapper({ children, subtitle, title }: PageWrapperProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8">
      {title ? (
        <header className="mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-socra-sand">SOCRA</p>
          <h1 className="text-4xl font-semibold tracking-tight text-socra-stone sm:text-5xl">{title}</h1>
          {subtitle ? <p className="max-w-3xl text-base text-socra-tan">{subtitle}</p> : null}
        </header>
      ) : null}
      {children}
    </main>
  )
}
