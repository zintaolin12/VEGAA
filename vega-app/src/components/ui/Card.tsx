import { ReactNode } from 'react'
import clsx from 'clsx'

type CardProps = {
  title?: string
  children: ReactNode
  className?: string
}

export default function Card({ title, children, className }: CardProps) {
  return (
    <div className={clsx(
      'rounded-xl bg-white shadow-md p-6 border border-gray-100',
      className
    )}>
      {title && (
        <h3 className="text-lg font-semibold text-[var(--vega-blue-dark)] mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
