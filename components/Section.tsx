"use client"
import { Separator } from '@/app/components/ui/separator'

export default function Section({
  title,
  description,
  children,
  className = ''
}: {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`rounded-xl border bg-white/80 p-6 shadow-sm ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="text-xl font-semibold tracking-tight">{title}</h2>}
          {description && <p className="mt-1 text-slate-600">{description}</p>}
          <Separator className="mt-4" />
        </div>
      )}
      {children}
    </section>
  )
}

